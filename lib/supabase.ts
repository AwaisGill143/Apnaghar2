import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Property {
  id: string
  title: string
  title_ur?: string
  location: string
  location_ur?: string
  description?: string
  description_ur?: string
  developer: string
  property_type: string
  completion_date: string
  total_value: number
  minimum_investment: number
  expected_rental_yield: number
  investment_duration_years: number
  total_units: number
  units_sold: number
  funding_percentage: number
  status: string
  images?: string[]
  features?: string[]
  location_details?: any
  market_data?: any
  legal_approvals?: string[]
  shariah_compliant: boolean
  shariah_certificate_url?: string
  profit_sharing_ratio?: number
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  phone?: string
  full_name: string
  cnic?: string
  father_name?: string
  date_of_birth?: string
  address?: string
  city?: string
  postal_code?: string
  occupation?: string
  monthly_income_range?: string
  kyc_status: string
  kyc_documents?: any
  shariah_compliant_only: boolean
  notification_preferences: any
  language_preference: string
  created_at: string
  updated_at: string
}

export interface Investment {
  id: string
  user_id: string
  property_id: string
  investment_amount: number
  units_purchased: number
  investment_date: string
  payment_method?: string
  payment_details?: any
  status: string
  shariah_compliant: boolean
  created_at: string
  updated_at: string
  property?: Property
}

export interface ShariahBoardMember {
  id: string
  name: string
  name_ur?: string
  title: string
  title_ur?: string
  qualifications?: string
  qualifications_ur?: string
  photo_url?: string
  bio?: string
  bio_ur?: string
  active: boolean
  created_at: string
}
