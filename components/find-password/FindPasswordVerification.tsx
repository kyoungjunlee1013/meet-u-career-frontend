"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react"

interface FindPasswordVerificationProps {
  email: string
  onSubmit: (code: string) => void
  onBack: () => void
}

export const FindPasswordVerification = ({ email, onSubmit, onBack }: FindPasswordVerificationProps) => {
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleResendCode = async () => {
    setIsResending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setTimeLeft(300) // Reset timer
    setIsResending(false)
  }

  const validateForm = () => {
    if (!verificationCode.trim()) {
      setError("인증 코드를 입력해주세요")
      return false
    }

    if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
      setError("유효한 6자리 인증 코드를 입력해주세요")
      return false
    }

    setError(null)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    onSubmit(verificationCode)
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-sm text-blue-800">
        <p>
          <span className="font-medium">{email}</span>로 인증 코드를 발송했습니다.
          <br />
          이메일에 포함된 6자리 인증 코드를 입력해주세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="verificationCode">인증 코드</Label>
            <span className={`text-sm ${timeLeft > 60 ? "text-gray-500" : "text-red-500 font-medium"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <Input
            id="verificationCode"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
            placeholder="6자리 인증 코드"
            maxLength={6}
            className={error ? "border-red-500" : ""}
          />

          {error && (
            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {timeLeft <= 0 && (
            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
              <AlertCircle className="h-4 w-4" />
              <span>인증 시간이 만료되었습니다. 코드를 재발송해주세요.</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" className="flex-1" onClick={handleResendCode} disabled={isResending}>
            {isResending ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            코드 재발송
          </Button>

          <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={isLoading || timeLeft <= 0}>
            {isLoading ? "확인 중..." : "확인"}
          </Button>
        </div>

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

export default FindPasswordVerification
