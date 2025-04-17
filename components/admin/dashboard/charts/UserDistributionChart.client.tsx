"use client"

import dynamic from "next/dynamic"

export const UserDistributionChart = dynamic(
  () => import("../UserDistributionChart").then((mod) => ({ default: mod.UserDistributionChart })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="h-64 bg-gray-100 animate-pulse rounded-md"></div>
      </div>
    ),
  },
)
