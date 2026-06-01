//Page Login
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff, Compass } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setSuccessMsg("Autenticação efetuada com sucesso! Redirecionando...");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  }

  return (
    <div className="flex-grow flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Background radial blurs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px] dark:bg-indigo-500/20" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-500/20" />

      <div className="w-full max-w-md rounded-3xl glass-card border border-white/20 shadow-2xl p-8 flex flex-col gap-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <Link href="/" className="flex items-center gap-2 group mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-md">
              <Compass className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              WayFinder
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Bem-vindo de volta!
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-semibold">
            Inicie sessão para ver e gerir os seus destinos salvos.
          </p>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="rounded-xl border border-red-200/50 bg-red-50/50 p-3.5 text-xs font-semibold text-red-600 dark:border-red-950/50 dark:bg-red-950/20 dark:text-red-400">
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="rounded-xl border border-emerald-200/50 bg-emerald-50/50 p-3.5 text-xs font-semibold text-emerald-600 dark:border-emerald-950/50 dark:bg-emerald-950/20 dark:text-emerald-400">
            ✓ {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Endereço de E-mail
            </label>
            <div className="relative">
              <Mail className="absolute top-3 left-4 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full rounded-xl border border-zinc-200/80 bg-white/50 py-2.5 pl-11 pr-4 text-sm font-semibold text-zinc-800 placeholder-zinc-400 shadow-sm backdrop-blur-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-indigo-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Palavra-passe
              </label>
              <a href="#" className="text-xs font-bold text-indigo-500 hover:underline">
                Esqueceu a palavra-passe?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute top-3 left-4 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Insira a sua palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full rounded-xl border border-zinc-200/80 bg-white/50 py-2.5 pl-11 pr-10 text-sm font-semibold text-zinc-800 placeholder-zinc-400 shadow-sm backdrop-blur-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-indigo-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer mt-2"
          >
            {loading ? (
              <span className="flex h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span>Entrar na Conta</span>
              </>
            )}
          </button>
        </form>

        <hr className="border-zinc-200/50 dark:border-zinc-800" />

        {/* Redirect to signup */}
        <div className="text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          Ainda não tem uma conta?{" "}
          <Link href="/register" className="font-bold text-indigo-500 hover:underline">
            Crie uma conta gratuita
          </Link>
        </div>
      </div>
    </div>
  );
}