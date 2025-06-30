"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Home } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function PortfolioSummary() {
  const { t, isRTL } = useLanguage()

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card>
        <CardHeader
          className={`flex flex-row items-center justify-between space-y-0 pb-2 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <CardTitle className="text-sm font-medium text-gray-600">{t("netInvested")}</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ltr-content ${isRTL ? "text-right" : ""}`}>PKR 650,000</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          className={`flex flex-row items-center justify-between space-y-0 pb-2 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <CardTitle className="text-sm font-medium text-gray-600">{t("roi")}</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold text-green-600 ${isRTL ? "text-right" : ""}`}>15.8%</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          className={`flex flex-row items-center justify-between space-y-0 pb-2 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <CardTitle className="text-sm font-medium text-gray-600">{t("rentalIncome")}</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ltr-content ${isRTL ? "text-right" : ""}`}>PKR 60,500</div>
        </CardContent>
      </Card>
    </div>
  )
}
