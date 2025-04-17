"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

export const DynamicFindIdResult = dynamic(() => import("./FindIdResult"), {
  ssr: false,
  loading: () => (
    <div className="space-y-4">
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  ),
})
