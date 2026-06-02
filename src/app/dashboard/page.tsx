"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import { getCountries } from "@/lib/db-countries";
import Link from "next/link";
import { 
  User, 
  Heart, 
  Settings, 
  Compass, 
  MapPin, 
  Shield, 
  Coins, 
  CloudSun, 
  Layers, 
  Trash2, 
  Save, 
  Globe, 
  Star,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function DashboardPage() {
  const { user, profile, preferences, loading, refreshProfile, signOut } = useAuth();
  
  // Tab control
  const [activeTab, setActiveTab] = useState<"overview" | "favorites" | "settings">("overview");

  // Profile Form States
  const [fullName, setFullName] = useState("");
  const [nationality, setNationality] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  
  // Favorites State
  const [favoritesList, setFavoritesList] = useState<any[]>([]);
  const [allCountries, setAllCountries] = useState<any[]>([]);
  
  // Loading states
  const [updating, setUpdating] = useState(false);
  const [favsLoading, setFavsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Recommendations state
  const [recommendations, setRecommendations] = useState<any[]>([]);

  // 1. Sync form states when profile loads
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setNationality(profile.nationality || "");
      setAvatarUrl(profile.avatar_url || "");
    }
    if (preferences) {
      setTravelStyle(preferences.preferred_travel_style || "Turismo");
    }
  }, [profile, preferences]);

  // 2. Fetch Favorites & Recommendations
  useEffect(() => {
    if (user) {
      fetchFavorites();
      loadRecommendations();
    }
  }, [user, preferences]);

  async function fetchFavorites() {
    setFavsLoading(true);
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select(`
          id,
          country_id,
          countries (*)
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setFavoritesList(data || []);
    } catch (err: any) {
      console.error("Error fetching favorites:", err.message);
    } finally {
      setFavsLoading(false);
    }
  }

  async function loadRecommendations() {
    try {
      const list = await getCountries();
      setAllCountries(list);

      // Simple recommendation engine: Filter countries based on preferred travel style
      // Tourism -> General top rated
      // Estudos -> low average daily costs & high safety
      // Trabalho -> high internet score & high healthcare
      // Nómada Digital -> high internet score & moderate costs
      let recommended = [...list];
      
      const style = preferences?.preferred_travel_style || "Turismo";
      
      if (style === "Estudos") {
        recommended = recommended.filter((c) => Math.round(c.avgHotelPrice + c.avgMealPrice * 2 + c.avgTransportCost) <= 100 && c.safetyScore >= 7);
      } else if (style === "Trabalho" || style === "Nómada Digital") {
        recommended = recommended.filter((c) => c.internetQualityScore >= 8);
      } else if (style === "Emigração") {
        recommended = recommended.filter((c) => c.healthcareQualityScore >= 8 && c.safetyScore >= 8);
      }

      // Cap at 3 items
      setRecommendations(recommended.slice(0, 3));
    } catch (err) {
      console.error("Error loading recommendations:", err);
    }
  }

  // 3. Remove favorite item
  async function removeFavorite(countryId: string) {
    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("country_id", countryId);

      if (error) throw error;
      setFavoritesList(favoritesList.filter((f) => f.country_id !== countryId));
    } catch (err: any) {
      console.error("Error removing favorite:", err.message);
    }
  }

  // 4. Save Profile changes
  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setUpdating(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // 1. Update profiles table
      const { error: profError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          nationality: nationality,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);

      if (profError) throw profError;

      // 2. Update user_preferences table
      const { error: prefError } = await supabase
        .from("user_preferences")
        .update({
          preferred_travel_style: travelStyle as any,
        })
        .eq("id", user.id);

      if (prefError) throw prefError;

      await refreshProfile();
      setSuccessMsg("Perfil e preferências atualizados com sucesso!");
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setUpdating(false);
    }
  }

  // 5. Dynamic loading skeletons
  if (loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-20 gap-4">
        <div className="flex h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
        <span className="text-sm font-semibold text-zinc-500">A carregar o seu painel...</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 pb-20 relative">
      {/* Radial Blurs */}
      <div className="absolute top-20 left-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-500/10" />
      <div className="absolute top-96 right-1/4 -z-10 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-500/10" />

      {/* Hero Header Card */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="rounded-3xl glass-panel border border-zinc-200/50 dark:border-zinc-800 shadow-md p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-md bg-zinc-100">
              <img
                src={avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-500">
                Painel Pessoal
              </span>
              <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                Olá, {fullName || user.email?.split("@")[0]}!
              </h1>
              <span className="text-xs font-semibold text-zinc-400">
                {user.email} · {nationality || "Nacionalidade não definida"}
              </span>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 p-1.5 border border-zinc-200/20 w-max shrink-0">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "overview" ? 'bg-white dark:bg-zinc-800 text-indigo-500 shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
            >
              <Compass className="h-4 w-4" />
              <span>Geral</span>
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "favorites" ? 'bg-white dark:bg-zinc-800 text-indigo-500 shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
            >
              <Heart className="h-4 w-4" />
              <span>Favoritos</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "settings" ? 'bg-white dark:bg-zinc-800 text-indigo-500 shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
            >
              <Settings className="h-4 w-4" />
              <span>Definições</span>
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Tab Body */}
      <section className="w-full max-w-7xl mx-auto px-6 py-6">
        
        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col - Stats & Recommended */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              
              {/* Preferences Summary */}
              <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  <h2 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Estilo de Viagem Escolhido
                  </h2>
                </div>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-semibold leading-relaxed">
                  O seu perfil está configurado para focar em **{travelStyle}**. Com base nisso, personalizamos as suas recomendações e priorizamos custos e segurança adequados aos seus objetivos.
                </p>
                <div className="inline-flex rounded-xl bg-indigo-500/10 px-3.5 py-1.5 text-xs font-extrabold text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400 w-max">
                  ✈️ Perfil atual: {travelStyle}
                </div>
              </div>

              {/* Personalized Recommendations */}
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight px-1">
                  Recomendados para Si ✨
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.map((country) => (
                    <Link
                      key={country.slug}
                      href={`/country/${country.slug}`}
                      className="group flex flex-col rounded-3xl glass-card overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <div className="relative h-32 w-full overflow-hidden bg-zinc-100">
                        <img
                          src={country.imageUrl}
                          alt={country.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-zinc-950/70 px-2 py-1 text-xs font-bold text-white backdrop-blur-md">
                          <span>{country.flagEmoji}</span>
                          <span>{country.name}</span>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col gap-3 flex-grow">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none truncate">
                          {country.tagline}
                        </span>
                        <div className="grid grid-cols-2 gap-2 mt-auto text-[10px] font-bold">
                          <div className="flex items-center gap-1 text-zinc-500">
                            <Shield className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                            <span>Segurança: {country.safetyScore}</span>
                          </div>
                          <div className="flex items-center gap-1 text-zinc-500">
                            <Coins className="h-3.5 w-3.5 text-amber-500" />
                            <span>Custo: {Math.round(country.avgHotelPrice + country.avgMealPrice * 2 + country.avgTransportCost)}€</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col - Quick Stats Sidebar */}
            <div className="flex flex-col gap-8">
              
              {/* Quick statistics */}
              <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-6">
                <h3 className="text-base font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight">
                  Resumo de Atividade
                </h3>

                <div className="flex flex-col gap-4 text-xs font-semibold">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30">
                    <span className="text-zinc-500">Destinos Favoritos</span>
                    <span className="text-indigo-500 font-extrabold text-base">{favoritesList.length}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30">
                    <span className="text-zinc-500">Estilo de Viagem</span>
                    <span className="text-indigo-500 font-extrabold">{travelStyle}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. FAVORITES TAB */}
        {activeTab === "favorites" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Os Seus Destinos Guardados
              </h2>
              <span className="text-xs text-zinc-400 font-bold uppercase">
                Total: {favoritesList.length} Países
              </span>
            </div>

            {favsLoading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
              </div>
            ) : favoritesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favoritesList.map((item) => {
                  const country = item.countries;
                  if (!country) return null;

                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-3xl glass-card border border-zinc-200/50 dark:border-zinc-900 shadow-sm flex items-center justify-between gap-4 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl overflow-hidden bg-zinc-100 shrink-0">
                          <img
                            src={country.image_url}
                            alt={country.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xl">{country.flag_emoji}</span>
                            <Link href={`/country/${country.slug}`} className="text-base font-extrabold text-zinc-800 dark:text-zinc-100 hover:text-indigo-500 transition-colors">
                              {country.name}
                            </Link>
                          </div>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                            Capital: {country.capital} · Custo: {Math.round(country.avg_hotel_price + country.avg_meal_price * 2 + country.avg_transport_cost)}€/dia
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/compare?countryA=${country.slug}`}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 hover:bg-indigo-50 hover:text-indigo-500 dark:bg-zinc-850 dark:hover:bg-indigo-950/20 text-zinc-500 transition-all cursor-pointer"
                          title="Comparar este país"
                        >
                          <Layers className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => removeFavorite(country.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 hover:text-red-500 dark:bg-red-950/10 dark:hover:bg-red-950/25 text-red-400 transition-all cursor-pointer"
                          title="Remover dos favoritos"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 p-20 flex flex-col items-center justify-center text-center gap-4 bg-zinc-50/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                  <Heart className="h-7 w-7 text-indigo-500" />
                </div>
                <h3 className="text-base font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight">
                  Nenhum destino guardado
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm font-semibold leading-relaxed">
                  Consulte o nosso mapa interativo global e adicione os seus destinos preferidos aos favoritos para os ver listados aqui!
                </p>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/10 hover:shadow-lg transition-all"
                >
                  <span>Voltar ao Mapa</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 3. SETTINGS & PREFERENCES TAB */}
        {activeTab === "settings" && (
          <div className="mx-auto max-w-2xl rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900 p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Definições de Perfil & Viagem
              </h2>
              <p className="text-xs text-zinc-400 font-semibold leading-relaxed">
                Atualize o seu nome visível, nacionalidade e as preferências de destino para personalizar a sua experiência.
              </p>
            </div>

            {/* Feedback Banners */}
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

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={updating}
                  className="w-full rounded-xl border border-zinc-200/80 bg-white/50 py-2.5 px-4 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100"
                />
              </div>

              {/* Nationality */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Nacionalidade
                </label>
                <input
                  type="text"
                  placeholder="ex: Portuguesa, Brasileira"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  disabled={updating}
                  className="w-full rounded-xl border border-zinc-200/80 bg-white/50 py-2.5 px-4 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100"
                />
              </div>

              {/* Avatar Url */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  URL da Imagem de Perfil (Avatar)
                </label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  disabled={updating}
                  className="w-full rounded-xl border border-zinc-200/80 bg-white/50 py-2.5 px-4 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100"
                />
              </div>

              {/* Travel Style Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Estilo de Viagem Principal
                </label>
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  disabled={updating}
                  className="w-full rounded-xl border border-zinc-200/80 bg-white/50 py-2.5 px-4 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-200"
                >
                  <option value="Turismo">Turismo (Lazer & Exploração)</option>
                  <option value="Estudos">Estudos (Intercâmbios & Erasmus)</option>
                  <option value="Trabalho">Trabalho (Relocalização Corporativa)</option>
                  <option value="Emigração">Emigração (Mudança Definitiva)</option>
                  <option value="Nómada Digital">Nómada Digital (Trabalho Remoto)</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={updating}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 text-sm font-bold text-white shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer mt-2"
              >
                {updating ? (
                  <span className="flex h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Guardar Definições</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </section>
    </div>
  );
}
