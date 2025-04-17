"use client"

import dynamic from "next/dynamic"

export const ScheduleCalendar = dynamic(
  () => import("./ScheduleCalendar").then((mod) => ({ default: mod.ScheduleCalendar })),
  {
    ssr: false,
    loading: () => <div className="bg-white rounded-lg shadow p-4 h-[600px] animate-pulse"></div>,
  },
)
