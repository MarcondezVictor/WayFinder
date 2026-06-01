import { getCountryBySlug, getCountries } from "@/lib/db-countries";
import { notFound } from "next/navigation";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { PointOfInterest } from "@/lib/countries-data";
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
  Heart,
  Globe,
  Users,
  Languages,
  DollarSign,
  AlertTriangle,
  Zap,
  Wifi,
  Activity,
  Calendar
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all countries so it builds statically
export async function generateStaticParams() {
  const list = await getCountries();
  return list.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CountryPage({ params }: PageProps) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  // Visual helper to color scores (safety, internet, healthcare, transport)
  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-emerald-500 text-emerald-500 border-emerald-500/20";
    if (score >= 5) return "bg-amber-500 text-amber-500 border-amber-500/20";
    return "bg-red-500 text-red-500 border-red-500/20";
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 pb-20 relative">
      {/* Background Blurs */}
      <div className="absolute top-48 left-10 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-500/10" />
      <div className="absolute top-96 right-10 -z-10 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-500/10" />

      {/* Hero Banner Header */}
      <div className="relative w-full h-[380px] bg-zinc-900 overflow-hidden">
        <img
          src={country.imageUrl}
          alt={country.name}
          className="w-full h-full object-cover opacity-80 scale-105 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        
        {/* Navigation Breadcrumb */}
        <div className="absolute top-8 left-6 md:left-12 z-10">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-zinc-950/40 border border-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-950/60 backdrop-blur-md transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Mapa</span>
          </Link>
        </div>

        {/* Hero Details */}
        <div className="absolute bottom-10 left-6 md:left-12 flex flex-col gap-3 max-w-4xl text-white">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{country.flagEmoji}</span>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                {country.continent} · {country.isoCode}
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

      {/* Main Content Dashboard Grid */}
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        
        {/* Column 1 & 2 - Primary Details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* About & Demographics Grid */}
          <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Sobre {country.name}
              </h2>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
                {country.description}
              </p>
            </div>

            <hr className="border-zinc-200/50 dark:border-zinc-800" />

            {/* Demographics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Capital */}
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30">
                <MapPin className="h-4 w-4 text-indigo-500" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase">Capital</span>
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200">{country.capital}</span>
                </div>
              </div>

              {/* Population */}
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30">
                <Users className="h-4 w-4 text-purple-500" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase">População</span>
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200">
                    {(country.population / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30">
                <Languages className="h-4 w-4 text-emerald-500" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase">Idiomas</span>
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200 truncate max-w-[100px]" title={country.languages}>
                    {country.languages}
                  </span>
                </div>
              </div>

              {/* Currency */}
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30">
                <DollarSign className="h-4 w-4 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase">Moeda</span>
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200 truncate max-w-[100px]" title={country.currency}>
                    {country.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Travel & Legal Requirements */}
          <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-6">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Requisitos Legais & Entrada
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Visa Requirements */}
              <div className="p-5 rounded-2xl bg-zinc-100/30 border border-zinc-200/30 dark:bg-zinc-900/20 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-bold text-xs text-zinc-800 dark:text-zinc-200">
                  <Plane className="h-4 w-4 text-indigo-500" />
                  <span>Regime de Vistos</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                  {country.visaRequirements}
                </p>
              </div>

              {/* Passport Requirements */}
              <div className="p-5 rounded-2xl bg-zinc-100/30 border border-zinc-200/30 dark:bg-zinc-900/20 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-bold text-xs text-zinc-800 dark:text-zinc-200">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <span>Validade do Passaporte</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                  {country.passportRequirements}
                </p>
              </div>

              {/* ETIAS / ESTA */}
              <div className="p-5 rounded-2xl bg-zinc-100/30 border border-zinc-200/30 dark:bg-zinc-900/20 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-bold text-xs text-zinc-800 dark:text-zinc-200">
                  <Globe className="h-4 w-4 text-sky-500" />
                  <span>ETIAS / ESTA / Autorizações</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                  {country.etiasRequirements}
                </p>
              </div>

              {/* Vaccination */}
              <div className="p-5 rounded-2xl bg-zinc-100/30 border border-zinc-200/30 dark:bg-zinc-900/20 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-bold text-xs text-zinc-800 dark:text-zinc-200">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  <span>Vacinação e Saúde</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                  {country.vaccineRequirements}
                </p>
              </div>
            </div>
          </div>

          {/* Points of Interest */}
          <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-6">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Pontos de Interesse & Atrações
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(country.topAttractions as PointOfInterest[]).map((poi, idx) => (
                <div key={idx} className="flex flex-col rounded-2xl border border-zinc-100 bg-white/40 overflow-hidden dark:border-zinc-900 dark:bg-zinc-950/40 hover:shadow-md transition-shadow">
                  <div className="relative h-36 w-full bg-zinc-100">
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

        {/* Column 3 - Side Bar Widgets */}
        <div className="flex flex-col gap-8">
          
          {/* Action Card: Save Favorites or Compare */}
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-200/40 shadow-md dark:border-zinc-900 flex flex-col gap-4">
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Ações de Destino
            </h3>
            
            <div className="flex flex-col gap-2.5">
              {/* Save to Favorites */}
              <FavoriteButton countryId={country.id} countryName={country.name} />

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

          {/* Safety & Alerts Widget */}
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
                <span>Classificação de Segurança</span>
                <span className="text-indigo-500 font-bold">{country.safetyScore} de 10</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${getScoreColor(country.safetyScore).split(" ")[0]}`}
                  style={{ width: `${country.safetyScore * 10}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <div className="font-semibold text-zinc-700 dark:text-zinc-300">
                📞 Números de Emergência: <span className="font-bold">{country.emergencyNumbers}</span>
              </div>
              {country.travelWarnings && (
                <div className="flex gap-2 rounded-xl border border-red-200 bg-red-50/50 p-3 text-[11px] text-red-700 dark:border-red-950/40 dark:bg-red-950/20 dark:text-red-400 font-semibold leading-relaxed">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                  <span>{country.travelWarnings}</span>
                </div>
              )}
            </div>
          </div>

          {/* Budget Widget */}
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
                  Custos Médios Estimados
                </span>
              </div>
            </div>

            {/* Living Index */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400">
                <span>Índice de Custo de Vida</span>
                <span className="text-indigo-500">{country.costLivingIndex} / 120</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-200/60 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${(country.costLivingIndex / 120) * 100}%` }}
                />
              </div>
            </div>

            <hr className="border-zinc-200/50 dark:border-zinc-800" />

            {/* Detailed breakdowns */}
            <div className="flex flex-col gap-3 text-xs font-semibold">
              {/* Hotel */}
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Star className="h-4 w-4 text-zinc-400" />
                  <span>Alojamento (Médio / Noite)</span>
                </div>
                <span className="text-zinc-800 dark:text-zinc-100 font-extrabold">{country.avgHotelPrice}€</span>
              </div>

              {/* Meal */}
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Utensils className="h-4 w-4 text-zinc-400" />
                  <span>Refeição Individual</span>
                </div>
                <span className="text-zinc-800 dark:text-zinc-100 font-extrabold">{country.avgMealPrice}€</span>
              </div>

              {/* Transport */}
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Bus className="h-4 w-4 text-zinc-400" />
                  <span>Transporte Público</span>
                </div>
                <span className="text-zinc-800 dark:text-zinc-100 font-extrabold">{country.avgTransportCost}€</span>
              </div>
            </div>
          </div>

          {/* Practical Metrics Widget */}
          <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 dark:bg-purple-500/20">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight">
                Informações Práticas
              </h3>
            </div>

            <div className="flex flex-col gap-4 text-xs font-semibold">
              {/* Power plug */}
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 dark:text-zinc-400">Tomadas e Voltagem</span>
                <span className="rounded-lg bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 font-bold text-zinc-800 dark:text-zinc-200">
                  ⚡ {country.powerPlugType}
                </span>
              </div>

              <hr className="border-zinc-200/50 dark:border-zinc-800" />

              {/* Internet Quality */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Wifi className="h-4 w-4 text-zinc-400" />
                    <span>Qualidade de Internet</span>
                  </div>
                  <span>{country.internetQualityScore}/10</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getScoreColor(country.internetQualityScore).split(" ")[0]}`}
                    style={{ width: `${country.internetQualityScore * 10}%` }}
                  />
                </div>
              </div>

              {/* Healthcare Quality */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-zinc-400" />
                    <span>Qualidade da Saúde</span>
                  </div>
                  <span>{country.healthcareQualityScore}/10</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getScoreColor(country.healthcareQualityScore).split(" ")[0]}`}
                    style={{ width: `${country.healthcareQualityScore * 10}%` }}
                  />
                </div>
              </div>

              {/* Transportation Quality */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Bus className="h-4 w-4 text-zinc-400" />
                    <span>Rede de Transportes</span>
                  </div>
                  <span>{country.transportQualityScore}/10</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getScoreColor(country.transportQualityScore).split(" ")[0]}`}
                    style={{ width: `${country.transportQualityScore * 10}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tourism & Climate Widgets */}
          <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-500/20">
                <CloudSun className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight">
                Clima & Turismo
              </h3>
            </div>

            <div className="flex flex-col gap-4 text-xs font-semibold">
              {/* Climate badge */}
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 dark:text-zinc-400">Clima Tipo</span>
                <span className="rounded-lg bg-sky-500/10 px-2.5 py-1 text-sky-600 dark:bg-sky-950/20 dark:text-sky-300 font-bold">
                  ⛅ {country.climateType}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-normal">
                {country.climateDetails}
              </p>

              <hr className="border-zinc-200/50 dark:border-zinc-800" />

              {/* Best time to visit */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                  <Calendar className="h-4 w-4 text-zinc-400" />
                  <span>Melhor Época para Visitar</span>
                </div>
                <span className="text-zinc-800 dark:text-zinc-200 font-bold leading-normal text-[11px]">
                  {country.bestTimeVisit}
                </span>
              </div>

              {/* Major Cities */}
              <div className="flex flex-col gap-2">
                <span className="text-zinc-500 dark:text-zinc-400">Cidades Principais</span>
                <div className="flex flex-wrap gap-1.5">
                  {country.majorCities.map((city, idx) => (
                    <span key={idx} className="rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/20 px-2 py-0.5 text-[10px] font-bold text-zinc-700 dark:text-zinc-300">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
