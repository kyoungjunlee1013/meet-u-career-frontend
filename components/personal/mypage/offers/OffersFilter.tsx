"use client"

import { useState } from "react"
import { ChevronDown, LayoutGrid } from "lucide-react"

export function OffersFilter() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <button
          className="flex items-center space-x-1 text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-1.5 bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>최신순</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="py-1">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                최신순
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                오래된순
              </button>
            </div>
          </div>
        )}
      </div>

      <button className="flex items-center justify-center h-9 w-9 border border-gray-300 rounded-md bg-white">
        <LayoutGrid className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  )
}
