"use client"

import type React from "react"

import { useFormContext } from "react-hook-form"
import { FormCard } from "./FormCard"
import { FormField } from "./FormField"
import { useState } from "react"
import { X } from "lucide-react"

export function TalentRequirementsCard() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()
  const [skillInput, setSkillInput] = useState("")
  const requiredSkills = watch("requiredSkills") || []

  const addSkill = () => {
    if (skillInput.trim() && !requiredSkills.includes(skillInput.trim())) {
      setValue("requiredSkills", [...requiredSkills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setValue(
      "requiredSkills",
      requiredSkills.filter((s: string) => s !== skill),
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <FormCard title="인재 요건">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="경력 요건" name="careerLevel" required error={errors.careerLevel?.message as string}>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("careerLevel")}
          >
            <option value="ANY">경력 무관</option>
            <option value="ENTRY">신입</option>
            <option value="JUNIOR">경력 1~3년</option>
            <option value="MID">경력 4~7년</option>
            <option value="SENIOR">경력 8년 이상</option>
            <option value="EXECUTIVE">임원급</option>
          </select>
        </FormField>

        <FormField label="학력 요건" name="educationLevel" required error={errors.educationLevel?.message as string}>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("educationLevel")}
          >
            <option value="ANY">학력 무관</option>
            <option value="HIGH_SCHOOL">고졸 이상</option>
            <option value="ASSOCIATE">전문학사 이상</option>
            <option value="BACHELOR">학사 이상</option>
            <option value="MASTER">석사 이상</option>
            <option value="DOCTORATE">박사 이상</option>
          </select>
        </FormField>
      </div>

      <FormField label="필요 기술" name="requiredSkills" error={errors.requiredSkills?.message as string}>
        <div className="flex">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="필요한 기술을 입력해주세요 (예: React, Java)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={addSkill}
          >
            추가
          </button>
        </div>
        {requiredSkills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {requiredSkills.map((skill: string) => (
              <div key={skill} className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                {skill}
                <button
                  type="button"
                  className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                  onClick={() => removeSkill(skill)}
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
