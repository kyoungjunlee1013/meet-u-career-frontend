"use client"

import dynamic from "next/dynamic"

export const ApplicationConversionRates = dynamic(
  () => import("../ApplicationConversionRates").then((mod) => ({ default: mod.ApplicationConversionRates })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        <div className="h-4 bg-gray-100 animate-pulse rounded-md"></div>
      </div>
    ),
  },
)
