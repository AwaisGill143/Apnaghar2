"use client"

import { useState, useEffect } from "react"
import { PropertyDetails } from "@/components/property-details"
import { InvestmentForm } from "@/components/investment-form"
import { PropertyLocation } from "@/components/property-location"
import { PropertyDataEnhanced } from "@/components/property-data-enhanced"
import { ShariahCompliance } from "@/components/shariah-compliance"
import { getProperty } from "@/lib/database"
import type { Property } from "@/lib/supabase"

export default function PropertyPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProperty() {
      try {
        const data = await getProperty(params.id)
        setProperty(data)
      } catch (error) {
        console.error("Error fetching property:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Property not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PropertyDetails property={property} />
          <PropertyDataEnhanced property={property} />
          {property.shariah_compliant && <ShariahCompliance />}
          <PropertyLocation />
        </div>
        <div>
          <InvestmentForm property={property} />
        </div>
      </div>
    </div>
  )
}
