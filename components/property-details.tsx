import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Shield, CheckCircle } from "lucide-react"

interface PropertyDetailsProps {
  property: {
    title: string
    location: string
    image: string
    images?: string[]
    rentalYield: number
    duration: string
    funded: number
    totalValue: number
    description: string
    features: string[]
    spvInfo: string
  }
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Image
          src={property.images?.[0] || "/placeholder.svg?height=400&width=600"}
          alt={property.title}
          width={600}
          height={400}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
        <Badge className="absolute top-4 right-4 bg-green-500">{property.funded}% Funded</Badge>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
        <p className="text-gray-600 text-lg mb-4">{property.location}</p>
        <p className="text-gray-700 leading-relaxed">{property.description}</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-600 mb-1">Rental Yield</h4>
              <p className="text-2xl font-bold text-green-600">{property.rentalYield}%</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-600 mb-1">Duration</h4>
              <p className="text-2xl font-bold">{property.duration}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-600 mb-1">Total Value</h4>
              <p className="text-2xl font-bold">PKR {property.totalValue.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Property Features</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {property.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-purple-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Legal Structure & Compliance</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{property.spvInfo}</p>
              <Badge variant="outline" className="mt-2">
                SECP Regulated
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
