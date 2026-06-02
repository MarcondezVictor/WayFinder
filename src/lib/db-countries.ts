import { supabase } from "./supabase";
import { countriesData, CountrySchema, PointOfInterest } from "./countries-data";

export async function getCountries(): Promise<CountrySchema[]> {
  try {
    const { data, error } = await supabase
      .from("countries")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("Supabase fetch returned empty or error, falling back to local dataset:", error?.message);
      return countriesData;
    }

    // Map database fields to TS camelCase fields
    return data.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      isoCode: c.iso_code,
      capital: c.capital,
      continent: c.continent,
      population: Number(c.population),
      languages: c.languages,
      currency: c.currency,
      visaRequirements: c.visa_requirements,
      passportRequirements: c.passport_requirements,
      etiasRequirements: c.etias_requirements,
      vaccineRequirements: c.vaccine_requirements,
      safetyScore: c.safety_score,
      emergencyNumbers: c.emergency_numbers,
      travelWarnings: c.travel_warnings,
      avgHotelPrice: Number(c.avg_hotel_price),
      avgMealPrice: Number(c.avg_meal_price),
      avgTransportCost: Number(c.avg_transport_cost),
      costLivingIndex: c.cost_living_index,
      climateType: c.climate_type,
      climateDetails: c.climate_details,
      topAttractions: c.top_attractions as unknown as PointOfInterest[],
      majorCities: c.major_cities,
      bestTimeVisit: c.best_time_visit,
      powerPlugType: c.power_plug_type,
      internetQualityScore: c.internet_quality_score,
      transportQualityScore: c.transport_quality_score,
      healthcareQualityScore: c.healthcare_quality_score,
      imageUrl: c.image_url || "",
      flagEmoji: c.flag_emoji || "",
      tagline: c.tagline || "",
      description: c.description || "",
    }));
  } catch (err) {
    console.error("Critical error fetching countries, falling back:", err);
    return countriesData;
  }
}

export async function getCountryBySlug(slug: string): Promise<CountrySchema | null> {
  try {
    const { data, error } = await supabase
      .from("countries")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      // Fallback
      const local = countriesData.find((c) => c.slug === slug);
      return local || null;
    }

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      isoCode: data.iso_code,
      capital: data.capital,
      continent: data.continent,
      population: Number(data.population),
      languages: data.languages,
      currency: data.currency,
      visaRequirements: data.visa_requirements,
      passportRequirements: data.passport_requirements,
      etiasRequirements: data.etias_requirements,
      vaccineRequirements: data.vaccine_requirements,
      safetyScore: data.safety_score,
      emergencyNumbers: data.emergency_numbers,
      travelWarnings: data.travel_warnings,
      avgHotelPrice: Number(data.avg_hotel_price),
      avgMealPrice: Number(data.avg_meal_price),
      avgTransportCost: Number(data.avg_transport_cost),
      costLivingIndex: data.cost_living_index,
      climateType: data.climate_type,
      climateDetails: data.climate_details,
      topAttractions: data.top_attractions as unknown as PointOfInterest[],
      majorCities: data.major_cities,
      bestTimeVisit: data.best_time_visit,
      powerPlugType: data.power_plug_type,
      internetQualityScore: data.internet_quality_score,
      transportQualityScore: data.transport_quality_score,
      healthcareQualityScore: data.healthcare_quality_score,
      imageUrl: data.image_url || "",
      flagEmoji: data.flag_emoji || "",
      tagline: data.tagline || "",
      description: data.description || "",
    };
  } catch (err) {
    const local = countriesData.find((c) => c.slug === slug);
    return local || null;
  }
}

export async function seedDatabase() {
  console.log("seedDatabase has been disabled to prevent duplicate entries and RLS errors.");
}
