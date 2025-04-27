"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { jobPostingSchema, JobPostingFormData } from "./schema"

import { BasicInfoCard } from "./BasicInfoCard"
import { TalentRequirementsCard } from "./TalentRequirementsCard"
import { ApplicationMethodCard } from "./ApplicationMethodCard"
import { JobDescriptionCard } from "./JobDescriptionCard"
import { TemplateSelectionCard } from "./TemplateSelectionCard"
import { registerJobPosting } from "./actions"
import { DeadlineCard } from "./DeadlineCard"
import { PreviewModal } from "./PreviewModal"

export function JobPostingForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const methods = useForm<JobPostingFormData>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: "",
      jobCategoryIds: [],
      jobUrl: "",
      industry: "",
      jobType: "",
      locationCode: "",
      salaryCode: undefined,
      experienceLevel: 0,
      educationLevel: 0,
      keyword: [],
      openingDate: new Date().toISOString().split("T")[0],
      expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      closeType: 0,
      templateType: 0,
      description: {
        duties: "",
        requirements: "",
        preferences: "",
        benefits: "",
      },
    },
  })

  const { handleSubmit, watch, formState } = methods
  const formValues = watch()

  const onSubmit = async (data: JobPostingFormData, status: 0 | 1) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // 키워드 배열 → 쉼표 문자열 변환
      const keywordString = data.keyword?.join(",") || ""
      // description 객체 → 단일 문자열로 변환
      const descriptionString = [
        data.description?.duties ? `주요 업무: ${data.description.duties}` : "",
        data.description?.requirements ? `자격 요건: ${data.description.requirements}` : "",
        data.description?.preferences ? `우대 사항: ${data.description.preferences}` : "",
        data.description?.benefits ? `복리 후생: ${data.description.benefits}` : "",
      ].filter(Boolean).join("\n\n")
      // 서버 전송용 DTO 타입 정의
      interface JobPostingSubmitData extends Omit<JobPostingFormData, "keyword" | "description"> {
        keyword: string;
        description: string;
        status: number;
      }
      // DTO에 맞게 데이터 변환 및 타입 지정
      const submitData: JobPostingSubmitData = {
        ...data,
        keyword: keywordString,
        description: descriptionString,
        status,
      }
      const result = await registerJobPosting(submitData)

      if (result.success) {
        router.push("/business/jobs")
      } else {
        setSubmitError(result.message || "등록에 실패했습니다.")
      }
    } catch (e) {
      setSubmitError("알 수 없는 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((data) => onSubmit(data, 0))}>
        <div className="max-w-4xl w-full mx-auto flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-6">
            <BasicInfoCard />
            <TalentRequirementsCard />
            <DeadlineCard />
            <ApplicationMethodCard />
            <JobDescriptionCard />
            <TemplateSelectionCard />

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{submitError}</div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => router.push("/business/jobs")}
              >
                취소
              </button>
              <button
                type="button"
                className="px-6 py-2 border border-blue-300 rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSubmit((data) => onSubmit(data, 1))}
                disabled={isSubmitting}
              >
                임시 저장
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 border border-transparent rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isSubmitting || !formState.isValid}
              >
                {isSubmitting ? "등록 중..." : "공고 등록하기"}
              </button>
              <button
                type="button"
                className="px-6 py-2 border border-green-500 text-green-700 bg-green-50 hover:bg-green-100 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => setPreviewOpen(true)}
              >
                미리보기
              </button>
            </div>
          </div>
        </div>
        <PreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} formData={formValues} />
      </form>
    </FormProvider>
  )
}
