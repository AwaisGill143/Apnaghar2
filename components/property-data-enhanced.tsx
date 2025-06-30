import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, Shield } from "lucide-react"

interface PropertyDataProps {
  property: {
    id: number
    title: string
    location: string
    developer: string
    propertyType: string
    completionDate: string
    totalValue: number
    rentalYield: number
    minimumInvestment: number
    funded: number
  }
}

export function PropertyDataEnhanced({ property }: PropertyDataProps) {
  const marketData = {
    areaAppreciation: "8.5% annually",
    rentalDemand: "High",
    occupancyRate: "92%",
    nearbyProjects: ["Centaurus Residencia - 0.5km", "Islamabad Stock Exchange - 1.2km", "Safa Gold Mall - 0.8km"],
    transportLinks: ["Metro Bus Station - 300m", "Islamabad Airport - 15km", "Motorway Access - 2km"],
    demographics: {
      averageIncome: "PKR 150,000/month",
      populationGrowth: "3.2% annually",
      educationLevel: "85% graduates",
    },
  }

  const legalInfo = {
    approvals: ["CDA Approved", "NOC from Environment", "Fire Safety Certificate", "Building Plan Approved"],
    ownership: "Freehold",
    spvStructure: "SECP Registered SPV",
    insurance: "Comprehensive Property Insurance",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Property Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Developer:</span>
                    <span className="font-medium">{property.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completion:</span>
                    <span className="font-medium">{property.completionDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Value:</span>
                    <span className="font-medium">PKR {property.totalValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Investment Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Yield:</span>
                    <span className="font-medium text-green-600">{property.rentalYield}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Investment:</span>
                    <span className="font-medium">PKR {property.minimumInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Status:</span>
                    <span className="font-medium">{property.funded}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Market Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area Appreciation:</span>
                    <span className="font-medium text-green-600">{marketData.areaAppreciation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rental Demand:</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {marketData.rentalDemand}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Occupancy Rate:</span>
                    <span className="font-medium">{marketData.occupancyRate}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Demographics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Income:</span>
                    <span className="font-medium">{marketData.demographics.averageIncome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Population Growth:</span>
                    <span className="font-medium">{marketData.demographics.populationGrowth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Education Level:</span>
                    <span className="font-medium">{marketData.demographics.educationLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Location Intelligence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Nearby Projects</h4>
              <ul className="space-y-2">
                {marketData.nearbyProjects.map((project, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span>{project}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Transport Links</h4>
              <ul className="space-y-2">
                {marketData.transportLinks.map((link, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Legal & Compliance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Approvals & Certifications</h4>
              <div className="space-y-2">
                {legalInfo.approvals.map((approval, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      ✓
                    </Badge>
                    <span className="text-sm">{approval}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Ownership Structure</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ownership Type:</span>
                  <span className="font-medium">{legalInfo.ownership}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SPV Structure:</span>
                  <span className="font-medium">{legalInfo.spvStructure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Insurance:</span>
                  <span className="font-medium">{legalInfo.insurance}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
