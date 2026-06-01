"use client";

import { useEffect, useState } from "react";
import { getCountries } from "@/lib/db-countries";
import { CountrySchema } from "@/lib/countries-data";
import { 
  Search, 
  Compass, 
  Shield, 
  DollarSign, 
  ArrowRight, 
  Filter, 
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Star
} from "lucide-react";
import Link from "next/link";

export default function InteractiveMap() {
  const [countries, setCountries] = useState<CountrySchema[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState<CountrySchema | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  // Filter & Sort States
  const [showFilters, setShowFilters] = useState(false);
  const [filterContinent, setFilterContinent] = useState("Tudo");
  const [maxBudget, setMaxBudget] = useState<number>(180);
  const [minSafety, setMinSafety] = useState<number>(1);
  const [sortBy, setSortBy] = useState<"name" | "cost" | "safety">("name");

  // Load from DB
  useEffect(() => {
    getCountries().then((list) => {
      setCountries(list);
      setLoading(false);
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - bounds.left + 15,
      y: e.clientY - bounds.top + 15,
    });
  };

  // Coordinates for placing interactive glowing markers on our grid map
  const mapMarkers = [
    { countrySlug: "portugal", x: "47%", y: "37%", color: "from-emerald-400 to-green-600" },
    { countrySlug: "spain", x: "49%", y: "39%", color: "from-yellow-400 to-red-500" },
    { countrySlug: "france", x: "50%", y: "32%", color: "from-blue-500 to-red-500" },
    { countrySlug: "united-kingdom", x: "47%", y: "26%", color: "from-blue-600 to-indigo-600" },
    { countrySlug: "italy", x: "53%", y: "38%", color: "from-green-500 to-red-500" },
    { countrySlug: "ukraine", x: "61%", y: "29%", color: "from-sky-400 to-amber-400" },
    { countrySlug: "brazil", x: "32%", y: "72%", color: "from-green-500 to-yellow-400" },
    { countrySlug: "united-states", x: "20%", y: "36%", color: "from-blue-600 to-red-500" },
    { countrySlug: "japan", x: "88%", y: "41%", color: "from-red-500 to-red-600" },
  ];

  // Apply filters and sorting dynamically
  const filteredCountries = countries.filter((c) => {
    // 1. Text Search query
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.capital.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Continent filter
    const matchesContinent = filterContinent === "Tudo" || c.continent === filterContinent;

    // 3. Cost limit filter
    const matchesCost = Math.round(c.avgHotelPrice + c.avgMealPrice * 2 + c.avgTransportCost) <= maxBudget;

    // 4. Safety index filter
    const matchesSafety = c.safetyScore >= minSafety;

    return matchesSearch && matchesContinent && matchesCost && matchesSafety;
  });

  // Apply sorting
  const sortedCountries = [...filteredCountries].sort((a, b) => {
    if (sortBy === "cost") {
      return Math.round(a.avgHotelPrice + a.avgMealPrice * 2 + a.avgTransportCost) - Math.round(b.avgHotelPrice + b.avgMealPrice * 2 + b.avgTransportCost);
    }
    if (sortBy === "safety") {
      return b.safetyScore - a.safetyScore;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="w-full flex flex-col items-center gap-6">
      
      {/* Search & Advanced Filters Container */}
      <div className="w-full max-w-xl flex flex-col gap-3 z-20 animate-fade-in-up">
        <div className="flex gap-2">
          {/* Text Input */}
          <div className="relative flex-grow">
            <Search className="absolute top-3.5 left-4 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Pesquisar país ou capital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white/70 py-3.5 pl-12 pr-4 text-xs md:text-sm font-semibold text-zinc-800 placeholder-zinc-400 shadow-sm backdrop-blur-md outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100 dark:placeholder-zinc-500"
            />
          </div>
          
          {/* Advanced toggle button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex h-[46px] w-[46px] items-center justify-center rounded-2xl border transition-all cursor-pointer ${showFilters ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white/70 border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:bg-zinc-950/60 dark:border-zinc-800'}`}
            title="Filtros avançados"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Collapsible Advanced Filters Panel */}
        {showFilters && (
          <div className="p-5 rounded-3xl glass-card border border-zinc-200/50 shadow-lg dark:border-zinc-800 grid grid-cols-2 gap-4 animate-fade-in-up text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            {/* Continent Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold uppercase text-zinc-400">Continente</label>
              <select
                value={filterContinent}
                onChange={(e) => setFilterContinent(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white/50 p-2 outline-none dark:border-zinc-800 dark:bg-zinc-950"
              >
                <option value="Tudo">Todos os continentes</option>
                <option value="Europa">Europa</option>
                <option value="América do Sul">América do Sul</option>
                <option value="América do Norte">América do Norte</option>
                <option value="Ásia">Ásia</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold uppercase text-zinc-400">Ordenar por</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-200 bg-white/50 p-2 outline-none dark:border-zinc-800 dark:bg-zinc-950"
              >
                <option value="name">Ordem Alfabética (A-Z)</option>
                <option value="cost">Menor Custo Diário</option>
                <option value="safety">Maior Índice de Segurança</option>
              </select>
            </div>

            {/* Budget Limit Slider */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold uppercase text-zinc-400 flex justify-between">
                <span>Orçamento Máximo</span>
                <span className="text-indigo-500">{maxBudget}€ / dia</span>
              </label>
              <input
                type="range"
                min="30"
                max="180"
                step="5"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 appearance-none"
              />
            </div>

            {/* Safety Score Rating */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold uppercase text-zinc-400 flex justify-between">
                <span>Segurança Mínima</span>
                <span className="text-indigo-500">{minSafety}+ / 10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={minSafety}
                onChange={(e) => setMinSafety(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 appearance-none"
              />
            </div>
          </div>
        )}

        {/* Live Search Suggestions (only list when typing query or filters active) */}
        {searchQuery && sortedCountries.length > 0 && (
          <div className="absolute top-[52px] w-full rounded-2xl border border-zinc-200/80 bg-white/95 p-2 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
            {sortedCountries.slice(0, 5).map((country) => (
              <Link
                key={country.id}
                href={`/country/${country.slug}`}
                className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flagEmoji}</span>
                  <div>
                    <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{country.name}</div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{country.tagline}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end text-[10px] font-bold text-zinc-400 uppercase">
                    <span>Custo: {Math.round(country.avgHotelPrice + country.avgMealPrice * 2 + country.avgTransportCost)}€</span>
                    <span>Segurança: {country.safetyScore}/10</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-indigo-500" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Stylized Interactive Map Container */}
      <div 
        className="relative w-full max-w-4xl h-[460px] rounded-3xl border border-zinc-200/80 bg-white/40 shadow-inner backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/40 p-4 overflow-hidden group select-none"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />

        {/* Continents background vector */}
        <svg className="absolute inset-0 w-full h-full text-zinc-200/40 dark:text-zinc-800/15 transition-colors duration-500" viewBox="0 0 1000 500" fill="currentColor">
          <path d="M 50 100 Q 150 80 250 120 T 320 220 Q 200 240 120 180 T 50 100 Z" />
          <path d="M 220 250 Q 280 280 320 330 T 270 480 Q 220 400 200 320 T 220 250 Z" />
          <path d="M 450 100 Q 520 80 600 120 T 580 250 Q 500 240 440 180 T 450 100 Z" />
          <path d="M 440 220 Q 560 210 580 300 T 520 450 Q 420 380 430 300 T 440 220 Z" />
          <path d="M 600 80 Q 750 60 900 120 T 880 320 Q 750 350 620 240 T 600 80 Z" />
          <path d="M 800 350 Q 880 340 920 400 T 820 450 Q 760 420 800 350 Z" />
        </svg>

        {/* Hotspots: highlight/dim dynamically based on active filter state */}
        {!loading && mapMarkers.map((marker) => {
          const country = countries.find((c) => c.slug === marker.countrySlug);
          if (!country) return null;

          // Check if this country satisfies the current search query and filters
          const satisfiesFilters = filteredCountries.some((f) => f.slug === country.slug);
          const isHovered = hoveredCountry?.slug === country.slug;

          return (
            <Link
              key={country.slug}
              href={`/country/${country.slug}`}
              className={`absolute transition-opacity duration-500 cursor-pointer ${satisfiesFilters ? 'opacity-100 scale-100 z-10' : 'opacity-20 scale-75 z-0 pointer-events-none'}`}
              style={{ left: marker.x, top: marker.y }}
              onMouseEnter={() => satisfiesFilters && setHoveredCountry(country)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              {/* Pulsing ring */}
              <span className={`absolute -left-3.5 -top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 transition-all duration-300 ${isHovered ? 'scale-150 bg-indigo-500/30' : 'group-hover:scale-125'}`}>
                <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-indigo-400 opacity-75" />
              </span>
              
              {/* Dot */}
              <span className={`relative flex h-3.5 w-3.5 rounded-full bg-gradient-to-tr ${marker.color} border border-white shadow-lg transition-transform ${isHovered ? 'scale-125' : ''}`} />
              
              {/* Label */}
              <span className={`absolute top-5 -left-8 whitespace-nowrap rounded-md bg-zinc-900/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm border border-white/10 transition-opacity duration-350 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {country.name}
              </span>
            </Link>
          );
        })}

        {/* Dynamic Tooltip */}
        {hoveredCountry && (
          <div
            className="absolute z-10 w-64 p-4 rounded-2xl glass-card border border-white/20 shadow-2xl flex flex-col gap-3 pointer-events-none animate-fade-in-up duration-150"
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{hoveredCountry.flagEmoji}</span>
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                  {hoveredCountry.name}
                </span>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-500">
                {hoveredCountry.isoCode}
              </span>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 italic leading-snug">
              "{hoveredCountry.tagline}"
            </p>

            <hr className="border-zinc-200/50 dark:border-zinc-800" />

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-semibold">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                <span>Segurança: {hoveredCountry.safetyScore}/10</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-semibold">
                <DollarSign className="h-3.5 w-3.5 text-amber-500" />
                <span>Custo: {Math.round(hoveredCountry.avgHotelPrice + hoveredCountry.avgMealPrice * 2 + hoveredCountry.avgTransportCost)}€/dia</span>
              </div>
            </div>

            <div className="rounded-lg bg-indigo-50/50 p-2 border border-indigo-100/30 dark:bg-indigo-950/20 text-[10px] text-indigo-600 dark:text-indigo-300 leading-normal font-semibold">
              ✈️ {hoveredCountry.visaRequirements.substring(0, 75)}...
            </div>
            
            <div className="text-[9px] text-zinc-400 dark:text-zinc-500 text-center font-bold">
              Clique para ver detalhes completos
            </div>
          </div>
        )}
        
        {/* Help Overlay */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-zinc-900/60 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md border border-white/10">
          <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Passe o cursor sobre os pontos brilhantes do mapa</span>
        </div>
      </div>
    </div>
  );
}
