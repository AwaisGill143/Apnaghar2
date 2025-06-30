"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, FileText, AlertTriangle, CheckCircle, Download } from "lucide-react"

export function SECPCompliance() {
  const [riskAcknowledged, setRiskAcknowledged] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [kycCompleted, setKycCompleted] = useState(false)

  const complianceChecks = [
    {
      id: "secp-registration",
      title: "SECP Registration",
      status: "completed",
      description: "Apna Ghar is registered with SECP under Real Estate Investment Trust regulations",
      certificate: "SECP-REG-2023-001",
    },
    {
      id: "investor-protection",
      title: "Investor Protection Fund",
      status: "active",
      description: "All investments are covered under SECP Investor Protection Fund",
      coverage: "Up to PKR 500,000 per investor",
    },
    {
      id: "audit-compliance",
      title: "Annual Audit",
      status: "completed",
      description: "Latest audit completed by SECP-approved auditors",
      auditFirm: "A.F. Ferguson & Co.",
      auditDate: "March 2024",
    },
    {
      id: "disclosure-requirements",
      title: "Disclosure Requirements",
      status: "compliant",
      description: "All mandatory disclosures as per SECP regulations",
      lastUpdate: "December 2024",
    },
  ]

  const riskFactors = [
    "Real estate investments are subject to market volatility",
    "Property values may fluctuate based on economic conditions",
    "Rental income is not guaranteed and may vary",
    "Liquidity may be limited during market downturns",
    "Regulatory changes may affect investment returns",
    "Currency devaluation may impact investment value",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span>SECP Compliance Status</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Fully Compliant
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {complianceChecks.map((check) => (
              <div key={check.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{check.title}</h4>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-2">{check.description}</p>
                <div className="text-xs text-gray-500">
                  {check.certificate && <p>Certificate: {check.certificate}</p>}
                  {check.coverage && <p>Coverage: {check.coverage}</p>}
                  {check.auditFirm && <p>Auditor: {check.auditFirm}</p>}
                  {check.auditDate && <p>Audit Date: {check.auditDate}</p>}
                  {check.lastUpdate && <p>Last Update: {check.lastUpdate}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="risk-disclosure" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="risk-disclosure">Risk Disclosure</TabsTrigger>
          <TabsTrigger value="investor-rights">Investor Rights</TabsTrigger>
          <TabsTrigger value="documents">Legal Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="risk-disclosure">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Risk Disclosure Statement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Important Risk Factors</h4>
                <ul className="space-y-2">
                  {riskFactors.map((risk, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="risk-acknowledgment" checked={riskAcknowledged} onCheckedChange={setRiskAcknowledged} />
                <label htmlFor="risk-acknowledgment" className="text-sm">
                  I acknowledge that I have read and understood all risk factors associated with this investment
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investor-rights">
          <Card>
            <CardHeader>
              <CardTitle>Your Rights as an Investor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Information Rights</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Quarterly financial reports</li>
                    <li>• Annual audited statements</li>
                    <li>• Property performance updates</li>
                    <li>• Material change notifications</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Voting Rights</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Major property decisions</li>
                    <li>• Management company changes</li>
                    <li>• Fee structure modifications</li>
                    <li>• Exit strategy approvals</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Exit Rights</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Secondary market trading</li>
                    <li>• Redemption requests</li>
                    <li>• Transfer of ownership</li>
                    <li>• Inheritance provisions</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Protection Rights</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• SECP complaint mechanism</li>
                    <li>• Investor protection fund</li>
                    <li>• Legal recourse options</li>
                    <li>• Dispute resolution</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Legal Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "SECP Registration Certificate", size: "2.1 MB", type: "PDF" },
                  { name: "Trust Deed", size: "5.3 MB", type: "PDF" },
                  { name: "Offering Document", size: "8.7 MB", type: "PDF" },
                  { name: "Annual Report 2024", size: "12.4 MB", type: "PDF" },
                  { name: "Audited Financial Statements", size: "3.2 MB", type: "PDF" },
                  { name: "Risk Management Policy", size: "1.8 MB", type: "PDF" },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-gray-600">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms-acceptance" checked={termsAccepted} onCheckedChange={setTermsAccepted} />
              <label htmlFor="terms-acceptance" className="text-sm">
                I accept the Terms and Conditions and have read the Offering Document
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="kyc-completion" checked={kycCompleted} onCheckedChange={setKycCompleted} />
              <label htmlFor="kyc-completion" className="text-sm">
                I confirm that my KYC documentation is complete and up to date
              </label>
            </div>
            <Button className="w-full" disabled={!riskAcknowledged || !termsAccepted || !kycCompleted}>
              Proceed with Investment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
