"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { countriesData, CountrySchema } from "@/lib/countries-data";
import Link from "next/link";
import { 
  ArrowLeft, 
  Layers, 
  Shield, 
  Coins, 
  CloudSun, 
  FileText, 
  Scale, 
  TrendingDown, 
  Smile, 
  Compass,
  ArrowRight,
  TrendingUp
} from "lucide-react";

function CompareContent() {
  const searchParams = useSearchParams();
  const [countryASlug, setCountryASlug] = useState("");
  const [countryBSlug, setCountryBSlug] = useState("");

  // Initialize from search queries if present
  useEffect(() => {
    const cA = searchParams.get("countryA");
    const cB = searchParams.get("countryB");
    if (cA) setCountryASlug(cA);
    if (cB) setCountryBSlug(cB);
  }, [searchParams]);

  const countryA = countriesData.find((c) => c.slug === countryASlug) || null;
  const countryB = countriesData.find((c) => c.slug === countryBSlug) || null;

  // Analysis helpers
  const getCheaperCountry = () => {
    if (!countryA || !countryB) return null;
    const costA = Math.round(countryA.avgHotelPrice + countryA.avgMealPrice * 2 + countryA.avgTransportCost);
    const costB = Math.round(countryB.avgHotelPrice + countryB.avgMealPrice * 2 + countryB.avgTransportCost);
    if (costA < costB) return countryA;
    if (costB < costA) return countryB;
    return null;
  };

  const getSaferCountry = () => {
    if (!countryA || !countryB) return null;
    if (countryA.safetyScore > countryB.safetyScore) return countryA;
    if (countryB.safetyScore > countryA.safetyScore) return countryB;
    return null;
  };

  const cheaper = getCheaperCountry();
  const safer = getSaferCountry();

  return (
    <div className="w-full min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 pb-20 relative">
      {/* Background blurs */}
      <div className="absolute top-48 left-10 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-500/10" />
      <div className="absolute top-96 right-10 -z-10 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-500/10" />

      {/* Header Banner */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-12 pb-6 flex flex-col gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-bold text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Voltar ao Início</span>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 w-max">
            <Layers className="h-4 w-4" />
            <span>Ferramenta de Comparação</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Comparar Países Lado a Lado
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed max-w-2xl">
            Escolha dois destinos abaixo para confrontar requisitos legais, custos diários e índices de segurança.
          </p>
        </div>
      </section>

      {/* Selectors Bar */}
      <section className="w-full max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900 p-6">
          
          {/* Select A */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              País A (Esquerda)
            </label>
            <select
              value={countryASlug}
              onChange={(e) => setCountryASlug(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm focus:border-indigo-500 outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
            >
              <option value="">-- Selecione o País A --</option>
              {countriesData.map((c) => (
                <option key={c.slug} value={c.slug} disabled={c.slug === countryBSlug}>
                  {c.flagEmoji} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select B */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              País B (Direita)
            </label>
            <select
              value={countryBSlug}
              onChange={(e) => setCountryBSlug(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm focus:border-indigo-500 outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
            >
              <option value="">-- Selecione o País B --</option>
              {countriesData.map((c) => (
                <option key={c.slug} value={c.slug} disabled={c.slug === countryASlug}>
                  {c.flagEmoji} {c.name}
                </option>
              ))}
            </select>
          </div>

        </div>
      </section>

      {/* Comparison Grid */}
      <section className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col gap-8">
        {countryA && countryB ? (
          <>
            {/* Quick Analysis Alert Banner */}
            <div className="rounded-3xl border border-indigo-200/50 bg-indigo-50/50 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 dark:border-indigo-950/50 dark:bg-indigo-950/15">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-md">
                  <Scale className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    Análise WayFinder Inteligente
                  </h3>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold leading-relaxed mt-1 flex flex-col gap-1">
                    {cheaper && (
                      <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                        <TrendingDown className="h-3.5 w-3.5" />
                        O destino com custo de vida mais acessível é {cheaper.flagEmoji} {cheaper.name}.
                      </span>
                    )}
                    {safer && (
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                        <Shield className="h-3.5 w-3.5" />
                        O destino avaliado como mais seguro é {safer.flagEmoji} {safer.name}.
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-xs font-bold text-zinc-400">
                Comparação ativa
              </div>
            </div>

            {/* Side by side cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Country A Panel */}
              <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-6">
                
                {/* Heading */}
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{countryA.flagEmoji}</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">
                      PAÍS A
                    </span>
                    <Link href={`/country/${countryA.slug}`} className="text-2xl font-black text-zinc-900 dark:text-zinc-100 hover:text-indigo-500 transition-colors">
                      {countryA.name}
                    </Link>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold italic">
                  "{countryA.tagline}"
                </p>

                <hr className="border-zinc-200/50 dark:border-zinc-800" />

                {/* Safety block */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    <span>Segurança</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    <span>Índice de segurança</span>
                    <span>{countryA.safetyScore} / 10</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
                    {countryA.travelWarnings ?? "Sem avisos de segurança registados."}
                  </p>
                </div>

                <hr className="border-zinc-200/50 dark:border-zinc-800" />

                {/* Cost block */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
                    <Coins className="h-4 w-4 text-amber-500" />
                    <span>Custo e Finanças</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-indigo-500">{Math.round(countryA.avgHotelPrice + countryA.avgMealPrice * 2 + countryA.avgTransportCost)}€</span>
                    <span className="text-xs font-bold text-zinc-400">/ dia em média</span>
                  </div>
                  
                  {/* Detailed breakdowns */}
                  <div className="flex flex-col gap-2 rounded-2xl bg-zinc-100/50 p-4 border border-zinc-200/20 dark:bg-zinc-900/30 text-xs">
                    <div className="flex justify-between font-semibold text-zinc-500 dark:text-zinc-400">
                      <span>Alojamento (Médio):</span>
                      <span className="text-zinc-800 dark:text-zinc-100 font-bold">{countryA.avgHotelPrice}€</span>
                    </div>
                    <div className="flex justify-between font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                      <span>Alimentação (Médio):</span>
                      <span className="text-zinc-800 dark:text-zinc-100 font-bold">{countryA.avgMealPrice}€</span>
                    </div>
                    <div className="flex justify-between font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                      <span>Transporte (Médio):</span>
                      <span className="text-zinc-800 dark:text-zinc-100 font-bold">{countryA.avgTransportCost}€</span>
                    </div>
                    <div className="flex justify-between font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                      <span>Índice de Custo de Vida:</span>
                      <span className="text-zinc-800 dark:text-zinc-100 font-bold">{countryA.costLivingIndex} / 120</span>
                    </div>
                  </div>
                </div>

                <hr className="border-zinc-200/50 dark:border-zinc-800" />

                {/* Visa info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
                    <FileText className="h-4 w-4 text-indigo-500" />
                    <span>Informações Legais & Visto</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
                    {countryA.visaRequirements}
                  </p>
                </div>

                <hr className="border-zinc-200/50 dark:border-zinc-800" />

                {/* Climate info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
                    <CloudSun className="h-4 w-4 text-sky-500" />
                    <span>Ambiente & Clima</span>
                  </div>
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    ⛅ Clima {countryA.climateType}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
                    {countryA.climateDetails}
                  </p>
                </div>

              </div>

              {/* Country B Panel */}
              <div className="p-8 rounded-3xl glass-card border border-zinc-200/50 shadow-sm dark:border-zinc-900/50 flex flex-col gap-6">
                
                {/* Heading */}
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{countryB.flagEmoji}</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">
                      PAÍS B
                    </span>
                    <Link href={`/country/${countryB.slug}`} className="text-2xl font-black text-zinc-900 dark:text-zinc-100 hover:text-indigo-500 transition-colors">
                      {countryB.name}
                    </Link>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold italic">
                  "{countryB.tagline}"
                </p>

                <hr className="border-zinc-200/50 dark:border-zinc-800" />

                {/* Safety block */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    <span>Segurança</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    <span>Índice de segurança</span>
                    <span>{countryB.safetyScore} / 10</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
                    {countryB.travelWarnings ?? "Sem avisos de segurança registados."}
                  </p>
                </div>

                <hr className="border-zinc-200/50 dark:border-zinc-800" />

                {/* Cost block */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
                    <Coins className="h-4 w-4 text-amber-500" />
                    <span>Custo e Finanças</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-indigo-500">{Math.round(countryB.avgHotelPrice + countryB.avgMealPrice * 2 + countryB.avgTransportCost)}€</span>
                    <span className="text-xs font-bold text-zinc-400">/ dia em média</span>
                  </div>
                  
                  {/* Detailed breakdowns */}
                  <div className="flex flex-col gap-2 rounded-2xl bg-zinc-100/50 p-4 border border-zinc-200/20 dark:bg-zinc-900/30 text-xs">
                    <div className="flex justify-between font-semibold text-zinc-500 dark:text-zinc-400">
                      <span>Alojamento (Médio):</span>
                      <span className="text-zinc-800 dark:text-zinc-100 font-bold">{countryB.avgHotelPrice}€</span>
                    </div>
                    <div className="flex justify-between font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                      <span>Alimentação (Médio):</span>
                      <span className="text-zinc-800 dark:text-zinc-100 font-bold">{countryB.avgMealPrice}€</span>
                    </div>
                    <div className="flex justify-between font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                      <span>Transporte (Médio):</span>
                      <span className="text-zinc-800 dark:text-zinc-100 font-bold">{countryB.avgTransportCost}€</span>
                    </div>
                    <div className="flex justify-between font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                      <span>Índice de Custo de Vida:</span>
                      <span className="text-zinc-800 dark:text-zinc-100 font-bold">{countryB.costLivingIndex} / 120</span>
                    </div>
                  </div>
                </div>

                <hr className="border-zinc-200/50 dark:border-zinc-800" />

                {/* Visa info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
                    <FileText className="h-4 w-4 text-indigo-500" />
                    <span>Informações Legais & Visto</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
                    {countryB.visaRequirements}
                  </p>
                </div>

                <hr className="border-zinc-200/50 dark:border-zinc-800" />

                {/* Climate info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
                    <CloudSun className="h-4 w-4 text-sky-500" />
                    <span>Ambiente & Clima</span>
                  </div>
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    ⛅ Clima {countryB.climateType}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
                    {countryB.climateDetails}
                  </p>
                </div>

              </div>

            </div>
          </>
        ) : (
          /* Empty State Selector */
          <div className="rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-850 p-20 flex flex-col items-center justify-center text-center gap-4 bg-zinc-50/30 dark:bg-zinc-950/20">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20">
              <Scale className="h-8 w-8 animate-pulse" />
            </div>
            <h3 className="text-lg font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight">
              Aguardando Seleção de Países
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm font-semibold leading-relaxed">
              Por favor, selecione dois países diferentes nos campos de seleção acima para ver a comparação detalhada.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 gap-4">
        <div className="flex h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
        <span className="text-xs font-bold text-zinc-500">A carregar ferramenta de comparação...</span>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
