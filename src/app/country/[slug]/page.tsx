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
  Globe, 
  Users, 
  Languages, 
  DollarSign, 
  AlertTriangle, 
  Zap, 
  Wifi, 
  Activity, 
  Calendar,
  Star,
  Layers
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
    if (score >= 8) return "bg-green-700 text-green-700 border-green-200";
    if (score >= 5) return "bg-amber-700 text-amber-700 border-amber-200";
    return "bg-red-700 text-red-700 border-red-200";
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 pb-20 relative">
      {/* Hero Banner Header */}
      <div className="relative w-full h-[320px] bg-white border-b border-gray-200 overflow-hidden">
        <img
          src={country.imageUrl}
          alt={country.name}
          className="w-full h-full object-cover opacity-20 filter brightness-105"
        />
        <div className="absolute inset-0 bg-white/60" />
        
        {/* Navigation Breadcrumb */}
        <div className="absolute top-8 left-6 md:left-12 z-10">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Mapa</span>
          </Link>
        </div>

        {/* Hero Details */}
        <div className="absolute bottom-8 left-6 md:left-12 flex flex-col gap-2 max-w-4xl text-gray-900">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{country.flagEmoji}</span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                {country.continent} · {country.isoCode}
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mt-0.5">
                {country.name}
              </h1>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-600 font-medium italic leading-relaxed max-w-2xl">
            "{country.tagline}"
          </p>
        </div>
      </div>

      {/* Main Content Dashboard Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
        
        {/* Column 1 & 2 - Primary Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* About & Demographics Grid */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                Sobre {country.name}
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-normal">
                {country.description}
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* Demographics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Capital */}
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200/50">
                <MapPin className="h-4 w-4 text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-medium text-gray-400 uppercase">Capital</span>
                  <span className="text-xs font-semibold text-gray-900">{country.capital}</span>
                </div>
              </div>

              {/* Population */}
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200/50">
                <Users className="h-4 w-4 text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-medium text-gray-400 uppercase">População</span>
                  <span className="text-xs font-semibold text-gray-900">
                    {(country.population / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200/50">
                <Languages className="h-4 w-4 text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-medium text-gray-400 uppercase">Idiomas</span>
                  <span className="text-xs font-semibold text-gray-900 truncate max-w-[100px]" title={country.languages}>
                    {country.languages}
                  </span>
                </div>
              </div>

              {/* Currency */}
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200/50">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-medium text-gray-400 uppercase">Moeda</span>
                  <span className="text-xs font-semibold text-gray-900 truncate max-w-[100px]" title={country.currency}>
                    {country.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Travel & Legal Requirements */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
              Requisitos Legais & Entrada
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Visa Requirements */}
              <div className="p-5 rounded-lg bg-gray-50 border border-gray-200/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-gray-750">
                  <Plane className="h-4 w-4 text-blue-600" />
                  <span>Regime de Vistos</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  {country.visaRequirements}
                </p>
              </div>

              {/* Passport Requirements */}
              <div className="p-5 rounded-lg bg-gray-50 border border-gray-200/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-gray-750">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Validade do Passaporte</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  {country.passportRequirements}
                </p>
              </div>

              {/* ETIAS / ESTA */}
              <div className="p-5 rounded-lg bg-gray-50 border border-gray-200/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-gray-750">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span>ETIAS / ESTA / Autorizações</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  {country.etiasRequirements}
                </p>
              </div>

              {/* Vaccination */}
              <div className="p-5 rounded-lg bg-gray-50 border border-gray-200/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-gray-750">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span>Vacinação e Saúde</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  {country.vaccineRequirements}
                </p>
              </div>
            </div>
          </div>

          {/* Points of Interest */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
              Pontos de Interesse & Atrações
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(country.topAttractions as PointOfInterest[]).map((poi, idx) => (
                <div key={idx} className="flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-36 w-full bg-gray-50">
                    <img
                      src={poi.imageUrl}
                      alt={poi.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-1.5">
                    <h4 className="text-xs font-semibold text-gray-900 leading-tight">
                      {poi.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-3">
                      {poi.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Column 3 - Side Bar Widgets */}
        <div className="flex flex-col gap-6">
          
          {/* Action Card: Save Favorites or Compare */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
              Ações de Destino
            </h3>
            
            <div className="flex flex-col gap-2.5">
              {/* Save to Favorites */}
              <FavoriteButton countryId={country.id} countryName={country.name} />

              {/* Compare Button */}
              <Link
                href={`/compare?countryA=${country.slug}`}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-sm font-medium transition-colors"
              >
                <Layers className="h-4 w-4" />
                <span>Comparar este País</span>
              </Link>
            </div>
          </div>

          {/* Safety & Alerts Widget */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-800">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest leading-none">
                  Segurança Geral
                </span>
                <span className="text-base font-semibold text-gray-900 tracking-tight mt-1">
                  Índice de Segurança
                </span>
              </div>
            </div>

            {/* Visual Score Meter */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                <span>Classificação de Segurança</span>
                <span className="text-blue-600 font-semibold">{country.safetyScore} de 10</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${getScoreColor(country.safetyScore).split(" ")[0]}`}
                  style={{ width: `${country.safetyScore * 10}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <div className="font-normal text-gray-600">
                📞 Números de Emergência: <span className="font-semibold">{country.emergencyNumbers}</span>
              </div>
              {country.travelWarnings && (
                <div className="flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-[11px] text-red-700 font-normal leading-relaxed">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-red-700" />
                  <span>{country.travelWarnings}</span>
                </div>
              )}
            </div>
          </div>

          {/* Budget Widget */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-800">
                <Coins className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest leading-none">
                  Finanças e Custos
                </span>
                <span className="text-base font-semibold text-gray-900 tracking-tight mt-1">
                  Custos Médios Estimados
                </span>
              </div>
            </div>

            {/* Living Index */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>Índice de Custo de Vida</span>
                <span className="text-blue-600 font-semibold">{country.costLivingIndex} / 120</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${(country.costLivingIndex / 120) * 100}%` }}
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Detailed breakdowns */}
            <div className="flex flex-col gap-3 text-xs font-normal text-gray-600">
              {/* Hotel */}
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Star className="h-4 w-4 text-gray-400" />
                  <span>Alojamento (Médio / Noite)</span>
                </div>
                <span className="text-gray-900 font-semibold">{country.avgHotelPrice}€</span>
              </div>

              {/* Meal */}
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Utensils className="h-4 w-4 text-gray-400" />
                  <span>Refeição Individual</span>
                </div>
                <span className="text-gray-900 font-semibold">{country.avgMealPrice}€</span>
              </div>

              {/* Transport */}
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Bus className="h-4 w-4 text-gray-400" />
                  <span>Transporte Público</span>
                </div>
                <span className="text-gray-900 font-semibold">{country.avgTransportCost}€</span>
              </div>
            </div>
          </div>

          {/* Practical Metrics Widget */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-800">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 tracking-tight">
                Informações Práticas
              </h3>
            </div>

            <div className="flex flex-col gap-4 text-xs font-normal text-gray-600">
              {/* Power plug */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Tomadas e Voltagem</span>
                <span className="rounded-lg bg-gray-50 border border-gray-200 px-2.5 py-1 font-semibold text-gray-900">
                  ⚡ {country.powerPlugType}
                </span>
              </div>

              <hr className="border-gray-100" />

              {/* Internet Quality */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Wifi className="h-4 w-4 text-gray-400" />
                    <span>Qualidade de Internet</span>
                  </div>
                  <span>{country.internetQualityScore}/10</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getScoreColor(country.internetQualityScore).split(" ")[0]}`}
                    style={{ width: `${country.internetQualityScore * 10}%` }}
                  />
                </div>
              </div>

              {/* Healthcare Quality */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-gray-400" />
                    <span>Qualidade da Saúde</span>
                  </div>
                  <span>{country.healthcareQualityScore}/10</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getScoreColor(country.healthcareQualityScore).split(" ")[0]}`}
                    style={{ width: `${country.healthcareQualityScore * 10}%` }}
                  />
                </div>
              </div>

              {/* Transportation Quality */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Bus className="h-4 w-4 text-gray-400" />
                    <span>Rede de Transportes</span>
                  </div>
                  <span>{country.transportQualityScore}/10</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getScoreColor(country.transportQualityScore).split(" ")[0]}`}
                    style={{ width: `${country.transportQualityScore * 10}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tourism & Climate Widgets */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-800">
                <CloudSun className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 tracking-tight">
                Clima & Turismo
              </h3>
            </div>

            <div className="flex flex-col gap-4 text-xs font-normal text-gray-600">
              {/* Climate badge */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Clima Tipo</span>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-800 font-medium text-xs">
                  ⛅ {country.climateType}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-normal">
                {country.climateDetails}
              </p>

              <hr className="border-gray-100" />

              {/* Best time to visit */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Melhor Época para Visitar</span>
                </div>
                <span className="text-gray-800 font-medium leading-normal text-[11px]">
                  {country.bestTimeVisit}
                </span>
              </div>

              {/* Major Cities */}
              <div className="flex flex-col gap-2">
                <span className="text-gray-500">Cidades Principais</span>
                <div className="flex flex-wrap gap-1.5">
                  {country.majorCities.map((city, idx) => (
                    <span key={idx} className="rounded-lg bg-gray-50 border border-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-700">
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
