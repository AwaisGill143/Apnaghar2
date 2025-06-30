"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Star, FileText, CheckCircle, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getShariahBoard } from "@/lib/database"
import type { ShariahBoardMember } from "@/lib/supabase"

export function ShariahCompliance() {
  const { t, isRTL, language } = useLanguage()
  const [boardMembers, setBoardMembers] = useState<ShariahBoardMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBoardMembers() {
      try {
        const members = await getShariahBoard()
        setBoardMembers(members)
      } catch (error) {
        console.error("Error fetching Shariah board:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBoardMembers()
  }, [])

  const shariahPrinciples = [
    {
      title: "Profit & Loss Sharing",
      title_ur: "منافع اور نقصان کی شراکت",
      description: "All investments follow Islamic profit-sharing principles (Mudarabah)",
      description_ur: "تمام سرمایہ کاریاں اسلامی منافع کی تقسیم کے اصولوں پر عمل کرتی ہیں (مضاربہ)",
    },
    {
      title: "Asset-Backed Investment",
      title_ur: "اثاثہ پر مبنی سرمایہ کاری",
      description: "All investments are backed by real, tangible assets",
      description_ur: "تمام سرمایہ کاریاں حقیقی، ٹھوس اثاثوں پر مبنی ہیں",
    },
    {
      title: "No Interest (Riba)",
      title_ur: "سود سے پاک",
      description: "Completely free from interest-based transactions",
      description_ur: "سود پر مبنی لین دین سے مکمل طور پر پاک",
    },
    {
      title: "Ethical Investment",
      title_ur: "اخلاقی سرمایہ کاری",
      description: "Investments in halal businesses and properties only",
      description_ur: "صرف حلال کاروبار اور املاک میں سرمایہ کاری",
    },
  ]

  const complianceFeatures = [
    {
      title: "Shariah Board Oversight",
      title_ur: "شریعہ بورڈ کی نگرانی",
      description: "Independent Shariah scholars oversee all investments",
      description_ur: "آزاد شریعہ علماء تمام سرمایہ کاریوں کی نگرانی کرتے ہیں",
      icon: Users,
    },
    {
      title: "Regular Audits",
      title_ur: "باقاعدہ آڈٹ",
      description: "Quarterly Shariah compliance audits",
      description_ur: "سہ ماہی شریعہ کمپلائنس آڈٹ",
      icon: FileText,
    },
    {
      title: "Transparent Structure",
      title_ur: "شفاف ڈھانچہ",
      description: "Clear profit-sharing ratios and risk disclosure",
      description_ur: "واضح منافع کی تقسیم کے تناسب اور خطرات کی وضاحت",
      icon: Shield,
    },
    {
      title: "Halal Certification",
      title_ur: "حلال سرٹیفیکیشن",
      description: "All properties certified as Shariah-compliant",
      description_ur: "تمام املاک شریعہ کے مطابق سرٹیفائی شدہ",
      icon: Star,
    },
  ]

  if (loading) {
    return <div className="text-center py-8">Loading Shariah compliance information...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle
            className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse text-right" : ""}`}
          >
            <Shield className="h-6 w-6 text-green-600" />
            <span>{language === "ur" ? "شریعہ کمپلائنس" : "Shariah Compliance"}</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {language === "ur" ? "مکمل طور پر شریعہ کے مطابق" : "Fully Compliant"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {complianceFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${isRTL ? "flex-row-reverse space-x-reverse text-right" : ""}`}
                >
                  <div className="bg-green-100 rounded-full p-2">
                    <IconComponent className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{language === "ur" ? feature.title_ur : feature.title}</h4>
                    <p className="text-sm text-gray-600">
                      {language === "ur" ? feature.description_ur : feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="principles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="principles">{language === "ur" ? "اسلامی اصول" : "Islamic Principles"}</TabsTrigger>
          <TabsTrigger value="board">{language === "ur" ? "شریعہ بورڈ" : "Shariah Board"}</TabsTrigger>
          <TabsTrigger value="certificates">{language === "ur" ? "سرٹیفکیٹس" : "Certificates"}</TabsTrigger>
        </TabsList>

        <TabsContent value="principles">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? "text-right" : ""}>
                {language === "ur" ? "اسلامی فنانس کے بنیادی اصول" : "Core Islamic Finance Principles"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {shariahPrinciples.map((principle, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${isRTL ? "text-right" : ""}`}>
                    <div
                      className={`flex items-center space-x-2 mb-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold">{language === "ur" ? principle.title_ur : principle.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      {language === "ur" ? principle.description_ur : principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="board">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? "text-right" : ""}>
                {language === "ur" ? "شریعہ بورڈ کے ممبران" : "Shariah Board Members"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {boardMembers.map((member) => (
                  <div key={member.id} className={`border rounded-lg p-4 ${isRTL ? "text-right" : ""}`}>
                    <div className={`flex items-start space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">
                          {language === "ur" ? member.name_ur || member.name : member.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {language === "ur" ? member.title_ur || member.title : member.title}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          {language === "ur"
                            ? member.qualifications_ur || member.qualifications
                            : member.qualifications}
                        </p>
                        <p className="text-sm">{language === "ur" ? member.bio_ur || member.bio : member.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? "text-right" : ""}>
                {language === "ur" ? "شریعہ سرٹیفکیٹس" : "Shariah Certificates"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    name: "Shariah Compliance Certificate",
                    name_ur: "شریعہ کمپلائنس سرٹیفکیٹ",
                    issuer: "Islamic Finance Council",
                    issuer_ur: "اسلامی فنانس کونسل",
                    date: "2024-01-15",
                  },
                  {
                    name: "Halal Investment Certification",
                    name_ur: "حلال سرمایہ کاری سرٹیفکیٹ",
                    issuer: "Shariah Advisory Board",
                    issuer_ur: "شریعہ ایڈوائزری بورڈ",
                    date: "2024-02-01",
                  },
                  {
                    name: "Islamic Finance Audit Report",
                    name_ur: "اسلامی فنانس آڈٹ رپورٹ",
                    issuer: "Independent Shariah Auditors",
                    issuer_ur: "آزاد شریعہ آڈیٹرز",
                    date: "2024-03-01",
                  },
                ].map((cert, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 border rounded-lg ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`flex items-center space-x-3 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                      <FileText className="h-5 w-5 text-green-600" />
                      <div className={isRTL ? "text-right" : ""}>
                        <p className="font-medium text-sm">{language === "ur" ? cert.name_ur : cert.name}</p>
                        <p className="text-xs text-gray-600">
                          {language === "ur" ? cert.issuer_ur : cert.issuer} • {cert.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className={`flex items-start space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse text-right" : ""}`}>
            <Shield className="h-8 w-8 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-green-800 mb-2">
                {language === "ur" ? "شریعہ کی ضمانت" : "Shariah Guarantee"}
              </h3>
              <p className="text-sm text-green-700">
                {language === "ur"
                  ? "ہم یقین دلاتے ہیں کہ تمام سرمایہ کاریاں اسلامی شریعت کے مطابق ہیں۔ اگر کوئی سرمایہ کاری غیر شرعی پائی جائے تو ہم مکمل رقم واپس کر دیں گے۔"
                  : "We guarantee that all investments comply with Islamic Shariah. If any investment is found to be non-compliant, we will provide full refund."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
