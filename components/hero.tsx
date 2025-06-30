"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Hero() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="relative bg-gradient-to-br from-purple-50 to-indigo-100 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? "lg:grid-flow-col-dense" : ""}`}>
          <div className={`space-y-8 ${isRTL ? "lg:col-start-2 text-right" : ""}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">{t("heroTitle")}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{t("heroSubtitle")}</p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4">
              <Link href="/marketplace">{t("getStarted")}</Link>
            </Button>
            <div
              className={`flex items-center space-x-2 text-sm text-gray-600 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <Shield className="h-4 w-4" />
              <span>{t("secpRegulated")}</span>
            </div>
          </div>

          <div className={`relative ${isRTL ? "lg:col-start-1" : ""}`}>
            <div className="relative z-10">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🏢</div>
                    <div className="text-sm">Pakistan Properties</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-sm text-gray-600">{t("minimum")}</span>
                    <span className="font-semibold ltr-content">PKR 50,000</span>
                  </div>
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-sm text-gray-600">{t("expectedYield")}</span>
                    <span className="font-semibold text-green-600">12-18%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`absolute top-4 bg-purple-600 rounded-full p-3 shadow-lg ${isRTL ? "left-4" : "right-4"}`}>
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className={`absolute bottom-8 bg-white rounded-lg p-3 shadow-lg ${isRTL ? "left-8" : "right-8"}`}>
              <div className="text-xs text-gray-600">{t("secpRegulated")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
