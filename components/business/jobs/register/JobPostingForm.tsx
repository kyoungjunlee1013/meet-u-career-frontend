"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { jobPostingSchema, type JobPostingFormData } from "./schema"
import { BasicInfoCard } from "./BasicInfoCard"
import { TalentRequirementsCard } from "./TalentRequirementsCard"
import { ApplicationMethodCard } from "./ApplicationMethodCard"
import { JobDescriptionCard } from "./JobDescriptionCard"
import { TemplateSelectionCard } from "./TemplateSelectionCard"
import { JobPostingPreview } from "./JobPostingPreview"
import { registerJobPosting } from "./actions"

export function JobPostingForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const methods = useForm<JobPostingFormData>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: "",
      jobCategoryId: "",
      employmentType: "FULL_TIME",
      workType: "OFFICE",
      location: "",
      salary: "",
      careerLevel: "ANY",
      educationLevel: "ANY",
      requiredSkills: [],
      openingDate: new Date().toISOString().split("T")[0],
      closingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      applicationMethod: "EMAIL",
      contactEmail: "",
      description: {
        duties: "",
        requirements: "",
        preferences: "",
        benefits: "",
      },
      templateType: 0,
    },
  })

  const { handleSubmit, watch, formState } = methods
  const formValues = watch()

  const onSubmit = async (data: JobPostingFormData, status: 0 | 1) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await registerJobPosting({
        ...data,
        status,
      })

      if (result.success) {
        router.push("/business/jobs")
      } else {
        setSubmitError(result.message || "공고 등록에 실패했습니다.")
      }
    } catch (error) {
      setSubmitError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-8/12 space-y-6">
            <BasicInfoCard />
            <TalentRequirementsCard />
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
                type="button"
                className="px-6 py-2 bg-blue-600 border border-transparent rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSubmit((data) => onSubmit(data, 0))}
                disabled={isSubmitting || !formState.isValid}
              >
                {isSubmitting ? "등록 중..." : "공고 등록하기"}
              </button>
            </div>
          </div>

          <div className="w-full lg:w-4/12 sticky top-4 self-start">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">미리보기</h3>
              </div>
              <div className="p-4">
                <JobPostingPreview formData={formValues} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
