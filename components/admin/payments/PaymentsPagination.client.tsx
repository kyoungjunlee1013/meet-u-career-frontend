"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

export const DynamicPaymentsPagination = dynamic(() => import("./PaymentsPagination"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-between">
      <div>
        <Skeleton className="h-4 w-40 rounded-md" />
      </div>
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-md" />
        ))}
      </div>
    </div>
  ),
})
