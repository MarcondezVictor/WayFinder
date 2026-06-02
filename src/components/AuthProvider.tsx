"use client";
//AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  nationality: string | null;
  avatar_url: string | null;
}

interface UserPreferences {
  preferred_travel_style: string | null;
  preferred_destinations: string[] | null;
}

interface AuthContextType {
  user: any;
  profile: Profile | null;
  preferences: UserPreferences | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  preferences: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfileAndPrefs(userId: string) {
    try {
      // Fetch profile
      const { data: profData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profData) {
        setProfile({
          id: profData.id,
          email: profData.email,
          full_name: profData.full_name,
          nationality: profData.nationality,
          avatar_url: profData.avatar_url,
        });
      }

      // Fetch preferences
      const { data: prefData } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("id", userId)
        .single();

      if (prefData) {
        setPreferences({
          preferred_travel_style: prefData.preferred_travel_style,
          preferred_destinations: prefData.preferred_destinations,
        });
      }
    } catch (err) {
      console.error("Error fetching user profile metadata:", err);
    }
  }

  async function refreshProfile() {
    if (user) {
      await fetchProfileAndPrefs(user.id);
    }
  }

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const activeUser = session?.user ?? null;
      setUser(activeUser);
      if (activeUser) {
        fetchProfileAndPrefs(activeUser.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const activeUser = session?.user ?? null;
      setUser(activeUser);

      if (activeUser) {
        setLoading(true);
        try {
          await fetchProfileAndPrefs(activeUser.id);
        } finally {
          setLoading(false);  // ← always runs no matter what
        }
      } else {
        setProfile(null);
        setPreferences(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <AuthContext.Provider value={{ user, profile, preferences, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
