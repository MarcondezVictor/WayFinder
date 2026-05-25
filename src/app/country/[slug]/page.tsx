import { countriesData } from "@/lib/countries-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Shield, 
  Coins, 
  CloudSun, 
  MapPin, 
  FileText, 
  Plane, 
  Utensils, 
  Bus, 
  Phone, 
  Star,
  Layers,
  Heart
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all countries in our dataset so it builds statically
export async function generateStaticParams() {
  return countriesData.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CountryPage({ params }: PageProps) {
  const { slug } = await params;
  const country = countriesData.find((c) => c.slug === slug);

  if (!country) {
    notFound();
  }

  // Visual helper to color security meter
  const getSafetyColor = (score: number) => {
    if (score >= 8) return "bg-emerald-500 text-emerald-500";
    if (score >= 5) return "bg-amber-500 text-amber-500";
    return "bg-red-500 text-red-500";
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 pb-20 relative">
      {/* Background Blurs */}
      <div className="absolute top-48 left-10 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-500/10" />
      <div className="absolute top-96 right-10 -z-10 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-500/10" />

      {/* Hero Banner Header */}
      <div className="relative w-full h-[360px] bg-zinc-900 overflow-hidden">
        <img
          src={country.imageUrl}
          alt={country.name}
          className="w-full h-full object-cover opacity-80 scale-105 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        
        {/* Banner Controls & Floating breadcrumb */}
        <div className="absolute top-8 left-6 md:left-12 z-10">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-zinc-950/40 border border-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-950/60 backdrop-blur-md transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Mapa</span>
          </Link>
        </div>

        {/* Hero Bottom details */}
        <div className="absolute bottom-10 left-6 md:left-12 flex flex-col gap-3 max-w-4xl text-white">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{country.flagEmoji}</span>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                {country.isoCode} · PAÍS DETALHADO
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-0.5">
                {country.name}
              </h1>
            </div>
          </div>
          <p className="text-base md:text-lg text-zinc-200/90 font-medium italic leading-relaxed max-w-2xl">
            "{country.tagline}"
          </p>
        </div>
      </div>

      {/* Main Content Dashboard */}
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        
        {/* Column 1 & 2 - Central Data Cards */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Overview */}
          <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-4">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Sobre {country.name}
            </h2>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
              {country.description}
            </p>
          </div>

          {/* Visa and Passport Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visa */}
            <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20">
                  <Plane className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight">
                  Requisitos de Visto
                </h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
                {country.visaInfo}
              </p>
            </div>

            {/* Passport */}
            <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 dark:bg-purple-500/20">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight">
                  Validade do Passaporte
                </h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
                {country.passportInfo}
              </p>
            </div>
          </div>

          {/* Points of Interest */}
          <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-6">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Pontos de Interesse & Atrações
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {country.pointsOfInterest.map((poi, idx) => (
                <div key={idx} className="flex flex-col rounded-2xl border border-zinc-100 bg-white/40 overflow-hidden dark:border-zinc-900 dark:bg-zinc-950/40">
                  <div className="relative h-32 w-full bg-zinc-100">
                    <img
                      src={poi.imageUrl}
                      alt={poi.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-1.5">
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
                      {poi.name}
                    </h4>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {poi.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Column 3 - Side Dashboard Metrics (Safety, Cost, Climate) */}
        <div className="flex flex-col gap-8">
          
          {/* Action Card: Save Favorites or Compare */}
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-200/40 shadow-md dark:border-zinc-900 flex flex-col gap-4">
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Ações de Destino
            </h3>
            
            <div className="flex flex-col gap-2.5">
              {/* Save to Favorites */}
              <button 
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-3 text-sm font-bold text-zinc-700 dark:text-zinc-300 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                <span>Adicionar aos Favoritos</span>
              </button>

              {/* Compare Button */}
              <Link
                href={`/compare?countryA=${country.slug}`}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 text-sm font-bold text-white shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <Layers className="h-4 w-4" />
                <span>Comparar este País</span>
              </Link>
            </div>
          </div>

          {/* Safety Dashboard Card */}
          <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                  Segurança Geral
                </span>
                <span className="text-base font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight mt-1">
                  Índice de Segurança
                </span>
              </div>
            </div>

            {/* Visual Score Meter */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-extrabold text-zinc-600 dark:text-zinc-400">
                <span>Tranquilidade do Viajante</span>
                <span className="text-indigo-500">{country.safetyScore} de 10</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${getSafetyColor(country.safetyScore).split(" ")[0]}`}
                  style={{ width: `${country.safetyScore * 10}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal font-semibold">
              {country.safetyDetails}
            </p>
          </div>

          {/* Budget Dashboard Card */}
          <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 dark:bg-amber-500/20">
                <Coins className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                  Finanças e Custos
                </span>
                <span className="text-base font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight mt-1">
                  Orçamento Médio Diário
                </span>
              </div>
            </div>

            {/* Big Numeric Highlight */}
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black tracking-tight bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                {country.avgCostDaily}€
              </span>
              <span className="text-sm font-bold text-zinc-400">/ dia</span>
            </div>

            <hr className="border-zinc-200/50 dark:border-zinc-800" />

            {/* Cost Breakdown Grid */}
            <div className="flex flex-col gap-3.5">
              <span className="text-xs font-extrabold tracking-wider text-zinc-400 uppercase">
                Estimativa Detalhada
              </span>

              {/* Lodging */}
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Star className="h-4 w-4 text-zinc-400" />
                  <span>Alojamento (Hostel/Quarto)</span>
                </div>
                <span className="text-zinc-800 dark:text-zinc-200 font-extrabold">{country.costsDetails.lodging}€</span>
              </div>

              {/* Food */}
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Utensils className="h-4 w-4 text-zinc-400" />
                  <span>Alimentação (Diária)</span>
                </div>
                <span className="text-zinc-800 dark:text-zinc-200 font-extrabold">{country.costsDetails.food}€</span>
              </div>

              {/* Transport */}
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Bus className="h-4 w-4 text-zinc-400" />
                  <span>Transporte Público</span>
                </div>
                <span className="text-zinc-800 dark:text-zinc-200 font-extrabold">{country.costsDetails.transport}€</span>
              </div>

              {/* Local SIM */}
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Phone className="h-4 w-4 text-zinc-400" />
                  <span>Internet Móvel (10GB)</span>
                </div>
                <span className="text-zinc-800 dark:text-zinc-200 font-extrabold">{country.costsDetails.localSim}€</span>
              </div>
            </div>
          </div>

          {/* Climate Card */}
          <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-500/20">
                <CloudSun className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                  Meio Ambiente
                </span>
                <span className="text-base font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight mt-1">
                  Tipo de Clima
                </span>
              </div>
            </div>

            <div className="inline-flex rounded-xl bg-sky-500/10 px-3 py-1.5 text-xs font-extrabold text-sky-600 dark:bg-sky-950/20 dark:text-sky-300 w-max">
              ⛅ {country.climateType}
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal font-semibold">
              {country.climateDetails}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
