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
  const formValues = watch()

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
                {/* 입력값 연동: 제목 미리보기 */}
                <div className="mt-2 text-xs text-gray-700 truncate">
                  {formValues.title ? `제목: ${formValues.title}` : '제목 미입력'}
                </div>
                {/* 입력값 연동: 직무카테고리 미리보기 및 콘솔 구조 확인 */}
                {(() => {
                  if (Array.isArray(formValues.jobCategoryIds)) {
                    formValues.jobCategoryIds.forEach((item: any, idx: number) => {
                      console.log(`[DEBUG] jobCategoryIds[${idx}]:`, item);
                    });
                  }
                  return null;
                })()}
                <div className="mt-1 text-xs text-gray-700 truncate">
                  {Array.isArray(formValues.jobCategoryIds) && formValues.jobCategoryIds.length > 0
                    ? `직무카테고리: ${formValues.jobCategoryIds
                        .map((item: any) =>
                          typeof item === "object" && item !== null
                            ? (item.label ?? item.value ?? item.id ?? "[object]")
                            : String(item)
                        )
                        .join(", ")}`
                    : "직무카테고리 미입력"}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
      {errors.templateType && <p className="mt-1 text-sm text-red-600">{errors.templateType.message as string}</p>}
    </FormCard>
  )
}
