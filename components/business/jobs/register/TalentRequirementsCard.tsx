"use client"

import type React from "react"
import { useFormContext } from "react-hook-form"
import { FormCard } from "./FormCard"
import { FormField } from "./FormField"
import { useState } from "react"
import { X } from "lucide-react"

const EXPERIENCE_LEVEL_OPTIONS = [
  { value: 0, label: "경력 무관" },
  { value: 1, label: "신입" },
  { value: 2, label: "경력 1~3년" },
  { value: 3, label: "경력 4~7년" },
  { value: 4, label: "경력 8년 이상" },
  { value: 5, label: "임원급" },
];

const EDUCATION_LEVEL_OPTIONS = [
  { value: 0, label: "학력 무관" },
  { value: 1, label: "고졸 이상" },
  { value: 2, label: "전문학사 이상" },
  { value: 3, label: "학사 이상" },
  { value: 4, label: "석사 이상" },
  { value: 5, label: "박사 이상" },
];

export function TalentRequirementsCard() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()
  const [keywordInput, setKeywordInput] = useState("")
  const keyword = watch("keyword") || []

  const addKeyword = () => {
    if (keywordInput.trim() && !keyword.includes(keywordInput.trim())) {
      setValue("keyword", [...keyword, keywordInput.trim()])
      setKeywordInput("")
    }
  }

  const removeKeyword = (k: string) => {
    setValue(
      "keyword",
      keyword.filter((s: string) => s !== k),
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword()
    }
  }

  return (
    <FormCard title="인재 요건">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="경력 요건" name="experienceLevel" required error={errors.experienceLevel?.message as string}>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("experienceLevel", { valueAsNumber: true })}
          >
            {EXPERIENCE_LEVEL_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </FormField>

        <FormField label="학력 요건" name="educationLevel" required error={errors.educationLevel?.message as string}>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("educationLevel", { valueAsNumber: true })}
          >
            {EDUCATION_LEVEL_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="키워드" name="keyword" error={errors.keyword?.message as string}>
        <div className="flex">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="키워드를 입력해주세요 (예: 건강보조식품, 바이오, 제약 등)"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={addKeyword}
          >
            추가
          </button>
        </div>
        {keyword.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {keyword.map((k: string) => (
              <div key={k} className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                {k}
                <button
                  type="button"
                  className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                  onClick={() => removeKeyword(k)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </FormField>
    </FormCard>
  )
}
