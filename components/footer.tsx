"use client"

import { Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t, isRTL } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className={`grid md:grid-cols-4 gap-8 ${isRTL ? "text-right" : ""}`}>
          <div>
            <h3 className="font-bold text-lg mb-4">اپنا گھر</h3>
            <p className="text-gray-400 text-sm">{t("footerDescription")}</p>
            <div className={`flex items-center space-x-2 mt-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
              <Shield className="h-4 w-4" />
              <span className="text-sm">{t("secpRegulated")}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("investment")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>How it works</li>
              <li>Property selection</li>
              <li>Returns & yields</li>
              <li>Risk factors</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("legal")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>SECP Compliance</li>
              <li>SPV Structure</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("support")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Investment Guide</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400 ${isRTL ? "text-right" : ""}`}
        >
          <p>&copy; 2024 اپنا گھر. {t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  )
}
