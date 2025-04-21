"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface FindPasswordFormProps {
  onSubmit: (email: string, userId: string, name: string) => void
  isLoading?: boolean
  error?: string
}

export const FindPasswordForm = ({ onSubmit, isLoading = false, error }: FindPasswordFormProps) => {
  const [userId, setUserId] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [errors, setErrors] = useState<{ userId?: string; email?: string; name?: string }>({})

  const validateForm = () => {
    const newErrors: { userId?: string; email?: string } = {}

    if (!userId.trim()) {
      newErrors.userId = "아이디를 입력해주세요"
    }

    if (!email.trim()) {
      newErrors.email = "이메일을 입력해주세요"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    onSubmit(email, userId, name)
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-sm text-blue-800">
        <p>가입 시 등록한 아이디와 이메일 주소를 입력하시면 비밀번호 재설정을 위한 인증 코드를 보내드립니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="userId">아이디</Label>
          <Input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디"
            className={errors.userId ? "border-red-500" : ""}
          />
          {errors.userId && (
            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.userId}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {error && (
          <div className="text-center text-red-600 mt-2">{error}</div>
        )}

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? "처리 중..." : "다음 단계로"}
        </Button>
      </form>

      <div className="flex justify-center gap-4 text-sm text-gray-500 pt-4 border-t">
        <Link href="/login" className="hover:text-blue-600">
          로그인
        </Link>
        <Link href="/find-id" className="hover:text-blue-600">
          아이디 찾기
        </Link>
        <Link href="/register" className="hover:text-blue-600">
          회원가입
        </Link>
      </div>
    </div>
  )
}
