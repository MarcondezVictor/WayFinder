"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Compass, User, LogOut, Moon, Sun, Menu, X, ArrowRight, Layers } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-md transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5 animate-pulse-glow" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-violet-300">
              WayFinder
            </span>
            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 -mt-1 tracking-wider uppercase">
              Explore. Plan. Go.
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-semibold text-zinc-700 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400 transition-colors"
          >
            Início
          </Link>
          <Link
            href="/compare"
            className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400 transition-colors"
          >
            <Layers className="h-4 w-4" />
            Comparar Países
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-zinc-700 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400 transition-colors"
            >
              Favoritos
            </Link>
          )}
        </div>

        {/* User Account Section */}
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-all border border-zinc-200/50 dark:border-zinc-700/50"
              >
                <User className="h-4 w-4 text-indigo-500" />
                <span>{user.email?.split("@")[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/50 dark:border-zinc-800 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition-all text-zinc-500 cursor-pointer"
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-bold text-zinc-600 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400 transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Criar Conta</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/50 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900 md:hidden text-zinc-700 dark:text-zinc-300"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu content */}
      {menuOpen && (
        <div className="absolute top-[73px] left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 px-6 py-6 flex flex-col gap-5 md:hidden animate-fade-in-up">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:text-indigo-600"
          >
            Início
          </Link>
          <Link
            href="/compare"
            onClick={() => setMenuOpen(false)}
            className="text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:text-indigo-600"
          >
            Comparar Países
          </Link>
          {user && (
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:text-indigo-600"
            >
              Favoritos
            </Link>
          )}

          <hr className="border-zinc-100 dark:border-zinc-950" />

          {user ? (
            <div className="flex flex-col gap-3">
              <div className="text-sm text-zinc-500 px-2">
                Sessão iniciada como: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{user.email}</span>
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-950/50 bg-red-50/50 dark:bg-red-950/10 px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair da Conta</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center rounded-xl border border-zinc-200/50 dark:border-zinc-800 py-3 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 text-sm font-bold text-white shadow-md"
              >
                <span>Criar Conta</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
