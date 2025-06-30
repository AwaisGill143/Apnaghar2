import { PropertyCard } from "./property-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredProperties = [
  {
    id: 1,
    title: "Emaar Heights",
    location: "DHA Karachi",
    image: "/placeholder.svg?height=300&width=400",
    rentalYield: 15.2,
    duration: "5 years",
    minimumInvestment: 100000,
    funded: 85,
    totalValue: 25000000,
    status: "Funded",
  },
  {
    id: 2,
    title: "Gulberg Residency",
    location: "Gulberg Lahore",
    image: "/placeholder.svg?height=300&width=400",
    rentalYield: 16.5,
    duration: "7 years",
    minimumInvestment: 50000,
    funded: 65,
    totalValue: 18000000,
    status: "Funding",
  },
]

export function FeaturedProperties() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
          <Button variant="outline" asChild>
            <Link href="/marketplace">View All</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
