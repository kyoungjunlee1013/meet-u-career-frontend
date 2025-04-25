"use client";

import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function StepTwo() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedImpression = watch("overallImpression");

  return (
    <div className="flex flex-col h-full w-full max-w-3xl sm:max-w-4xl overflow-visible px-4 sm:px-6 md:px-8 py-5 items-center">

      <div className="w-full space-y-4">
        {/* 전반적인 평가 */}
        <div>
          <label className="block mb-4 text-sl font-medium">
            전반적인 평가 <span className="text-red-500">*</span>
          </label>
          <div className="flex justify-between items-center max-w-md">
            {/* 긍정적 */}
            <label className="flex flex-col items-center cursor-pointer group">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center mb-2
                ${selectedImpression === "positive" ? "bg-green-300" : "bg-green-100"}
                group-hover:bg-green-200
                transition-colors
              `}>
                <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 13C8.5 14.5 10 16 12 16C14 16 15.5 14.5 16 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
                  <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <input type="radio" value="positive" className="sr-only" {...register("overallImpression")} defaultChecked />
              <span className="text-sm">긍정적</span>
            </label>

            {/* 보통 */}
            <label className="flex flex-col items-center cursor-pointer group">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center mb-2
                ${selectedImpression === "neutral" ? "bg-yellow-300" : "bg-yellow-100"}
                group-hover:bg-yellow-200
                transition-colors
              `}>
                <svg className="w-10 h-10 text-yellow-500" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
                  <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <input type="radio" value="neutral" className="sr-only" {...register("overallImpression")} />
              <span className="text-sm">보통</span>
            </label>

            {/* 부정적 */}
            <label className="flex flex-col items-center cursor-pointer group">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center mb-2
                ${selectedImpression === "negative" ? "bg-red-300" : "bg-red-100"}
                group-hover:bg-red-200
                transition-colors
              `}>
                <svg className="w-10 h-10 text-red-500" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 15C8.5 13.5 10 12 12 12C14 12 15.5 13.5 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
                  <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <input type="radio" value="negative" className="sr-only" {...register("overallImpression")} />
              <span className="text-sm">부정적</span>
            </label>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4"></div>

        {/* 난이도 선택 */}
        <div>
          <label className="block mb-2 text-sl font-medium">
            난이도 <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-6">
            <label className="inline-flex items-center">
              <input type="radio" value="easy" className="w-4 h-4 text-blue-600" {...register("difficulty")} />
              <span className="ml-2">쉬움</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" value="moderate" className="w-4 h-4 text-blue-600" {...register("difficulty")} defaultChecked />
              <span className="ml-2">보통</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" value="difficult" className="w-4 h-4 text-blue-600" {...register("difficulty")} />
              <span className="ml-2">어려움</span>
            </label>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4"></div>

        {/* 면접 및 전형 유형 (복수선택) */}
        <div>
          <label className="block mb-2 text-sl font-medium">
            면접 및 전형유형(복수 선택 가능) <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["직무/인성면접", "PT면접", "토론면접", "인적성 검사", "실무 과제 및 시험", "기타"].map((type) => (
              <label key={type} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={type}
                  className="w-4 h-4 text-blue-600 rounded"
                  {...register("interviewFormats")}
                />
                <span className="ml-2">{type}</span>
              </label>
            ))}
          </div>
          {errors.interviewFormats && (
            <p className="text-red-500 text-xs mt-1">{errors.interviewFormats.message as string}</p>
          )}
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4"></div>

        {/* 면접 인원 */}
        <div>
          <label className="block mb-2 text-sl font-medium">
            면접 인원 <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-6">
            <label className="inline-flex items-center">
              <input type="radio" value="oneOnOne" className="w-4 h-4 text-blue-600" {...register("interviewStructure")} defaultChecked />
              <span className="ml-2">1:1 면접</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" value="panel" className="w-4 h-4 text-blue-600" {...register("interviewStructure")} />
              <span className="ml-2">지원자 1명, 면접관 다수</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" value="group" className="w-4 h-4 text-blue-600" {...register("interviewStructure")} />
              <span className="ml-2">그룹면접</span>
            </label>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4"></div>

        {/* 면접 후기 입력 */}
        <div>
          <label className="block mb-2 text-sl font-medium">
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
  );
}
