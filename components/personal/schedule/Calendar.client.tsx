"use client"

import dynamic from "next/dynamic"

export const Calendar = dynamic(() => import("./Calendar").then((mod) => ({ default: mod.Calendar })), {
  ssr: false,
  loading: () => <div className="bg-white rounded-lg shadow p-4 h-[600px] animate-pulse"></div>,
})
