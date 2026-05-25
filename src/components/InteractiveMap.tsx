"use client";

import { useState } from "react";
import useRouter from "next/navigation";
import { countriesData, CountryData } from "@/lib/countries-data";
import { Search, Compass, MapPin, Shield, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InteractiveMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Filter countries by search query
  const filteredCountries = searchQuery
    ? countriesData.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleMouseMove = (e: React.MouseEvent) => {
    // Dynamically position tooltip near cursor inside the relative map container
    const bounds = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - bounds.left + 15,
      y: e.clientY - bounds.top + 15,
    });
  };

  // Coordinates for placing interactive glowing markers on a stylized grid map
  // Representing their relative geographical placement on a standard map layout
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

  return (
    <div className="w-full flex flex-col items-center gap-8">
      
      {/* Search Input Section */}
      <div className="relative w-full max-w-xl animate-fade-in-up">
        <div className="relative">
          <Search className="absolute top-3.5 left-4 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Pesquisar país (ex: Portugal, Brasil, Ucrânia...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200/80 bg-white/70 py-3.5 pl-12 pr-4 text-sm font-semibold text-zinc-800 placeholder-zinc-400 shadow-sm backdrop-blur-md outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-indigo-400"
          />
        </div>

        {/* Autocomplete Dropdown */}
        {searchQuery && filteredCountries.length > 0 && (
          <div className="absolute top-[54px] z-20 w-full rounded-2xl border border-zinc-200/80 bg-white/95 p-2 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95 animate-fade-in-up">
            {filteredCountries.map((country) => (
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
                <ArrowRight className="h-4 w-4 text-indigo-500" />
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
        {/* Futuralistic Stylized Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />

        {/* Abstract Stylized World Continents Background */}
        <svg className="absolute inset-0 w-full h-full text-zinc-200/40 dark:text-zinc-800/15 transition-colors duration-500" viewBox="0 0 1000 500" fill="currentColor">
          {/* North America */}
          <path d="M 50 100 Q 150 80 250 120 T 320 220 Q 200 240 120 180 T 50 100 Z" />
          {/* South America */}
          <path d="M 220 250 Q 280 280 320 330 T 270 480 Q 220 400 200 320 T 220 250 Z" />
          {/* Europe */}
          <path d="M 450 100 Q 520 80 600 120 T 580 250 Q 500 240 440 180 T 450 100 Z" />
          {/* Africa */}
          <path d="M 440 220 Q 560 210 580 300 T 520 450 Q 420 380 430 300 T 440 220 Z" />
          {/* Asia */}
          <path d="M 600 80 Q 750 60 900 120 T 880 320 Q 750 350 620 240 T 600 80 Z" />
          {/* Australia */}
          <path d="M 800 350 Q 880 340 920 400 T 820 450 Q 760 420 800 350 Z" />
        </svg>

        {/* Interactive Glowing Hotspot Markers */}
        {mapMarkers.map((marker) => {
          const country = countriesData.find((c) => c.slug === marker.countrySlug);
          if (!country) return null;

          const isHovered = hoveredCountry?.slug === country.slug;

          return (
            <Link
              key={country.slug}
              href={`/country/${country.slug}`}
              className="absolute group/marker cursor-pointer"
              style={{ left: marker.x, top: marker.y }}
              onMouseEnter={() => setHoveredCountry(country)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              {/* Outer pulsing ring */}
              <span className={`absolute -left-3.5 -top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 transition-all duration-300 ${isHovered ? 'scale-150 bg-indigo-500/30' : 'group-hover/marker:scale-125'}`}>
                {/* Inner smaller pulsing ring */}
                <span className={`animate-ping absolute inline-flex h-4 w-4 rounded-full bg-indigo-400 opacity-75`} />
              </span>
              
              {/* Center Dot */}
              <span className={`relative flex h-3.5 w-3.5 rounded-full bg-gradient-to-tr ${marker.color} border border-white shadow-lg transition-transform ${isHovered ? 'scale-125' : ''}`} />
              
              {/* Country Name Label underneath */}
              <span className={`absolute top-5 -left-8 whitespace-nowrap rounded-md bg-zinc-900/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm border border-white/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 group-hover/marker:opacity-100'}`}>
                {country.name}
              </span>
            </Link>
          );
        })}

        {/* Live Hover Tooltip (Glassmorphism Modal following cursor) */}
        {hoveredCountry && (
          <div
            className="absolute z-10 w-64 p-4 rounded-2xl glass-card border border-white/20 shadow-2xl flex flex-col gap-3 pointer-events-none animate-fade-in-up duration-150"
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{hoveredCountry.flagEmoji}</span>
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                  {hoveredCountry.name}
                </span>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                {hoveredCountry.isoCode}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 italic leading-snug">
              "{hoveredCountry.tagline}"
            </p>

            <hr className="border-zinc-200/50 dark:border-zinc-800" />

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-semibold">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                <span>Segurança: {hoveredCountry.safetyScore}/10</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-semibold">
                <DollarSign className="h-3.5 w-3.5 text-amber-500" />
                <span>Custo: {hoveredCountry.avgCostDaily}€/dia</span>
              </div>
            </div>

            {/* Visa Highlight */}
            <div className="rounded-lg bg-indigo-50/50 p-2 border border-indigo-100/30 dark:bg-indigo-950/20 text-[10px] text-indigo-600 dark:text-indigo-300 leading-normal font-semibold">
              ✈️ {hoveredCountry.visaInfo.substring(0, 75)}...
            </div>
            
            <div className="text-[9px] text-zinc-400 dark:text-zinc-500 text-center font-bold">
              Clique para ver detalhes completos
            </div>
          </div>
        )}
        
        {/* Help Overlay Instruction */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-zinc-900/60 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md border border-white/10">
          <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Passe o cursor sobre os pontos brilhantes do mapa</span>
        </div>
      </div>
    </div>
  );
}
