"use server"

import { z } from "zod"

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

export type ReviewFormValues = z.infer<typeof reviewSchema>

export async function submitReview(formData: ReviewFormValues) {
  // Validate the form data
  const validatedData = reviewSchema.parse(formData)

  // In a real application, you would save this data to your database
  console.log("Submitted review:", validatedData)

  // Simulate a server delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return success response
  return { success: true, message: "면접 후기가 성공적으로 등록되었습니다." }
}
