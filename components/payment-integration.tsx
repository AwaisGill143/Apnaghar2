"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Building2, Wallet } from "lucide-react"

interface PaymentIntegrationProps {
  amount: number
  onPaymentComplete: (method: string, details: any) => void
}

export function PaymentIntegration({ amount, onPaymentComplete }: PaymentIntegrationProps) {
  const [paymentMethod, setPaymentMethod] = useState("jazzcash")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [selectedBank, setSelectedBank] = useState("")

  const pakistaniBanks = [
    { code: "HBL", name: "Habib Bank Limited", logo: "🏦" },
    { code: "UBL", name: "United Bank Limited", logo: "🏛️" },
    { code: "MCB", name: "MCB Bank Limited", logo: "🏢" },
    { code: "ABL", name: "Allied Bank Limited", logo: "🏪" },
    { code: "NBP", name: "National Bank of Pakistan", logo: "🏦" },
    { code: "BAFL", name: "Bank Alfalah Limited", logo: "🏛️" },
    { code: "KASB", name: "KASB Bank", logo: "🏢" },
    { code: "JS", name: "JS Bank", logo: "🏪" },
  ]

  const handlePayment = () => {
    const paymentDetails = {
      method: paymentMethod,
      amount,
      phoneNumber: paymentMethod === "jazzcash" || paymentMethod === "easypaisa" ? phoneNumber : undefined,
      bankAccount: paymentMethod === "bank" ? bankAccount : undefined,
      selectedBank: paymentMethod === "bank" ? selectedBank : undefined,
      timestamp: new Date().toISOString(),
    }

    onPaymentComplete(paymentMethod, paymentDetails)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5" />
          <span>Payment Method</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jazzcash" className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>JazzCash</span>
            </TabsTrigger>
            <TabsTrigger value="easypaisa" className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>EasyPaisa</span>
            </TabsTrigger>
            <TabsTrigger value="bank" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Bank</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jazzcash" className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-red-600 text-white p-2 rounded">📱</div>
                <div>
                  <h4 className="font-semibold">JazzCash Mobile Account</h4>
                  <p className="text-sm text-gray-600">Pay securely with your JazzCash wallet</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="jazz-phone">Mobile Number</Label>
                  <Input
                    id="jazz-phone"
                    placeholder="03XX-XXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p>• Instant payment processing</p>
                  <p>• Transaction fee: PKR 10</p>
                  <p>• Daily limit: PKR 1,000,000</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="easypaisa" className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-green-600 text-white p-2 rounded">💳</div>
                <div>
                  <h4 className="font-semibold">EasyPaisa Mobile Account</h4>
                  <p className="text-sm text-gray-600">Pay with your EasyPaisa wallet</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="easypaisa-phone">Mobile Number</Label>
                  <Input
                    id="easypaisa-phone"
                    placeholder="03XX-XXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p>• Real-time payment confirmation</p>
                  <p>• Transaction fee: PKR 15</p>
                  <p>• Daily limit: PKR 500,000</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bank" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Select Your Bank</Label>
                <RadioGroup value={selectedBank} onValueChange={setSelectedBank} className="mt-2">
                  <div className="grid grid-cols-2 gap-2">
                    {pakistaniBanks.map((bank) => (
                      <div key={bank.code} className="flex items-center space-x-2 border rounded p-2">
                        <RadioGroupItem value={bank.code} id={bank.code} />
                        <label htmlFor={bank.code} className="flex items-center space-x-2 cursor-pointer flex-1">
                          <span className="text-lg">{bank.logo}</span>
                          <div>
                            <p className="font-medium text-sm">{bank.code}</p>
                            <p className="text-xs text-gray-600">{bank.name}</p>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="account-number">Account Number</Label>
                <Input
                  id="account-number"
                  placeholder="Enter your account number"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                />
              </div>
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                <p>• Bank transfer processing: 1-2 business days</p>
                <p>• No additional transaction fees</p>
                <p>• Secure bank-grade encryption</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span>Investment Amount:</span>
            <span className="font-semibold">PKR {amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Processing Fee:</span>
            <span className="font-semibold">
              {paymentMethod === "jazzcash" ? "PKR 10" : paymentMethod === "easypaisa" ? "PKR 15" : "Free"}
            </span>
          </div>
          <div className="border-t pt-2 flex justify-between items-center font-bold">
            <span>Total Amount:</span>
            <span>
              PKR{" "}
              {(amount + (paymentMethod === "jazzcash" ? 10 : paymentMethod === "easypaisa" ? 15 : 0)).toLocaleString()}
            </span>
          </div>
        </div>

        <Button onClick={handlePayment} className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
          Pay PKR{" "}
          {(amount + (paymentMethod === "jazzcash" ? 10 : paymentMethod === "easypaisa" ? 15 : 0)).toLocaleString()}
        </Button>
      </CardContent>
    </Card>
  )
}
