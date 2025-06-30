import { KYCForm } from "@/components/kyc-form"

export default function KYCPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">KYC Verification</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete your Know Your Customer (KYC) verification to start investing in Pakistani real estate. This process
          ensures compliance with SECP regulations and protects all investors.
        </p>
      </div>
      <KYCForm />
    </div>
  )
}
