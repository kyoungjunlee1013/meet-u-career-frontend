"use client"

import { useFormContext } from "react-hook-form"

export function StepOne() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            회사명 <span className="text-red-500">*</span>
          </label>
          <input
            id="company"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="회사명을 입력해주세요"
            {...register("company")}
          />
          {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            면접 방식 <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                value="offline"
                {...register("interviewType")}
              />
              <span className="ml-2">오프라인</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                value="online"
                {...register("interviewType")}
              />
              <span className="ml-2">온라인</span>
            </label>
          </div>
          {errors.interviewType && (
            <p className="mt-1 text-sm text-red-600">{errors.interviewType.message as string}</p>
          )}
        </div>

        <div>
          <label htmlFor="jobCategory" className="block text-sm font-medium text-gray-700 mb-1">
            직무 카테고리 <span className="text-red-500">*</span>
          </label>
          <select
            id="jobCategory"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register("jobCategory")}
          >
            <option value="">직무 카테고리를 선택해주세요</option>
            <option value="development">개발</option>
            <option value="design">디자인</option>
            <option value="marketing">마케팅</option>
            <option value="sales">영업</option>
            <option value="management">경영·비즈니스</option>
            <option value="finance">금융·투자</option>
            <option value="research">연구·R&D</option>
          </select>
          {errors.jobCategory && <p className="mt-1 text-sm text-red-600">{errors.jobCategory.message as string}</p>}
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
            지원 직무 <span className="text-red-500">*</span>
          </label>
          <input
            id="position"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="지원 직무를 입력해주세요"
            {...register("position")}
          />
          {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            면접 날짜 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...register("year")}
              >
                <option value="">연도</option>
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
              {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year.message as string}</p>}
            </div>
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...register("month")}
              >
                <option value="">월</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                ))}
              </select>
              {errors.month && <p className="mt-1 text-sm text-red-600">{errors.month.message as string}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
