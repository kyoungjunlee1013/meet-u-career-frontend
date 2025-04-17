"use client"

import { useFormContext } from "react-hook-form"
import { FormCard } from "./FormCard"
import { FormField } from "./FormField"

export function BasicInfoCard() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <FormCard title="기본 정보">
      <FormField label="공고 제목" name="title" required error={errors.title?.message as string}>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="공고 제목을 입력해주세요"
          {...register("title")}
        />
      </FormField>

      <FormField label="직무 카테고리" name="jobCategoryId" required error={errors.jobCategoryId?.message as string}>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("jobCategoryId")}
        >
          <option value="">직무 카테고리 선택</option>
          <option value="dev-backend">개발 - 백엔드</option>
          <option value="dev-frontend">개발 - 프론트엔드</option>
          <option value="dev-mobile">개발 - 모바일</option>
          <option value="dev-devops">개발 - DevOps</option>
          <option value="design-ui">디자인 - UI/UX</option>
          <option value="design-graphic">디자인 - 그래픽</option>
          <option value="marketing">마케팅</option>
          <option value="sales">영업</option>
          <option value="hr">인사</option>
          <option value="finance">재무/회계</option>
        </select>
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="고용 형태" name="employmentType" required error={errors.employmentType?.message as string}>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("employmentType")}
          >
            <option value="FULL_TIME">정규직</option>
            <option value="PART_TIME">계약직</option>
            <option value="CONTRACT">파견직</option>
            <option value="INTERNSHIP">인턴</option>
            <option value="FREELANCE">프리랜서</option>
          </select>
        </FormField>

        <FormField label="근무 형태" name="workType" required error={errors.workType?.message as string}>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("workType")}
          >
            <option value="OFFICE">상주</option>
            <option value="REMOTE">원격</option>
            <option value="HYBRID">하이브리드</option>
          </select>
        </FormField>
      </div>

      <FormField label="근무지" name="location" required error={errors.location?.message as string}>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="근무지를 입력해주세요 (예: 서울시 강남구)"
          {...register("location")}
        />
      </FormField>

      <FormField label="급여" name="salary" required error={errors.salary?.message as string}>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="급여를 입력해주세요 (예: 3,000만원 이상 / 회사 내규에 따름)"
          {...register("salary")}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="공고 시작일" name="openingDate" required error={errors.openingDate?.message as string}>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("openingDate")}
          />
        </FormField>

        <FormField label="공고 마감일" name="closingDate" required error={errors.closingDate?.message as string}>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("closingDate")}
          />
        </FormField>
      </div>
    </FormCard>
  )
}
