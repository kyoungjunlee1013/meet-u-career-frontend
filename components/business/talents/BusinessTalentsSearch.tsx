"use client"

import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { TalentsHeader } from "./TalentsHeader"
import { TalentsSearch } from "./TalentsSearch"
import { TalentsFilter } from "./TalentsFilter"
import { TalentsGrid } from "./TalentsGrid"
import { useState } from "react"

export const BusinessTalentsSearch = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BusinessHeader />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <TalentsHeader />
        <TalentsSearch onFilterToggle={() => setIsFilterOpen(!isFilterOpen)} />

        <div className="flex mt-4 gap-6">
          {isFilterOpen && (
            <div className="w-64 shrink-0">
              <TalentsFilter />
            </div>
          )}

          <div className="flex-1">
            <TalentsGrid />
          </div>
        </div>
      </main>
    </div>
  )
}
