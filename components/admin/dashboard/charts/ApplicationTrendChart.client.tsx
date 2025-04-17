"use client"

import dynamic from "next/dynamic"

export const ApplicationTrendChart = dynamic(
  () => import("../ApplicationTrendChart").then((mod) => ({ default: mod.ApplicationTrendChart })),
  {
    ssr: false,
    loading: () => <div className="h-[300px] bg-gray-100 animate-pulse rounded-md"></div>,
  },
)
