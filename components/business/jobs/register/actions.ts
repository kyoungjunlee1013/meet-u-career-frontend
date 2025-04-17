"use server"

import { z } from "zod"
import { jobPostingSchema } from "./schema"

type JobPostingSubmitData = z.infer<typeof jobPostingSchema> & {
  status: 0 | 1
}

export async function registerJobPosting(data: JobPostingSubmitData) {
  try {
    // Validate the data
    jobPostingSchema.parse(data)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real application, you would make an API call here
    // const response = await fetch('/api/company/job-postings', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })

    // if (!response.ok) {
    //   throw new Error('Failed to register job posting')
    // }

    // const result = await response.json()

    return {
      success: true,
      message: "공고가 성공적으로 등록되었습니다.",
      data: { id: "job-" + Date.now() },
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "입력 데이터가 유효하지 않습니다.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "공고 등록에 실패했습니다.",
    }
  }
}
