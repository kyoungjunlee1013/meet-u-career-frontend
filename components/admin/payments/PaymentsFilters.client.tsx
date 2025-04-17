"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

export const DynamicPaymentsFilters = dynamic(() => import("./PaymentsFilters"), {
  ssr: false,
  loading: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
      <div className="flex items-center">
        <div className="relative flex-grow mr-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-20 rounded-md" />
      </div>
    </div>
  ),
})
