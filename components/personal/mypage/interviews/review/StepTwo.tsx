"use client"

import { Info } from "lucide-react"
import { useFormContext } from "react-hook-form"

export function StepTwo() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div>
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-blue-800">면접 정보 입력</p>
        </div>
        <p className="text-sm text-blue-800 ml-7">면접에 대한 정보를 입력해주세요.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block mb-4 text-sm font-medium">
            전반적인 평가 <span className="text-red-500">*</span>
          </label>
          <div className="flex justify-between items-center max-w-md">
            <label className="flex flex-col items-center cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
                <svg
                  className="w-10 h-10 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M8 13C8.5 14.5 10 16 12 16C14 16 15.5 14.5 16 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
                  <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <input
                type="radio"
                value="positive"
                className="sr-only"
                {...register("overallImpression")}
                defaultChecked
              />
              <span className="text-sm">긍정적</span>
            </label>

            <label className="flex flex-col items-center cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-2 group-hover:bg-yellow-200 transition-colors">
                <svg
                  className="w-10 h-10 text-yellow-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
                  <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <input type="radio" value="neutral" className="sr-only" {...register("overallImpression")} />
              <span className="text-sm">보통</span>
            </label>

            <label className="flex flex-col items-center cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2 group-hover:bg-red-200 transition-colors">
                <svg
                  className="w-10 h-10 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M16 11C15.5 9.5 14 8 12 8C10 8 8.5 9.5 8 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="8.5" cy="14.5" r="1.5" fill="currentColor" />
                  <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <input type="radio" value="negative" className="sr-only" {...register("overallImpression")} />
              <span className="text-sm">부정적</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            난이도 <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-6">
            <label className="inline-flex items-center">
              <input type="radio" value="easy" className="w-4 h-4 text-blue-600" {...register("difficulty")} />
              <span className="ml-2">쉬움</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="moderate"
                className="w-4 h-4 text-blue-600"
                {...register("difficulty")}
                defaultChecked
              />
              <span className="ml-2">보통</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" value="difficult" className="w-4 h-4 text-blue-600" {...register("difficulty")} />
              <span className="ml-2">어려움</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            면접 및 전형유형(복수 선택 가능) <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="직무/인성면접"
                className="w-4 h-4 text-blue-600 rounded"
                {...register("interviewFormats")}
              />
              <span className="ml-2">직무/인성면접</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="PT면접"
                className="w-4 h-4 text-blue-600 rounded"
                {...register("interviewFormats")}
              />
              <span className="ml-2">PT면접</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="토론면접"
                className="w-4 h-4 text-blue-600 rounded"
                {...register("interviewFormats")}
              />
              <span className="ml-2">토론면접</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="인적성 검사"
                className="w-4 h-4 text-blue-600 rounded"
                {...register("interviewFormats")}
              />
              <span className="ml-2">인적성 검사</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="실무 과제 및 시험"
                className="w-4 h-4 text-blue-600 rounded"
                {...register("interviewFormats")}
              />
              <span className="ml-2">실무 과제 및 시험</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="기타"
                className="w-4 h-4 text-blue-600 rounded"
                {...register("interviewFormats")}
              />
              <span className="ml-2">기타</span>
            </label>
          </div>
          {errors.interviewFormats && (
            <p className="text-red-500 text-xs mt-1">{errors.interviewFormats.message as string}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            면접 인원 <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="oneOnOne"
                className="w-4 h-4 text-blue-600"
                {...register("interviewStructure")}
                defaultChecked
              />
              <span className="ml-2">1:1 면접</span>
            </label>
            <div className="block">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="panel"
                  className="w-4 h-4 text-blue-600"
                  {...register("interviewStructure")}
                />
                <span className="ml-2">지원자 1명, 면접관 다수</span>
              </label>
            </div>
            <div className="block">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="group"
                  className="w-4 h-4 text-blue-600"
                  {...register("interviewStructure")}
                />
                <span className="ml-2">그룹면접</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            면접 후기 <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md min-h-[100px]"
            placeholder="면접 과정과 느낀 점을 자유롭게 작성해주세요. (최소 20자 이상)"
            {...register("interviewDetails")}
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            면접 진행 방식, 분위기, 질문 등을 상세하게 작성해주시면 다른 구직자에게 큰 도움이 됩니다.
          </p>
          {errors.interviewDetails && (
            <p className="text-red-500 text-xs mt-1">{errors.interviewDetails.message as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}
