import type React from "react"
import type { FieldError, UseFormRegister } from "react-hook-form"
import type { CompanyProfileFormData } from "./schema"

type FormFieldProps = {
  label: string
  name: keyof CompanyProfileFormData
  register: UseFormRegister<CompanyProfileFormData>
  error?: FieldError
  type?: string
  placeholder?: string
  required?: boolean
  as?: "input" | "textarea" | "select"
  rows?: number
  children?: React.ReactNode
  description?: string
}

export const FormField = ({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  required = false,
  as = "input",
  rows = 3,
  children,
  description,
}: FormFieldProps) => {
  const id = `field-${name}`

  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {description && <span className="text-xs text-gray-500">{description}</span>}
      </div>

      {as === "textarea" ? (
        <textarea
          id={id}
          {...register(name)}
          placeholder={placeholder}
          rows={rows}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          } sm:text-sm transition-colors`}
          aria-invalid={error ? "true" : "false"}
        />
      ) : as === "select" ? (
        <select
          id={id}
          {...register(name)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          } sm:text-sm transition-colors`}
          aria-invalid={error ? "true" : "false"}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          } sm:text-sm transition-colors`}
          aria-invalid={error ? "true" : "false"}
        />
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error`} role="alert">
          {error.message}
        </p>
      )}
    </div>
  )
}
