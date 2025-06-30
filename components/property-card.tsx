"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

interface Property {
  id: number
  title: string
  location: string
  image: string
  rentalYield: number
  duration: string
  minimumInvestment: number
  funded: number
  totalValue: number
  status: string
  images?: string[]
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { t, isRTL } = useLanguage()

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={property.images?.[0] || "/placeholder.svg?height=300&width=400"}
          alt={property.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <Badge
          className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} ${
            property.status === "Funded"
              ? "bg-green-500"
              : property.status === "Almost Full"
                ? "bg-orange-500"
                : "bg-blue-500"
          }`}
        >
          {property.status}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className={`text-xl font-semibold mb-1 ${isRTL ? "text-right" : ""}`}>{property.title}</h3>
        <p className={`text-gray-600 mb-4 ${isRTL ? "text-right" : ""}`}>{property.location}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className={isRTL ? "text-right" : ""}>
            <span className="text-gray-600">{t("rentalYield")}</span>
            <p className="font-semibold text-green-600">{property.rentalYield}%</p>
          </div>
          <div className={isRTL ? "text-right" : ""}>
            <span className="text-gray-600">{t("duration")}</span>
            <p className="font-semibold">{property.duration}</p>
          </div>
          <div className={isRTL ? "text-right" : ""}>
            <span className="text-gray-600">{t("minimum")}</span>
            <p className="font-semibold ltr-content">
              PKR {(property.minimumInvestment ?? 0).toLocaleString()}
            </p>
          </div>
          <div className={isRTL ? "text-right" : ""}>
            <span className="text-gray-600">{t("funded")}</span>
            <p className="font-semibold">{property.funded}%</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
          <Link href={`/property/${property.id}`}>{t("invest")}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
