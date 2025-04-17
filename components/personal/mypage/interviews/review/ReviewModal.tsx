"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { StepOne } from "./StepOne"
import { StepTwo } from "./StepTwo"
import { StepThree } from "./StepThree"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X } from "lucide-react"

// Combined schema for all steps
const reviewSchema = z.object({
  // Step 1
  company: z.string().min(1, "회사명을 입력해주세요"),
  interviewType: z.enum(["online", "offline"]),
  jobCategory: z.string().min(1, "직무 카테고리를 선택해주세요"),
  position: z.string().min(1, "지원 직무를 선택해주세요"),
  year: z.string().min(1, "면접 연도를 선택해주세요"),
  month: z.string().min(1, "면접 월을 선택해주세요"),

  // Step 2
  overallImpression: z.enum(["positive", "neutral", "negative"]),
  difficulty: z.enum(["easy", "moderate", "difficult"]),
  interviewFormats: z.array(z.string()).min(1, "하나 이상의 면접 형식을 선택해주세요"),
  interviewStructure: z.enum(["oneOnOne", "panel", "group"]),
  interviewDetails: z.string().min(10, "면접 후기는 최소 10자 이상 입력해주세요"),

  // Step 3
  interviewStatus: z.array(z.string()),
  interviewQuestions: z.array(z.string()).min(1, "하나 이상의 질문을 입력해주세요"),
  interviewTip: z.string().optional(),
  result: z.enum(["accepted", "waiting", "rejected"]),
})

type ReviewFormValues = z.infer<typeof reviewSchema>

interface ReviewModalProps {
  onClose: () => void
  interview: {
    id: number
    company: string
    position: string
    date?: string
    location?: string
    time?: string
    interviewer?: string
    status?: string
    hasReview?: boolean
  }
}

export function ReviewModal({ onClose, interview }: ReviewModalProps) {
  const [currentStep, setCurrentStep] = useState(1)

  const methods = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      company: interview.company,
      position: interview.position,
      interviewType: "offline",
      interviewFormats: [],
      interviewStatus: [],
      interviewQuestions: [""],
      overallImpression: "positive",
      difficulty: "moderate",
      interviewStructure: "oneOnOne",
      result: "waiting",
    },
    mode: "onChange",
  })

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (data: ReviewFormValues) => {
    try {
      // Here you would normally submit the data to your backend
      console.log("Form submitted with data:", data)

      // Close the modal after successful submission
      onClose()
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="닫기"
          >
            <X size={24} />
          </button>
          <h2 id="modal-title" className="text-xl font-bold text-center">
            면접후기 등록
          </h2>
          <p className="text-center text-gray-600 text-sm mt-1 mb-4">
            등록된 면접후기는 지원자 또는 기업담당 큐 도움이 됩니다. 작성해주신 면접후기는 익명으로 등록됩니다.
          </p>

          <div className="flex border-b mb-6">
            <div
              className={`flex-1 text-center py-3 relative ${currentStep === 1 ? "text-blue-600 font-medium" : "text-gray-500"}`}
            >
              <div className="relative z-10">1. 기본정보 입력</div>
              {currentStep === 1 && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>}
            </div>
            <div
              className={`flex-1 text-center py-3 relative ${currentStep === 2 ? "text-blue-600 font-medium" : "text-gray-500"}`}
            >
              <div className="relative z-10">2. 면접정보 입력</div>
              {currentStep === 2 && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>}
            </div>
            <div
              className={`flex-1 text-center py-3 relative ${currentStep === 3 ? "text-blue-600 font-medium" : "text-gray-500"}`}
            >
              <div className="relative z-10">3. 합격정보 입력</div>
              {currentStep === 3 && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>}
            </div>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              {currentStep === 1 && <StepOne />}
              {currentStep === 2 && <StepTwo />}
              {currentStep === 3 && <StepThree />}

              <div className="flex justify-between mt-6">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    이전 단계
                  </button>
                ) : (
                  <div></div> // Empty div to maintain spacing
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="px-5 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors"
                  >
                    다음 단계
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors"
                  >
                    등록하기
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
