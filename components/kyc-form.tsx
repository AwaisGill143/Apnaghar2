"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, CheckCircle } from "lucide-react"

export function KYCForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {},
    financialInfo: {},
    documents: {},
    verification: {},
  })

  const pakistaniCities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
  ]

  const incomeRanges = [
    "Below PKR 50,000",
    "PKR 50,000 - 100,000",
    "PKR 100,000 - 250,000",
    "PKR 250,000 - 500,000",
    "PKR 500,000 - 1,000,000",
    "Above PKR 1,000,000",
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>KYC Verification - Step {step} of 4</CardTitle>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full-name">Full Name (as per CNIC)</Label>
                  <Input id="full-name" placeholder="Enter your full name" />
                </div>
                <div>
                  <Label htmlFor="cnic">CNIC Number</Label>
                  <Input id="cnic" placeholder="XXXXX-XXXXXXX-X" />
                </div>
                <div>
                  <Label htmlFor="father-name">Father's Name</Label>
                  <Input id="father-name" placeholder="Enter father's name" />
                </div>
                <div>
                  <Label htmlFor="date-of-birth">Date of Birth</Label>
                  <Input id="date-of-birth" type="date" />
                </div>
                <div>
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input id="phone" placeholder="03XX-XXXXXXX" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Complete Address</Label>
                <Textarea id="address" placeholder="Enter your complete address" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {pakistaniCities.map((city) => (
                        <SelectItem key={city} value={city.toLowerCase()}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" placeholder="Enter postal code" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Financial Information</h3>
              <div>
                <Label>Monthly Income Range</Label>
                <RadioGroup className="mt-2">
                  {incomeRanges.map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <RadioGroupItem value={range} id={range} />
                      <label htmlFor={range} className="text-sm">
                        {range}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input id="occupation" placeholder="Enter your occupation" />
              </div>
              <div>
                <Label htmlFor="employer">Employer/Business Name</Label>
                <Input id="employer" placeholder="Enter employer or business name" />
              </div>
              <div>
                <Label>Source of Investment Funds</Label>
                <RadioGroup className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="salary" id="salary" />
                    <label htmlFor="salary" className="text-sm">
                      Salary/Employment Income
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="business" />
                    <label htmlFor="business" className="text-sm">
                      Business Income
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="savings" id="savings" />
                    <label htmlFor="savings" className="text-sm">
                      Personal Savings
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inheritance" id="inheritance" />
                    <label htmlFor="inheritance" className="text-sm">
                      Inheritance
                    </label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="investment-experience">Investment Experience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Document Upload</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "CNIC Front", required: true },
                  { name: "CNIC Back", required: true },
                  { name: "Bank Statement (3 months)", required: true },
                  { name: "Salary Certificate", required: false },
                  { name: "Utility Bill", required: true },
                  { name: "Passport Size Photo", required: true },
                ].map((doc) => (
                  <div key={doc.name} className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-gray-600">{doc.required ? "Required" : "Optional"}</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Choose File
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Document Requirements:</h4>
                <ul className="text-sm space-y-1">
                  <li>• All documents must be clear and readable</li>
                  <li>• File formats: JPG, PNG, PDF (max 5MB each)</li>
                  <li>• CNIC must be valid and not expired</li>
                  <li>• Bank statement must be recent (within 3 months)</li>
                </ul>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Verification & Consent</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="info-accuracy" />
                  <label htmlFor="info-accuracy" className="text-sm">
                    I confirm that all information provided is accurate and complete
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="secp-consent" />
                  <label htmlFor="secp-consent" className="text-sm">
                    I consent to SECP verification and compliance checks
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="data-processing" />
                  <label htmlFor="data-processing" className="text-sm">
                    I agree to the processing of my personal data for KYC purposes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="aml-compliance" />
                  <label htmlFor="aml-compliance" className="text-sm">
                    I understand and comply with Anti-Money Laundering regulations
                  </label>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-semibold">KYC Verification Process</h4>
                    <p className="text-sm text-gray-600">
                      Your documents will be verified within 24-48 hours. You'll receive an email confirmation once
                      approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
              Previous
            </Button>
            <Button
              onClick={() => (step === 4 ? console.log("Submit KYC") : setStep(step + 1))}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {step === 4 ? "Submit KYC" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
