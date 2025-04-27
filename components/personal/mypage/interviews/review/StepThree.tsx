"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { X, Plus } from "lucide-react";

export function StepThree() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "interviewQuestions",
  });

  return (
    <div className="flex flex-col h-full w-full max-w-3xl sm:max-w-4xl overflow-visible px-4 sm:px-6 md:px-8 py-6 items-center">

      <div className="w-full space-y-4">

      {/* 면접 질문과 팁 안내 */}
      <div>


        {/* 받았던 질문 (체크박스) */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sl font-medium text-gray-700">
              받았던 질문 <span className="text-red-500">*</span>
            </label>

            <button
              type="button"
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
              onClick={() => append("")}
            >
              <Plus className="w-4 h-4 mr-1" />
              질문 추가
            </button>
          </div>

          {/* 기본 제공 질문 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded"
                value="자기소개를 해주세요."
                {...register("interviewStatus")}
              />
              <span className="ml-2">자기소개를 해주세요.</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded"
                value="지원 동기가 무엇인가요?"
                {...register("interviewStatus")}
              />
              <span className="ml-2">지원 동기가 무엇인가요?</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded"
                value="이전 프로젝트에서의 경험을 설명해주세요."
                {...register("interviewStatus")}
              />
              <span className="ml-2">이전 프로젝트에서의 경험을 설명해주세요.</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded"
                value="본인의 강점과 약점은 무엇인가요?"
                {...register("interviewStatus")}
              />
              <span className="ml-2">본인의 강점과 약점은 무엇인가요?</span>
            </label>
          </div>

          {/* 질문 추가 입력창 (optional) */}
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`추가 질문 ${index + 1}`}
                  {...register(`interviewQuestions.${index}` as const)}
                />
                <button
                  type="button"
                  className="ml-2 text-gray-400 hover:text-red-500"
                  onClick={() => remove(index)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {errors.interviewStatus && (
            <p className="text-red-500 text-xs mt-1">{errors.interviewStatus.message as string}</p>
          )}
        </div>
      </div>
      <div className="border-b border-gray-200 pb-4 mb-4"></div>



      {/* 면접 팁 작성 */}
      <div>
        <label htmlFor="interviewTip" className="block text-sl font-medium text-gray-700 mb-1">
          면접 팁
        </label>
        <textarea
          id="interviewTip"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="면접 준비를 위한 팁이나 조언을 작성해주세요."
          {...register("interviewTip")}
        />
      </div>

      <div className="border-b border-gray-200 pb-4 mb-4"></div>

      {/* 합격 여부 선택 */}
      <div>
        <label className="block text-sl font-medium text-gray-700 mb-3">
          합격 여부 <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6">
          <label className="inline-flex items-center">
            <input type="radio" className="w-4 h-4 text-green-600" value="accepted" {...register("result")} />
            <span className="ml-2">합격</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="w-4 h-4 text-yellow-600" value="waiting" {...register("result")} />
            <span className="ml-2">대기중</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="w-4 h-4 text-red-600" value="rejected" {...register("result")} />
            <span className="ml-2">불합격</span>
          </label>
        </div>
        {errors.result && (
          <p className="text-red-500 text-xs mt-1">{errors.result.message as string}</p>
        )}
      </div>
    </div>
    </div>
  );
}
