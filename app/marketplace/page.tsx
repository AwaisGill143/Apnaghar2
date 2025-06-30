"use client"

import { useState, useEffect } from "react"
import { PropertyCard } from "@/components/property-card"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { getProperties } from "@/lib/database"
import type { Property } from "@/lib/supabase"

export default function MarketplacePage() {
  const { t, language, isRTL } = useLanguage()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [shariahOnly, setShariahOnly] = useState(false)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await getProperties(shariahOnly)
        setProperties(data)
      } catch (error) {
        console.error("Error fetching properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [shariahOnly])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{language === "ur" ? "لوڈ ہو رہا ہے..." : "Loading properties..."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`flex items-center justify-between mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
        <h1 className={`text-3xl font-bold text-gray-900 ${isRTL ? "text-right" : ""}`}>{t("marketplace")}</h1>
        <SearchBar />
      </div>

      <div className={`flex items-center space-x-4 mb-6 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
        <div className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
          <Switch id="shariah-filter" checked={shariahOnly} onCheckedChange={setShariahOnly} />
          <Label htmlFor="shariah-filter" className={isRTL ? "text-right" : ""}>
            {language === "ur" ? "صرف شریعہ کے مطابق" : "Shariah Compliant Only"}
          </Label>
        </div>
        <Button variant="outline" size="sm">
          {language === "ur" ? "فلٹر" : "Filters"}
        </Button>
      </div>

      {properties.length === 0 ? (
        <div className={`text-center py-12 ${isRTL ? "text-right" : ""}`}>
          <p className="text-gray-600">{language === "ur" ? "کوئی پراپرٹی دستیاب نہیں" : "No properties available"}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
