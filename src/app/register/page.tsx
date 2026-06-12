"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Mail, Lock, User, UserPlus, Compass, Eye, EyeOff } from "lucide-react";

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

    const { error } = await supabase.auth.signUp({
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

    setSuccessMsg("Conta criada com sucesso! Redirecionando para o painel...");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
    setEmail("");
    setPassword("");
    setFullName("");
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
            Criar Nova Conta
          </h2>
          <p className="text-sm text-gray-500 font-normal">
            Registe-se em segundos para guardar os seus destinos de eleição.
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
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute top-3 left-4 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Insira o seu nome"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-11 pr-4 text-sm font-normal text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

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
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Palavra-passe
            </label>
            <div className="relative">
              <Lock className="absolute top-3 left-4 h-4 w-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
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
                <UserPlus className="h-4 w-4" />
                <span>Registrar Conta</span>
              </>
            )}
          </button>
        </form>

        <hr className="border-gray-200" />

        {/* Redirect to signin */}
        <div className="text-center text-xs font-medium text-gray-500">
          Já possui uma conta?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Inicie sessão aqui
          </Link>
        </div>
      </div>
    </div>
  );
}