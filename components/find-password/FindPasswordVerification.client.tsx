"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

export const DynamicFindPasswordVerification = dynamic(() => import("./FindPasswordVerification"), {
  ssr: false,
  loading: () => (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  ),
})
