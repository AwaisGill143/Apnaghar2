import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

export function EarningsSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5" />
          <span>Earnings Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Monthly Rent Income</span>
            <span className="font-semibold">PKR 43,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Earnings</span>
            <span className="font-semibold">PKR 258,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Next Payment</span>
            <span className="font-semibold">Jan 15, 2024</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">Recent Payments</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Dec 2023</span>
              <span className="text-green-600">+PKR 43,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Nov 2023</span>
              <span className="text-green-600">+PKR 42,500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Oct 2023</span>
              <span className="text-green-600">+PKR 42,000</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
