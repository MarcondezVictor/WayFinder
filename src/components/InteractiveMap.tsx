"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CountrySchema } from "@/lib/countries-data";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

interface InteractiveMapProps {
  countries: CountrySchema[];
}

export default function InteractiveMap({ countries }: InteractiveMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!chartRef.current) return;

    // 1. Map active countries using uppercase ISO codes
    const activeCodes = new Set(countries.map((c) => c.isoCode.toUpperCase()));
    const codeToSlug: Record<string, string> = {};
    const codeToName: Record<string, string> = {};
    const codeToFlag: Record<string, string> = {};

    countries.forEach((c) => {
      const code = c.isoCode.toUpperCase();
      codeToSlug[code] = c.slug;
      codeToName[code] = c.name;
      codeToFlag[code] = c.flagEmoji;
    });

    // 2. Initialize amCharts Root element
    const root = am5.Root.new(chartRef.current);

    // 3. Create chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoNaturalEarth1(),
        minZoomLevel: 1,
        maxZoomLevel: 32,
      })
    );

    // 4. Create polygon series for the world map
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"], // Exclude Antarctica
      })
    );

    // 5. Configure map polygons template
    const template = polygonSeries.mapPolygons.template;

    // Detect dark mode setting
    const isDark = document.documentElement.classList.contains("dark");

    // Dynamic fill color adapter
    template.adapters.add("fill", (fill, target) => {
      const dataItem = target.dataItem;
      if (dataItem && dataItem.dataContext) {
        const id = (dataItem.dataContext as any).id?.toUpperCase();
        if (activeCodes.has(id)) {
          return am5.color(0x6366F1); // Indigo-500
        }
      }
      return isDark ? am5.color(0x52525B) : am5.color(0xD4D4D8); // zinc-600 vs zinc-300
    });

    // Dynamic interactivity adapter: inactive countries do not receive focus, hover, or click events
    template.adapters.add("interactive", (interactive, target) => {
      const dataItem = target.dataItem;
      if (dataItem && dataItem.dataContext) {
        const id = (dataItem.dataContext as any).id?.toUpperCase();
        return activeCodes.has(id);
      }
      return false;
    });

    // Tooltip text adapter: only active countries display the name and flag emoji
    template.adapters.add("tooltipText", (tooltipText, target) => {
      const dataItem = target.dataItem;
      if (dataItem && dataItem.dataContext) {
        const id = (dataItem.dataContext as any).id?.toUpperCase();
        if (activeCodes.has(id)) {
          const name = codeToName[id];
          const flag = codeToFlag[id];
          return `${flag} ${name}`;
        }
      }
      return "";
    });

    // Use pointer cursor over interactive countries on hover
    template.set("cursorOverStyle", "pointer");

    // Hover state color (applied only to interactive country polygons)
    template.states.create("hover", {
      fill: am5.color(0x818CF8), // Indigo-400
    });

    // Route navigation on country click
    template.events.on("click", (ev) => {
      const dataItem = ev.target.dataItem;
      if (dataItem && dataItem.dataContext) {
        const id = (dataItem.dataContext as any).id?.toUpperCase();
        if (activeCodes.has(id)) {
          const slug = codeToSlug[id];
          router.push(`/country/${slug}`);
        }
      }
    });

    // 6. Add Zoom controls in the default bottom-right position
    const zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    return () => {
      root.dispose();
    };
  }, [countries, router]);

  return (
    <div
      ref={chartRef}
      className="w-full rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/30 shadow-inner"
      style={{ height: "520px" }}
    />
  );
}
