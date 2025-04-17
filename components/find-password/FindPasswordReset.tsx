"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, Check, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface FindPasswordResetProps {
  userId: string
  onSubmit: () => void
  onBack: () => void
}

export const FindPasswordReset = ({ userId, onSubmit, onBack }: FindPasswordResetProps) => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {}

    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요"
    } else if (password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다"
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password)) {
      newErrors.password = "영문, 숫자, 특수문자를 모두 포함해야 합니다"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요"
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSuccess(true)

    // Redirect after success
    setTimeout(() => {
      onSubmit()
    }, 3000)
  }

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="bg-green-100 rounded-full p-3 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">비밀번호 변경 완료</h3>
          <p className="text-gray-600 mb-6">
            비밀번호가 성공적으로 변경되었습니다.
            <br />새 비밀번호로 로그인해주세요.
          </p>
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700">로그인 페이지로 이동</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-sm text-blue-800">
        <p>
          <span className="font-medium">{userId}</span> 계정의 새 비밀번호를 설정해주세요.
          <br />
          영문, 숫자, 특수문자를 포함한 8자 이상으로 설정하세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">새 비밀번호</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="새 비밀번호"
              className={errors.password ? "border-red-500 pr-10" : "pr-10"}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{errors.password}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
              className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{errors.confirmPassword}</span>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? "처리 중..." : "비밀번호 변경"}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full flex items-center justify-center text-gray-500"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          이전 단계로 돌아가기
        </Button>
      </form>
    </div>
  )
}

export default FindPasswordReset
