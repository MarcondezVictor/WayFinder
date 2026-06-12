"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { countriesData } from "@/lib/countries-data";
import Link from "next/link";
import { 
  ArrowLeft, 
  Layers, 
  Shield, 
  Coins, 
  CloudSun, 
  FileText, 
  Scale, 
  TrendingDown 
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
    <div className="w-full min-h-screen flex flex-col bg-gray-50 pb-20 relative">
      {/* Header Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 flex flex-col gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Voltar ao Início</span>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800 w-max">
            <Layers className="h-4 w-4" />
            <span>Ferramenta de Comparação</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Comparar Países Lado a Lado
          </h1>
          <p className="text-sm font-normal text-gray-500 leading-relaxed max-w-2xl">
            Escolha dois destinos abaixo para confrontar requisitos legais, custos diários e índices de segurança.
          </p>
        </div>
      </section>

      {/* Selectors Bar */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl bg-white border border-gray-200 shadow-sm p-6">
          
          {/* Select A */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              País A (Esquerda)
            </label>
            <select
              value={countryASlug}
              onChange={(e) => setCountryASlug(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              País B (Direita)
            </label>
            <select
              value={countryBSlug}
              onChange={(e) => setCountryBSlug(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-normal text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {countryA && countryB ? (
          <>
            {/* Quick Analysis Alert Banner */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shrink-0">
                  <Scale className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 tracking-tight">
                    Análise WayFinder Inteligente
                  </h3>
                  <div className="text-xs font-normal leading-relaxed mt-1 flex flex-col gap-1">
                    {cheaper && (
                      <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
                        <TrendingDown className="h-3.5 w-3.5" />
                        O destino com custo de vida mais acessível é {cheaper.flagEmoji} {cheaper.name}.
                      </span>
                    )}
                    {safer && (
                      <span className="flex items-center gap-1.5 text-green-700 font-semibold">
                        <Shield className="h-3.5 w-3.5" />
                        O destino avaliado como mais seguro é {safer.flagEmoji} {safer.name}.
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-xs font-semibold text-gray-400">
                Comparação ativa
              </div>
            </div>

            {/* Side by side cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Country A Panel */}
              <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-6 animate-fade-in-up">
                
                {/* Heading */}
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{countryA.flagEmoji}</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                      PAÍS A
                    </span>
                    <Link href={`/country/${countryA.slug}`} className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {countryA.name}
                    </Link>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-normal italic">
                  "{countryA.tagline}"
                </p>

                <hr className="border-gray-100" />

                {/* Safety block */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <Shield className="h-4 w-4 text-green-700" />
                    <span>Segurança</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-900">
                    <span>Índice de segurança</span>
                    <span>{countryA.safetyScore} / 10</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-normal font-normal">
                    {countryA.travelWarnings ?? "Sem avisos de segurança registados."}
                  </p>
                </div>

                <hr className="border-gray-100" />

                {/* Cost block */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <Coins className="h-4 w-4 text-amber-700" />
                    <span>Custo e Finanças</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-blue-600">{Math.round(countryA.avgHotelPrice + countryA.avgMealPrice * 2 + countryA.avgTransportCost)}€</span>
                    <span className="text-xs font-normal text-gray-400">/ dia em média</span>
                  </div>
                  
                  {/* Detailed breakdowns */}
                  <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4 border border-gray-200 text-xs text-gray-600">
                    <div className="flex justify-between font-normal text-gray-500">
                      <span>Alojamento (Médio):</span>
                      <span className="text-gray-900 font-semibold">{countryA.avgHotelPrice}€</span>
                    </div>
                    <div className="flex justify-between font-normal text-gray-500 mt-1">
                      <span>Alimentação (Médio):</span>
                      <span className="text-gray-900 font-semibold">{countryA.avgMealPrice}€</span>
                    </div>
                    <div className="flex justify-between font-normal text-gray-500 mt-1">
                      <span>Transporte (Médio):</span>
                      <span className="text-gray-900 font-semibold">{countryA.avgTransportCost}€</span>
                    </div>
                    <div className="flex justify-between font-normal text-gray-500 mt-1">
                      <span>Índice de Custo de Vida:</span>
                      <span className="text-gray-900 font-semibold">{countryA.costLivingIndex} / 120</span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Visa info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span>Informações Legais & Visto</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {countryA.visaRequirements}
                  </p>
                </div>

                <hr className="border-gray-100" />

                {/* Climate info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <CloudSun className="h-4 w-4 text-blue-600" />
                    <span>Ambiente & Clima</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-900">
                    ⛅ Clima {countryA.climateType}
                  </div>
                  <p className="text-xs text-gray-500 leading-normal font-normal">
                    {countryA.climateDetails}
                  </p>
                </div>

              </div>

              {/* Country B Panel */}
              <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-6 animate-fade-in-up">
                
                {/* Heading */}
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{countryB.flagEmoji}</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                      PAÍS B
                    </span>
                    <Link href={`/country/${countryB.slug}`} className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {countryB.name}
                    </Link>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-normal italic">
                  "{countryB.tagline}"
                </p>

                <hr className="border-gray-100" />

                {/* Safety block */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <Shield className="h-4 w-4 text-green-700" />
                    <span>Segurança</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-900">
                    <span>Índice de segurança</span>
                    <span>{countryB.safetyScore} / 10</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-normal font-normal">
                    {countryB.travelWarnings ?? "Sem avisos de segurança registados."}
                  </p>
                </div>

                <hr className="border-gray-100" />

                {/* Cost block */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <Coins className="h-4 w-4 text-amber-700" />
                    <span>Custo e Finanças</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-blue-600">{Math.round(countryB.avgHotelPrice + countryB.avgMealPrice * 2 + countryB.avgTransportCost)}€</span>
                    <span className="text-xs font-normal text-gray-400">/ dia em média</span>
                  </div>
                  
                  {/* Detailed breakdowns */}
                  <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4 border border-gray-200 text-xs text-gray-600">
                    <div className="flex justify-between font-normal text-gray-500">
                      <span>Alojamento (Médio):</span>
                      <span className="text-gray-900 font-semibold">{countryB.avgHotelPrice}€</span>
                    </div>
                    <div className="flex justify-between font-normal text-gray-500 mt-1">
                      <span>Alimentação (Médio):</span>
                      <span className="text-gray-900 font-semibold">{countryB.avgMealPrice}€</span>
                    </div>
                    <div className="flex justify-between font-normal text-gray-500 mt-1">
                      <span>Transporte (Médio):</span>
                      <span className="text-gray-900 font-semibold">{countryB.avgTransportCost}€</span>
                    </div>
                    <div className="flex justify-between font-normal text-gray-500 mt-1">
                      <span>Índice de Custo de Vida:</span>
                      <span className="text-gray-900 font-semibold">{countryB.costLivingIndex} / 120</span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Visa info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span>Informações Legais & Visto</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {countryB.visaRequirements}
                  </p>
                </div>

                <hr className="border-gray-100" />

                {/* Climate info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <CloudSun className="h-4 w-4 text-blue-600" />
                    <span>Ambiente & Clima</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-900">
                    ⛅ Clima {countryB.climateType}
                  </div>
                  <p className="text-xs text-gray-500 leading-normal font-normal">
                    {countryB.climateDetails}
                  </p>
                </div>

              </div>

            </div>
          </>
        ) : (
          /* Empty State Selector */
          <div className="rounded-xl border border-dashed border-gray-300 p-20 flex flex-col items-center justify-center text-center gap-4 bg-white shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 shrink-0 animate-pulse">
              <Layers className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
              Aguardando Seleção de Países
            </h3>
            <p className="text-xs text-gray-500 max-w-sm font-normal leading-relaxed">
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
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="flex h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <span className="text-xs font-medium text-gray-500">A carregar ferramenta de comparação...</span>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
