"use client"

import { Shield, Award, Users, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function TrustBadges() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("whyChoose")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("whyChooseSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className={`text-center ${isRTL ? "text-right" : ""}`}>
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">{t("secpRegulated")}</h3>
            <p className="text-sm text-gray-600">Fully regulated by Securities and Exchange Commission of Pakistan</p>
          </div>

          <div className={`text-center ${isRTL ? "text-right" : ""}`}>
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">{t("highReturns")}</h3>
            <p className="text-sm text-gray-600">Expected yields of 12-18% annually</p>
          </div>

          <div className={`text-center ${isRTL ? "text-right" : ""}`}>
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">{t("fractionalOwnership")}</h3>
            <p className="text-sm text-gray-600">Start investing from just PKR 50,000</p>
          </div>

          <div className={`text-center ${isRTL ? "text-right" : ""}`}>
            <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">{t("transparent")}</h3>
            <p className="text-sm text-gray-600">Clear fee structure and regular updates</p>
          </div>
        </div>
      </div>
    </section>
  )
}
