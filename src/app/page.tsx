import InteractiveMap from "@/components/InteractiveMap";
import { getCountries } from "@/lib/db-countries";
import Link from "next/link";
import { Compass, Shield, DollarSign, CloudSun, ArrowRight } from "lucide-react";

export default async function Home() {
  const countries = await getCountries();

  // Let's feature Portugal, Brazil, and Ukraine at the top of the homepage
  const featuredCountries = countries.filter((c) =>
    ["portugal", "brazil", "ukraine"].includes(c.slug)
  );

  return (
    <div className="w-full flex flex-col items-center bg-gray-50">
      {/* 1. Hero Section */}
      <section className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-800">
          <Compass className="h-4 w-4 text-blue-600" />
          <span>Projeto Integrado I · MVP Inicial</span>
        </div>

        <h1 className="max-w-4xl text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
          Explore o Mundo com Decisões Informadas
        </h1>

        <p className="max-w-2xl text-base font-normal text-gray-600 leading-relaxed">
          WayFinder centraliza requisitos de vistos, custos médios, índices de segurança e clima por país para simplificar o seu planeamento internacional.
        </p>
      </section>

      {/* 2. Map and Search Section */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 flex flex-col items-center gap-10">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Mapa Interativo Global
          </h2>
          <p className="text-sm font-normal text-gray-500">
            Clique num dos destinos destacados para explorar o dashboard do país.
          </p>
        </div>
        <InteractiveMap countries={countries} />
      </section>

      {/* 3. Featured Countries (Portugal, Brazil, Ukraine) */}
      <section className="w-full border-t border-gray-200 bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                Destinos em Destaque
              </h2>
              <p className="text-sm font-normal text-gray-500">
                Análise aprofundada dos países preferidos da nossa comunidade.
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              Total: {countries.length} Países Carregados
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/country/${country.slug}`}
                className="group flex flex-col rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Banner Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-50">
                  <img
                    src={country.imageUrl}
                    alt={country.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Floating Flag */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-1.5 text-sm font-medium text-gray-900 border border-gray-200 shadow-sm">
                    <span className="text-xl">{country.flagEmoji}</span>
                    <span>{country.name}</span>
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-5 flex flex-col gap-4 flex-grow">
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">
                    {country.tagline}
                  </p>
                  <p className="text-sm font-normal text-gray-600 leading-relaxed line-clamp-3">
                    {country.description}
                  </p>

                  <hr className="border-gray-100 mt-auto" />

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-3 gap-2 py-1">
                    {/* Safety */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-green-50 text-center gap-1">
                      <Shield className="h-4 w-4 text-green-750" />
                      <span className="text-[10px] font-medium text-green-700">Segurança</span>
                      <span className="text-xs font-medium text-green-700">
                        {country.safetyScore}/10
                      </span>
                    </div>

                    {/* Cost */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-amber-50 text-center gap-1">
                      <DollarSign className="h-4 w-4 text-amber-750" />
                      <span className="text-[10px] font-medium text-amber-700">Custo Médio</span>
                      <span className="text-xs font-medium text-amber-700">
                        {Math.round(country.avgHotelPrice + country.avgMealPrice * 2 + country.avgTransportCost)}€
                      </span>
                    </div>

                    {/* Climate */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-blue-50 text-center gap-1">
                      <CloudSun className="h-4 w-4 text-blue-800" />
                      <span className="text-[10px] font-medium text-blue-850">Clima</span>
                      <span className="text-[10px] font-medium text-blue-800 truncate max-w-full px-1">
                        {country.climateType}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Feature Highlights & Value Prop */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row gap-12 items-center justify-between">
        <div className="flex flex-col gap-6 md:max-w-lg">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Centralização + Interatividade + Planeamento Visual
          </h2>
          <p className="text-base font-normal text-gray-600 leading-relaxed">
            Atualmente, planear uma deslocação internacional obriga a alternar entre dezenas de abas do browser. Com a WayFinder, centralizamos os pilares críticos de planeamento para ajudá-lo a tomar decisões rápidas e fundamentadas.
          </p>
          <div className="flex flex-col gap-3">
            {[
              "Verificar instantaneamente se necessita de passaporte/visto",
              "Comparar orçamentos diários detalhados de alojamento e alimentação",
              "Analisar estatísticas de segurança e índices climáticos realistas",
              "Guardar os seus destinos de eleição nos favoritos personalizados"
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-800 font-bold">
                  ✓
                </div>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Graphic Container */}
        <div className="relative w-full max-w-md h-80 rounded-xl bg-white border border-gray-200 p-8 flex flex-col justify-between shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
              <Compass className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-gray-900">
                Persona do Utilizador
              </span>
              <span className="text-xs text-gray-500 font-normal">
                João, 20 anos, Estudante Universitário
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs font-normal text-gray-600 leading-relaxed">
            Quando planeio uma viagem, acabo sempre com mais de 15 abas abertas no browser. Com a WayFinder, posso comparar a segurança, clima e vistos de múltiplos países num único ecrã.
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
            <span>Saber mais sobre o MVP</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </section>
    </div>
  );
}
