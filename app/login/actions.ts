"use server"

import { z } from "zod"

const loginSchema = z.object({
  userId: z.string().min(1, "아이디를 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
  rememberMe: z.boolean().optional(),
})

const businessLoginSchema = z.object({
  companyId: z.string().min(1, "기업 아이디를 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
  rememberMe: z.boolean().optional(),
})

export async function loginUser(formData: FormData) {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const rawData = {
    userId: formData.get("userId"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === "on",
  }

  try {
    const validatedData = loginSchema.parse(rawData)

    // Here you would normally authenticate the user
    // For demo purposes, we'll just return success
    return { success: true, message: "로그인 성공" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.reduce(
          (acc, curr) => {
            if (curr.path[0]) {
              acc[curr.path[0]] = curr.message
            }
            return acc
          },
          {} as Record<string, string>,
        ),
      }
    }

    return { success: false, message: "로그인 중 오류가 발생했습니다" }
  }
}

export async function loginBusiness(formData: FormData) {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const rawData = {
    companyId: formData.get("companyId"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === "on",
  }

  try {
    const validatedData = businessLoginSchema.parse(rawData)

    // Here you would normally authenticate the business
    // For demo purposes, we'll just return success
    return { success: true, message: "기업 로그인 성공" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.reduce(
          (acc, curr) => {
            if (curr.path[0]) {
              acc[curr.path[0]] = curr.message
            }
            return acc
          },
          {} as Record<string, string>,
        ),
      }
    }

    return { success: false, message: "로그인 중 오류가 발생했습니다" }
  }
}
