"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { PaymentIntegration } from "./payment-integration"
import { useLanguage } from "@/contexts/language-context"

interface InvestmentFormProps {
  property: {
    minimumInvestment: number
    rentalYield: number
  }
}

export function InvestmentForm({ property }: InvestmentFormProps) {
  const { t, isRTL } = useLanguage()
  const [amount, setAmount] = useState(property.minimumInvestment)
  const [showPayment, setShowPayment] = useState(false)

  const monthlyRent = (amount * property.rentalYield) / 100 / 12
  const annualReturn = (amount * property.rentalYield) / 100

  const handleInvestClick = () => {
    setShowPayment(true)
  }

  const handlePaymentComplete = (method: string, details: any) => {
    console.log("Payment completed:", method, details)
    alert(`Investment of PKR ${amount.toLocaleString()} completed via ${method}!`)
    setShowPayment(false)
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className={isRTL ? "text-right" : ""}>{t("investNow")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="amount" className={isRTL ? "text-right block" : ""}>
            {t("investmentAmount")}
          </Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={property.minimumInvestment}
            className={`mt-2 ltr-content ${isRTL ? "text-right" : ""}`}
            dir="ltr"
          />
          <div className="mt-2">
            <Slider
              value={[amount]}
              onValueChange={(value) => setAmount(value[0])}
              min={property.minimumInvestment}
              max={5000000}
              step={10000}
              className="w-full"
            />
          </div>
          <p className={`text-sm text-gray-600 mt-1 ${isRTL ? "text-right" : ""}`}>
            {t("minimum")}: <span className="ltr-content">PKR {property.minimumInvestment.toLocaleString()}</span>
          </p>
        </div>

        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className="text-sm text-gray-600">{t("monthlyRent")}</span>
            <span className="font-semibold ltr-content">PKR {monthlyRent.toFixed(0)}</span>
          </div>
          <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className="text-sm text-gray-600">{t("annualReturn")}</span>
            <span className="font-semibold text-green-600 ltr-content">PKR {annualReturn.toFixed(0)}</span>
          </div>
          <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className="text-sm text-gray-600">{t("expectedYield")}</span>
            <span className="font-semibold">{property.rentalYield}%</span>
          </div>
        </div>

        {!showPayment ? (
          <Button onClick={handleInvestClick} className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
            {t("invest")} <span className="ltr-content">PKR {amount.toLocaleString()}</span>
          </Button>
        ) : (
          <PaymentIntegration amount={amount} onPaymentComplete={handlePaymentComplete} />
        )}

        <div className={`text-xs text-gray-500 text-center ${isRTL ? "text-right" : ""}`}>
          <p>By investing, you agree to our terms and conditions.</p>
          <p className="mt-1">This investment is regulated by SECP.</p>
        </div>
      </CardContent>
    </Card>
  )
}
