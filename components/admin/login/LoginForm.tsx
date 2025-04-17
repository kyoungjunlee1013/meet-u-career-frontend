"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { loginAdminAction } from "@/app/admin/login/actions"
import { Loader2 } from "lucide-react"

interface LoginState {
  success: boolean
  errors: {
    email?: string[]
    password?: string[]
  }
}

const initialState: LoginState = {
  success: false,
  errors: {},
}

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [state, formAction] = useFormState(loginAdminAction, initialState)

  return (
    <form action={formAction} className="space-y-6">
      {/* 이메일 */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          aria-invalid={!!state.errors.email}
          aria-describedby={state.errors.email ? "email-error" : undefined}
        />
        {state.errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {state.errors.email.join(", ")}
          </p>
        )}
      </div>

      {/* 비밀번호 */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          aria-invalid={!!state.errors.password}
          aria-describedby={state.errors.password ? "password-error" : undefined}
        />
        {state.errors.password && (
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {state.errors.password.join(", ")}
          </p>
        )}
      </div>

      {/* 체크박스 */}
      <div className="flex items-center">
        <input
          id="rememberMe"
          name="rememberMe"
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
          아이디 저장
        </label>
      </div>

      {/* 제출 버튼 */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a2233] hover:bg-[#2a3243] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              로그인 중...
            </>
          ) : (
            "로그인"
          )}
        </button>
      </div>
    </form>
  )
}
