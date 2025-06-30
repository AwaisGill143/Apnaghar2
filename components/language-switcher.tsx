"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ur" : "en")
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center space-x-2 bg-transparent">
      <Languages className="h-4 w-4" />
      <span className="font-medium">{language === "en" ? "اردو" : "English"}</span>
    </Button>
  )
}
