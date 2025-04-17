"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

export const DynamicPaymentsTable = dynamic(() => import("./PaymentsTable"), {
  ssr: false,
  loading: () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[...Array(7)].map((_, i) => (
              <th
                key={i}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <Skeleton className="h-4 w-20 rounded-md" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(10)].map((_, i) => (
            <tr key={i}>
              {[...Array(7)].map((_, j) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-full rounded-md" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
})
