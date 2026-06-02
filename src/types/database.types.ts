export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          nationality: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          nationality?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          nationality?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          id: string
          preferred_travel_style: 'Turismo' | 'Estudos' | 'Trabalho' | 'Emigração' | 'Nómada Digital' | null
          preferred_destinations: string[] | null
          updated_at: string
        }
        Insert: {
          id: string
          preferred_travel_style?: 'Turismo' | 'Estudos' | 'Trabalho' | 'Emigração' | 'Nómada Digital' | null
          preferred_destinations?: string[] | null
          updated_at?: string
        }
        Update: {
          id?: string
          preferred_travel_style?: 'Turismo' | 'Estudos' | 'Trabalho' | 'Emigração' | 'Nómada Digital' | null
          preferred_destinations?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          id: string
          name: string
          slug: string
          iso_code: string
          capital: string
          continent: string
          population: number
          languages: string
          currency: string
          visa_requirements: string
          passport_requirements: string
          etias_requirements: string
          vaccine_requirements: string
          safety_score: number
          emergency_numbers: string
          travel_warnings: string | null
          avg_hotel_price: number
          avg_meal_price: number
          avg_transport_cost: number
          cost_living_index: number
          climate_type: string
          climate_details: string
          top_attractions: Json
          major_cities: string[]
          best_time_visit: string
          power_plug_type: string
          internet_quality_score: number
          transport_quality_score: number
          healthcare_quality_score: number
          image_url: string | null
          flag_emoji: string | null
          tagline: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          iso_code: string
          capital: string
          continent: string
          population: number
          languages: string
          currency: string
          visa_requirements: string
          passport_requirements: string
          etias_requirements: string
          vaccine_requirements: string
          safety_score: number
          emergency_numbers: string
          travel_warnings?: string | null
          avg_hotel_price: number
          avg_meal_price: number
          avg_transport_cost: number
          cost_living_index: number
          climate_type: string
          climate_details: string
          top_attractions: Json
          major_cities: string[]
          best_time_visit: string
          power_plug_type: string
          internet_quality_score: number
          transport_quality_score: number
          healthcare_quality_score: number
          image_url?: string | null
          flag_emoji?: string | null
          tagline?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          iso_code?: string
          capital?: string
          continent?: string
          population?: number
          languages?: string
          currency?: string
          visa_requirements?: string
          passport_requirements?: string
          etias_requirements?: string
          vaccine_requirements?: string
          safety_score?: number
          emergency_numbers?: string
          travel_warnings?: string | null
          avg_hotel_price?: number
          avg_meal_price?: number
          avg_transport_cost?: number
          cost_living_index?: number
          climate_type?: string
          climate_details?: string
          top_attractions?: Json
          major_cities?: string[]
          best_time_visit?: string
          power_plug_type?: string
          internet_quality_score?: number
          transport_quality_score?: number
          healthcare_quality_score?: number
          image_url?: string | null
          flag_emoji?: string | null
          tagline?: string | null
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          country_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          country_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          country_id?: string
          created_at?: string
        }
        Relationships: []
      }
      comparisons: {
        Row: {
          id: string
          user_id: string
          country_a_id: string
          country_b_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          country_a_id: string
          country_b_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          country_a_id?: string
          country_b_id?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
