"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

export const DynamicAdminProfileContent = dynamic(() => import("./AdminProfileContent"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow p-6">
            <Skeleton className="h-40 w-40 rounded-full mx-auto mb-4" />
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
            <div className="space-y-2 mt-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full" />
            <div className="space-y-4 mt-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
})
