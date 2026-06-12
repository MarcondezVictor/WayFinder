"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Compass, User, LogOut, Menu, X, ArrowRight, Layers } from "lucide-react";
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
    document.cookie = "wayfinder-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold tracking-tight text-gray-900">
              WayFinder
            </span>
            <span className="text-[10px] font-medium text-gray-500 -mt-1 tracking-wider uppercase">
              Explore. Plan. Go.
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            Início
          </Link>
          <Link
            href="/compare"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Layers className="h-4 w-4" />
            Comparar Países
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
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
                className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
              >
                <User className="h-4 w-4 text-blue-600" />
                <span>{user.email?.split("@")[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-700 transition-all text-gray-500 cursor-pointer"
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-medium transition-colors"
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
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 md:hidden text-gray-700"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu content */}
      {menuOpen && (
        <div className="absolute top-[73px] left-0 w-full bg-white border-b border-gray-200 px-6 py-6 flex flex-col gap-5 md:hidden animate-fade-in-up">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-base font-medium text-gray-700 hover:text-blue-600"
          >
            Início
          </Link>
          <Link
            href="/compare"
            onClick={() => setMenuOpen(false)}
            className="text-base font-medium text-gray-700 hover:text-blue-600"
          >
            Comparar Países
          </Link>
          {user && (
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Favoritos
            </Link>
          )}

          <hr className="border-gray-100" />

          {user ? (
            <div className="flex flex-col gap-3">
              <div className="text-sm text-gray-500 px-2">
                Sessão iniciada como: <span className="font-semibold text-gray-800">{user.email}</span>
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-100 transition-all cursor-pointer"
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
                className="flex items-center justify-center rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
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
