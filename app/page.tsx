"use client"

import { Hero } from "@/components/hero"
import { FeaturedProperties } from "@/components/featured-properties"
import { TrustBadges } from "@/components/trust-badges"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProperties />
      <TrustBadges />
    </div>
  )
}
