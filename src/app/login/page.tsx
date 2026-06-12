"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Mail, Lock, LogIn, Eye, EyeOff, Compass } from "lucide-react";

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

    const { error } = await supabase.auth.signInWithPassword({
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
    <div className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white border border-gray-200 shadow-sm p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <Link href="/" className="flex items-center gap-2 group mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Compass className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-gray-900">
              WayFinder
            </span>
          </Link>
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Bem-vindo de volta!
          </h2>
          <p className="text-sm text-gray-500 font-normal">
            Inicie sessão para ver e gerir os seus destinos salvos.
          </p>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-xs font-medium text-green-700">
            ✓ {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Endereço de E-mail
            </label>
            <div className="relative">
              <Mail className="absolute top-3 left-4 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-11 pr-4 text-sm font-normal text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Palavra-passe
              </label>
              <a href="#" className="text-xs font-medium text-blue-600 hover:underline">
                Esqueceu a palavra-passe?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute top-3 left-4 h-4 w-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Insira a sua palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-11 pr-10 text-sm font-normal text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 py-3 text-sm font-medium text-white shadow-sm transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer mt-2"
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

        <hr className="border-gray-200" />

        {/* Redirect to signup */}
        <div className="text-center text-xs font-medium text-gray-500">
          Ainda não tem uma conta?{" "}
          <Link href="/register" className="font-semibold text-blue-600 hover:underline">
            Crie uma conta gratuita
          </Link>
        </div>
      </div>
    </div>
  );
}