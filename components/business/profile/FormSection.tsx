import type { ReactNode } from "react"

interface FormSectionProps {
  title: string
  children: ReactNode
  description?: string
}

export const FormSection = ({ title, description, children }: FormSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  )
}
