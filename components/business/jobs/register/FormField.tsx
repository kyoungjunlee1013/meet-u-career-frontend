"use client"

import type { ReactNode } from "react"

interface FormFieldProps {
  label: string
  name: string
  required?: boolean
  error?: string
  children: ReactNode
}

export function FormField({ label, name, required = false, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
