import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const investments = [
  {
    id: 1,
    title: "Emaar Heights",
    location: "DHA Karachi",
    image: "/placeholder.svg?height=100&width=150",
    invested: 300000,
    currentValue: 325000,
    monthlyRent: 18000,
    roi: 15.5,
  },
  {
    id: 2,
    title: "Gulberg Residency",
    location: "Gulberg Lahore",
    image: "/placeholder.svg?height=100&width=150",
    invested: 250000,
    currentValue: 268000,
    monthlyRent: 16500,
    roi: 14.2,
  },
  {
    id: 3,
    title: "Blue Area Plaza",
    location: "Blue Area Islamabad",
    image: "/placeholder.svg?height=100&width=150",
    invested: 100000,
    currentValue: 112000,
    monthlyRent: 8500,
    roi: 16.0,
  },
]

export function InvestmentList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Investments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {investments.map((investment) => (
          <div key={investment.id} className="flex items-center space-x-4 p-4 border rounded-lg">
            <Image
              src={investment.image || "/placeholder.svg"}
              alt={investment.title}
              width={80}
              height={60}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold">{investment.title}</h4>
              <p className="text-sm text-gray-600">{investment.location}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span>Invested: PKR {investment.invested.toLocaleString()}</span>
                <span>Current: PKR {investment.currentValue.toLocaleString()}</span>
                <Badge variant="secondary" className="text-green-600">
                  {investment.roi}% ROI
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">PKR {investment.monthlyRent}</p>
              <p className="text-sm text-gray-600">Monthly Rent</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
