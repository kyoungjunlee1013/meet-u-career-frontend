"use client"

import { useFormContext } from "react-hook-form"
import { FormCard } from "./FormCard"
import { FormField } from "./FormField"
import { useEffect } from "react"

export function ApplicationMethodCard() {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext()
  const applicationMethod = watch("applicationMethod")

  // Reset fields when application method changes
  useEffect(() => {
    if (applicationMethod === "EMAIL") {
      setValue("contactWebsite", "")
      setValue("contactPhone", "")
    } else if (applicationMethod === "WEBSITE") {
      setValue("contactEmail", "")
      setValue("contactPhone", "")
    } else if (applicationMethod === "PHONE") {
      setValue("contactEmail", "")
      setValue("contactWebsite", "")
    }
  }, [applicationMethod, setValue])

  return (
    <FormCard title="지원 방법">
      <FormField
        label="지원 방식"
        name="applicationMethod"
        required
        error={errors.applicationMethod?.message as string}
      >
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("applicationMethod")}
        >
          <option value="EMAIL">이메일 지원</option>
          <option value="WEBSITE">웹사이트 지원</option>
          <option value="PHONE">전화 지원</option>
        </select>
      </FormField>

      {applicationMethod === "EMAIL" && (
        <FormField label="지원 이메일" name="contactEmail" required error={errors.contactEmail?.message as string}>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="지원 이메일을 입력해주세요"
            {...register("contactEmail")}
          />
        </FormField>
      )}

      {applicationMethod === "WEBSITE" && (
        <FormField
          label="지원 웹사이트"
          name="contactWebsite"
          required
          error={errors.contactWebsite?.message as string}
        >
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="지원 웹사이트 URL을 입력해주세요"
            {...register("contactWebsite")}
          />
        </FormField>
      )}

      {applicationMethod === "PHONE" && (
        <FormField label="지원 전화번호" name="contactPhone" required error={errors.contactPhone?.message as string}>
          <input
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="지원 전화번호를 입력해주세요"
            {...register("contactPhone")}
          />
        </FormField>
      )}
    </FormCard>
  )
}
