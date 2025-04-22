"use client"

import { useFormContext } from "react-hook-form"
import { FormCard } from "./FormCard"

export function TemplateSelectionCard() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()
  const templateType = watch("templateType")

  const templates = [
    { id: 0, name: "기본 템플릿", description: "기본적인 공고 템플릿입니다." },
    { id: 1, name: "상세 템플릿", description: "더 많은 정보를 포함한 상세 템플릿입니다." },
    { id: 2, name: "미니멀 템플릿", description: "간결하고 깔끔한 미니멀 템플릿입니다." },
  ]

  return (
    <FormCard title="공고 템플릿">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <label
            key={template.id}
            htmlFor={`template-${template.id}`}
            className={`border rounded-md p-4 cursor-pointer transition-colors block ${
              templateType === template.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
            }`}
            onClick={() => setValue("templateType", template.id)}
          >
            <div className="flex items-start">
              <input
                type="radio"
                id={`template-${template.id}`}
                className="mt-1 mr-2"
                name="templateType"
                checked={templateType === template.id}
                onChange={() => setValue("templateType", template.id)}
                value={template.id}
              />
              <div>
                <span className="font-medium text-gray-900 block mb-1">
                  {template.name}
                </span>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
      {errors.templateType && <p className="mt-1 text-sm text-red-600">{errors.templateType.message as string}</p>}
    </FormCard>
  )
}
