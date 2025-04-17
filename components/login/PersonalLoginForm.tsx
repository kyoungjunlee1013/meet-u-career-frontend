"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useActionState } from "react"
import { loginUser } from "@/app/login/actions"

export const PersonalLoginForm = () => {
  const [state, formAction, isPending] = useActionState(loginUser, {
    success: false,
    errors: {},
  })
  const [rememberMe, setRememberMe] = useState(false)

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked)
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <input
          type="text"
          name="userId"
          placeholder="아이디"
          className={`w-full px-3 py-2.5 border ${
            state?.errors?.userId ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {state?.errors?.userId && <p className="text-red-500 text-xs mt-1">{state.errors.userId}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          className={`w-full px-3 py-2.5 border ${
            state?.errors?.password ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {state?.errors?.password && <p className="text-red-500 text-xs mt-1">{state.errors.password}</p>}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={rememberMe}
          onChange={handleRememberMeChange}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor="rememberMe" className="ml-2 text-xs text-gray-600">
          로그인 유지
        </label>
        <div className="ml-auto flex gap-2 text-xs text-gray-500">
          <Link href="/find-id" className="hover:underline">
            아이디 찾기
          </Link>
          <span>|</span>
          <Link href="/find-password" className="hover:underline">
            비밀번호 찾기
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        {isPending ? (
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "로그인"
        )}
      </button>

      {state?.success && <p className="text-green-600 text-sm text-center">{state.message}</p>}
      {state?.message && !state.success && <p className="text-red-600 text-sm text-center">{state.message}</p>}
    </form>
  )
}
