"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { X, Plus } from "lucide-react"

export function StepThree() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "interviewQuestions",
  })

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">합격 여부 정보 제공</label>
        <div className="space-y-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 rounded"
              value="salary"
              {...register("interviewStatus")}
            />
            <span className="ml-2">연봉 정보 제공</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 rounded"
              value="benefits"
              {...register("interviewStatus")}
            />
            <span className="ml-2">복지 정보 제공</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 rounded"
              value="culture"
              {...register("interviewStatus")}
            />
            <span className="ml-2">기업 문화 정보 제공</span>
          </label>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">
            받았던 질문 <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
            onClick={() => append("")}
          >
            <Plus className="w-4 h-4 mr-1" />
            질문 추가
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={`질문 ${index + 1}`}
                {...register(`interviewQuestions.${index}` as const)}
              />
              {index > 0 && (
                <button type="button" className="ml-2 text-gray-400 hover:text-red-500" onClick={() => remove(index)}>
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.interviewQuestions && (
          <p className="mt-1 text-sm text-red-600">{errors.interviewQuestions.message as string}</p>
        )}
      </div>

      <div>
        <label htmlFor="interviewTip" className="block text-sm font-medium text-gray-700 mb-1">
          면접 팁
        </label>
        <textarea
          id="interviewTip"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="면접 준비를 위한 팁이나 조언을 작성해주세요."
          {...register("interviewTip")}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          합격 여부 <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-green-600"
              value="accepted"
              {...register("result")}
            />
            <span className="ml-2">합격</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-yellow-600"
              value="waiting"
              {...register("result")}
            />
            <span className="ml-2">대기중</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio h-4 w-4 text-red-600" value="rejected" {...register("result")} />
            <span className="ml-2">불합격</span>
          </label>
        </div>
        {errors.result && <p className="mt-1 text-sm text-red-600">{errors.result.message as string}</p>}
      </div>
    </div>
  )
}
