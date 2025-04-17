"use client"

import dynamic from "next/dynamic"

export const JobCategoryChart = dynamic(
  () => import("../JobCategoryChart").then((mod) => ({ default: mod.JobCategoryChart })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="h-64 bg-gray-100 animate-pulse rounded-md"></div>
      </div>
    ),
  },
)
