"use server"

import { z } from "zod"

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password too short"),
    rememberMe: z.string().optional(),
})

export type LoginState = {
    success: boolean
    errors: {
        email?: string[]
        password?: string[]
    }
}

export const initialState: LoginState = {
    success: false,
    errors: {},
}

// useFormState가 기대하는 형태로 감싸기
export async function loginAdminAction(
    _: LoginState,
    formData: FormData
): Promise<LoginState> {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const parsed = loginSchema.safeParse({ email, password })

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        }
    }

    await new Promise((r) => setTimeout(r, 500)) // 시뮬레이션

    return { success: true, errors: {} }
}
