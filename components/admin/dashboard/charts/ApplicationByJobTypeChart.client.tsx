"use client"

import dynamic from "next/dynamic"

export const ApplicationByJobTypeChart = dynamic(
  () => import("../ApplicationByJobTypeChart").then((mod) => ({ default: mod.ApplicationByJobTypeChart })),
  {
    ssr: false,
    loading: () => <div className="h-[300px] bg-gray-100 animate-pulse rounded-md"></div>,
  },
)
