import { PortfolioSummary } from "@/components/portfolio-summary"
import { InvestmentList } from "@/components/investment-list"
import { EarningsSummary } from "@/components/earnings-summary"

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Portfolio</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PortfolioSummary />
          <InvestmentList />
        </div>
        <div>
          <EarningsSummary />
        </div>
      </div>
    </div>
  )
}
