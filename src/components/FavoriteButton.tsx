"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";

interface FavoriteButtonProps {
  countryId: string;
  countryName: string;
}

export default function FavoriteButton({ countryId, countryName }: FavoriteButtonProps) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);

  async function checkFavoriteState() {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("country_id", countryId);

      if (!error && data && data.length > 0) {
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Error checking favorite status:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user && countryId) {
      checkFavoriteState();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, countryId]);

  async function toggleFavorite() {
    if (!user) {
      alert("Por favor, inicie sessão para guardar os seus destinos preferidos!");
      window.location.href = "/login";
      return;
    }

    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    try {
      if (isFavorite) {
        // Remove favorite
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("country_id", countryId);

        if (error) throw error;
        setIsFavorite(false);
      } else {
        // Add favorite
        const { error } = await supabase
          .from("favorites")
          .insert({
            user_id: user.id,
            country_id: countryId,
          });

        if (error) throw error;
        setIsFavorite(true);
      }
    } catch (err: any) {
      console.error("Error toggling favorite item:", err.message);
    }
  }

  if (loading) {
    return (
      <button
        disabled
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-gray-50 border border-gray-200 py-3 text-sm font-medium text-gray-400 opacity-60"
      >
        <Heart className="h-4 w-4 animate-pulse" />
        <span>A carregar...</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleFavorite}
      className={`w-full flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium shadow-sm transition-all active:scale-[0.97] cursor-pointer ${
        isFavorite
          ? "bg-red-50 border-red-200 text-red-700"
          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}
    >
      <Heart
        className={`h-4 w-4 transition-transform duration-300 ${
          isFavorite ? "fill-red-500 text-red-500" : ""
        } ${animating ? "scale-150 animate-bounce" : ""}`}
      />
      <span>
        {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </span>
    </button>
  );
}
