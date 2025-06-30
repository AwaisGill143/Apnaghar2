"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export function DatabaseSetup() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const setupDatabase = async () => {
    setStatus("loading")
    setMessage("Setting up database tables and sample data...")

    try {
      const response = await fetch("/api/setup-database", {
        method: "POST",
      })

      const result = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("Database setup completed successfully!")
      } else {
        setStatus("error")
        setMessage(result.error || "Database setup failed")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error occurred during setup")
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
          {status === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
          {status === "error" && <AlertCircle className="h-5 w-5 text-red-600" />}
          <span>Database Setup</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Click the button below to set up the database tables and insert sample data for the Apna Ghar platform.
        </p>

        {message && (
          <div
            className={`p-3 rounded-lg text-sm ${
              status === "success"
                ? "bg-green-50 text-green-800"
                : status === "error"
                  ? "bg-red-50 text-red-800"
                  : "bg-blue-50 text-blue-800"
            }`}
          >
            {message}
          </div>
        )}

        <Button onClick={setupDatabase} disabled={status === "loading"} className="w-full">
          {status === "loading" ? "Setting up..." : "Setup Database"}
        </Button>
      </CardContent>
    </Card>
  )
}
