"use client"

import { useFormContext } from "react-hook-form"
import { FormCard } from "./FormCard"
import { FormField } from "./FormField"

export function JobDescriptionCard() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <FormCard title="직무 설명">
      <FormField
        label="주요 업무"
        name="description.duties"
        required
        error={errors.description?.duties?.message as string}
      >
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          placeholder="주요 업무를 입력해주세요"
          {...register("description.duties")}
        />
      </FormField>

      <FormField
        label="자격 요건"
        name="description.requirements"
        required
        error={errors.description?.requirements?.message as string}
      >
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          placeholder="자격 요건을 입력해주세요"
          {...register("description.requirements")}
        />
      </FormField>

      <FormField
        label="우대 사항"
        name="description.preferences"
        error={errors.description?.preferences?.message as string}
      >
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          placeholder="우대 사항을 입력해주세요 (선택사항)"
          {...register("description.preferences")}
        />
      </FormField>

      <FormField label="복리 후생" name="description.benefits" error={errors.description?.benefits?.message as string}>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          placeholder="복리 후생을 입력해주세요 (선택사항)"
          {...register("description.benefits")}
        />
      </FormField>
    </FormCard>
  )
}
