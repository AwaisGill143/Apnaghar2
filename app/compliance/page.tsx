import { SECPCompliance } from "@/components/secp-compliance"

export default function CompliancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">SECP Compliance</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Apna Ghar is fully regulated by the Securities and Exchange Commission of Pakistan (SECP). Review our
          compliance status, risk disclosures, and legal documentation.
        </p>
      </div>
      <SECPCompliance />
    </div>
  )
}
