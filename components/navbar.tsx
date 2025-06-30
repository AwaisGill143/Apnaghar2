"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Bell } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"

export function Navbar() {
  const { t, isRTL } = useLanguage()

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex h-16 items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          <Link href="/" className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">اپنا گھر</span>
          </Link>

          <div className={`hidden md:flex items-center space-x-8 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            <Link href="/marketplace" className="text-gray-700 hover:text-purple-600 font-medium">
              {t("marketplace")}
            </Link>
            <Link href="/portfolio" className="text-gray-700 hover:text-purple-600 font-medium">
              {t("portfolio")}
            </Link>
            <Link href="/kyc" className="text-gray-700 hover:text-purple-600 font-medium">
              {t("kyc")}
            </Link>
            <Link href="/compliance" className="text-gray-700 hover:text-purple-600 font-medium">
              {t("compliance")}
            </Link>
            <Link href="/notifications" className="text-gray-700 hover:text-purple-600 font-medium">
              <Bell className="h-4 w-4" />
            </Link>
          </div>

          <div className={`flex items-center space-x-3 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            <LanguageSwitcher />
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/login">{t("login")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
