"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Mail, Lock, User, UserPlus, Compass, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !fullName) {
      setErrorMsg("Por favor, preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("A palavra-passe deve conter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setSuccessMsg("Conta criada com sucesso! Por favor, verifique o seu e-mail.");
    setEmail("");
    setPassword("");
    setFullName("");
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
            Criar Nova Conta
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-semibold">
            Registe-se em segundos para guardar os seus destinos de eleição.
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
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute top-3 left-4 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Insira o seu nome"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                className="w-full rounded-xl border border-zinc-200/80 bg-white/50 py-2.5 pl-11 pr-4 text-sm font-semibold text-zinc-800 placeholder-zinc-400 shadow-sm backdrop-blur-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-indigo-400"
              />
            </div>
          </div>

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
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Palavra-passe
            </label>
            <div className="relative">
              <Lock className="absolute top-3 left-4 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
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
                <UserPlus className="h-4 w-4" />
                <span>Registrar Conta</span>
              </>
            )}
          </button>
        </form>

        <hr className="border-zinc-200/50 dark:border-zinc-800" />

        {/* Redirect to signin */}
        <div className="text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          Já possui uma conta?{" "}
          <Link href="/login" className="font-bold text-indigo-500 hover:underline">
            Inicie sessão aqui
          </Link>
        </div>
      </div>
    </div>
  );
}