"use client"

import type { ReactNode } from "react"

interface FormCardProps {
  title: string
  children: ReactNode
}

export function FormCard({ title, children }: FormCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  )
}
