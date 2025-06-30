import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export function PropertyLocation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Location</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
          <div className="text-center text-gray-500">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p>Interactive Map</p>
            <p className="text-sm">Google Maps integration</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Address:</strong> DHA Phase 6, Karachi, Pakistan
          </p>
          <p>
            <strong>Nearby:</strong> Dolmen Mall, Port Grand, Clifton Beach
          </p>
          <p>
            <strong>Distance to Airport:</strong> 25 minutes
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
