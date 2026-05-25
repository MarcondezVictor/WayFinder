import InteractiveMap from "@/components/InteractiveMap";
import { countriesData } from "@/lib/countries-data";
import Link from "next/link";
import { Compass, Shield, DollarSign, CloudSun, MapPin, ArrowRight } from "lucide-react";

export default function Home() {
  // Let's feature Portugal, Brazil, and Ukraine at the top of the homepage
  const featuredCountries = countriesData.filter((c) =>
    ["portugal", "brazil", "ukraine"].includes(c.slug)
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Hero Section */}
      <section className="relative w-full max-w-7xl px-6 pt-20 pb-16 text-center flex flex-col items-center gap-6 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-10 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/20" />
        <div className="absolute top-20 left-1/3 -z-10 h-48 w-48 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-500/20" />

        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 animate-fade-in-up">
          <Compass className="h-4 w-4 text-indigo-500 animate-spin" style={{ animationDuration: "10s" }} />
          <span>Projeto Integrado I · MVP Inicial</span>
        </div>

        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-6xl animate-fade-in-up">
          Explore o Mundo com{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-violet-300">
            Decisões Informadas
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed animate-fade-in-up">
          WayFinder centraliza requisitos de vistos, custos médios, índices de segurança e clima por país para simplificar o seu planeamento internacional.
        </p>
      </section>

      {/* 2. Map and Search Section */}
      <section className="w-full max-w-7xl px-6 pb-20 flex flex-col items-center gap-10">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight">
            Mapa Interativo Global
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-semibold">
            Clique num dos destinos destacados para explorar o dashboard do país.
          </p>
        </div>
        <InteractiveMap />
      </section>

      {/* 3. Featured Countries (Portugal, Brazil, Ukraine) */}
      <section className="w-full border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20 py-20 px-6">
        <div className="mx-auto max-w-7xl flex flex-col gap-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Destinos em Destaque
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-semibold">
                Análise aprofundada dos países preferidos da nossa comunidade.
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 px-4 py-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-400">
              Total: {countriesData.length} Países Carregados
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/country/${country.slug}`}
                className="group flex flex-col rounded-3xl glass-card overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all hover:shadow-xl hover:shadow-indigo-500/5"
              >
                {/* Banner Image */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={country.imageUrl}
                    alt={country.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Floating Flag */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-zinc-950/70 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-md border border-white/10">
                    <span className="text-xl">{country.flagEmoji}</span>
                    <span>{country.name}</span>
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-6 flex flex-col gap-4 flex-grow">
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                    {country.tagline}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {country.description}
                  </p>

                  <hr className="border-zinc-200/50 dark:border-zinc-800/50 mt-auto" />

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-3 gap-2 py-1">
                    {/* Safety */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/30 text-center gap-1">
                      <Shield className="h-4 w-4 text-emerald-500" />
                      <span className="text-[10px] font-bold text-zinc-500">Segurança</span>
                      <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">
                        {country.safetyScore}/10
                      </span>
                    </div>

                    {/* Cost */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/30 text-center gap-1">
                      <DollarSign className="h-4 w-4 text-amber-500" />
                      <span className="text-[10px] font-bold text-zinc-500">Custo Médio</span>
                      <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">
                        {country.avgCostDaily}€
                      </span>
                    </div>

                    {/* Climate */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/30 text-center gap-1">
                      <CloudSun className="h-4 w-4 text-sky-500" />
                      <span className="text-[10px] font-bold text-zinc-500">Clima</span>
                      <span className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200 truncate max-w-full px-1">
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
      <section className="w-full max-w-7xl px-6 py-20 flex flex-col md:flex-row gap-12 items-center justify-between">
        <div className="flex flex-col gap-6 md:max-w-lg">
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Centralização + Interatividade + Planeamento Visual
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            Atualmente, planear uma deslocação internacional obriga a alternar entre dezenas de abas do browser. Com a WayFinder, centralizamos os pilares críticos de planeamento para ajudá-lo a tomar decisões rápidas e fundamentadas.
          </p>
          <div className="flex flex-col gap-3">
            {[
              "Verificar instantaneamente se necessita de passaporte/visto",
              "Comparar orçamentos diários detalhados de alojamento e alimentação",
              "Analisar estatísticas de segurança e índices climáticos realistas",
              "Guardar os seus destinos de eleição nos favoritos personalizados"
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 font-semibold">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20">
                  ✓
                </div>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Graphic Container */}
        <div className="relative w-full max-w-md h-80 rounded-3xl bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-pink-500/5 border border-zinc-200/50 dark:border-zinc-800 p-8 flex flex-col justify-between overflow-hidden shadow-inner backdrop-blur-sm animate-float">
          <div className="absolute top-[-50px] right-[-50px] -z-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
          
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg">
              <Compass className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Persona do Utilizador
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold">
                João, 20 anos, Estudante Universitário
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200/60 bg-white/60 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60 text-xs text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
            "Quando planeio uma viagem, acabo sempre com mais de 15 abas abertas no browser. Com a WayFinder, posso comparar a segurança, clima e vistos de múltiplos países num único ecrã."
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-indigo-500">
            <span>Saber mais sobre o MVP</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </section>
    </div>
  );
}
