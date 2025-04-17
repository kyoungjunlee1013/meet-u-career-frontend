"use client"

import type { JobPostingFormData } from "./schema"

interface JobPostingPreviewProps {
  formData: JobPostingFormData
}

export function JobPostingPreview({ formData }: JobPostingPreviewProps) {
  const getEmploymentTypeText = (type: string) => {
    const types: Record<string, string> = {
      FULL_TIME: "정규직",
      PART_TIME: "계약직",
      CONTRACT: "파견직",
      INTERNSHIP: "인턴",
      FREELANCE: "프리랜서",
    }
    return types[type] || type
  }

  const getWorkTypeText = (type: string) => {
    const types: Record<string, string> = {
      OFFICE: "상주",
      REMOTE: "원격",
      HYBRID: "하이브리드",
    }
    return types[type] || type
  }

  const getCareerLevelText = (level: string) => {
    const levels: Record<string, string> = {
      ANY: "경력 무관",
      ENTRY: "신입",
      JUNIOR: "경력 1~3년",
      MID: "경력 4~7년",
      SENIOR: "경력 8년 이상",
      EXECUTIVE: "임원급",
    }
    return levels[level] || level
  }

  const getEducationLevelText = (level: string) => {
    const levels: Record<string, string> = {
      ANY: "학력 무관",
      HIGH_SCHOOL: "고졸 이상",
      ASSOCIATE: "전문학사 이상",
      BACHELOR: "학사 이상",
      MASTER: "석사 이상",
      DOCTORATE: "박사 이상",
    }
    return levels[level] || level
  }

  const getApplicationMethodText = (method: string) => {
    const methods: Record<string, string> = {
      EMAIL: "이메일 지원",
      WEBSITE: "웹사이트 지원",
      PHONE: "전화 지원",
    }
    return methods[method] || method
  }

  if (!formData.title) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>공고 정보를 입력하면 미리보기가 표시됩니다.</p>
      </div>
    )
  }

  return (
    <div className="text-sm">
      <h2 className="text-xl font-bold mb-4">{formData.title || "공고 제목"}</h2>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.employmentType && (
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
              {getEmploymentTypeText(formData.employmentType)}
            </span>
          )}
          {formData.workType && (
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
              {getWorkTypeText(formData.workType)}
            </span>
          )}
          {formData.location && (
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">{formData.location}</span>
          )}
        </div>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">경력:</span>{" "}
            {formData.careerLevel ? getCareerLevelText(formData.careerLevel) : "-"}
          </p>
          <p>
            <span className="font-medium">학력:</span>{" "}
            {formData.educationLevel ? getEducationLevelText(formData.educationLevel) : "-"}
          </p>
          <p>
            <span className="font-medium">급여:</span> {formData.salary || "-"}
          </p>
          <p>
            <span className="font-medium">마감일:</span> {formData.closingDate || "-"}
          </p>
        </div>
      </div>

      {formData.description?.duties && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">주요 업무</h3>
          <p className="text-gray-700 whitespace-pre-line">{formData.description.duties}</p>
        </div>
      )}

      {formData.description?.requirements && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">자격 요건</h3>
          <p className="text-gray-700 whitespace-pre-line">{formData.description.requirements}</p>
        </div>
      )}

      {formData.description?.preferences && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">우대 사항</h3>
          <p className="text-gray-700 whitespace-pre-line">{formData.description.preferences}</p>
        </div>
      )}

      {formData.description?.benefits && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">복리 후생</h3>
          <p className="text-gray-700 whitespace-pre-line">{formData.description.benefits}</p>
        </div>
      )}

      {formData.requiredSkills && formData.requiredSkills.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">필요 기술</h3>
          <div className="flex flex-wrap gap-1">
            {formData.requiredSkills.map((skill) => (
              <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-medium mb-2">지원 방법</h3>
        <p className="text-gray-700">
          {formData.applicationMethod ? getApplicationMethodText(formData.applicationMethod) : "-"}
          {formData.applicationMethod === "EMAIL" && formData.contactEmail && `: ${formData.contactEmail}`}
          {formData.applicationMethod === "WEBSITE" && formData.contactWebsite && `: ${formData.contactWebsite}`}
          {formData.applicationMethod === "PHONE" && formData.contactPhone && `: ${formData.contactPhone}`}
        </p>
      </div>
    </div>
  )
}
