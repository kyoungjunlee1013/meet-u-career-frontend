"use client"

import { LoginHeader } from "@/components/login/LoginHeader"
import { FindPasswordSteps } from "./FindPasswordSteps"
import { FindPasswordForm } from "./FindPasswordForm"
import { useState } from "react"
import { DynamicFindPasswordVerification } from "@/utils/dynamic-imports"
import { DynamicFindPasswordReset } from "@/utils/dynamic-imports"

type Step = "form" | "verification" | "reset"

export const FindPasswordContent = () => {
  const [currentStep, setCurrentStep] = useState<Step>("form")
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("")
  const [verificationCode, setVerificationCode] = useState("")

  const handleFormSubmit = (submittedEmail: string, submittedUserId: string) => {
    setEmail(submittedEmail)
    setUserId(submittedUserId)
    setCurrentStep("verification")
  }

  const handleVerificationSubmit = (code: string) => {
    setVerificationCode(code)
    setCurrentStep("reset")
  }

  const handlePasswordReset = () => {
    // In a real app, this would submit the new password to the server
    // For now, we'll just reset the form
    setCurrentStep("form")
    setEmail("")
    setUserId("")
    setVerificationCode("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <LoginHeader />

      <main className="flex-1 flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-2xl font-bold text-center mb-6">비밀번호 찾기</h1>

          <FindPasswordSteps currentStep={currentStep} />

          {currentStep === "form" && <FindPasswordForm onSubmit={handleFormSubmit} />}

          {currentStep === "verification" && (
            <DynamicFindPasswordVerification
              email={email}
              onSubmit={handleVerificationSubmit}
              onBack={() => setCurrentStep("form")}
            />
          )}

          {currentStep === "reset" && (
            <DynamicFindPasswordReset
              userId={userId}
              onSubmit={handlePasswordReset}
              onBack={() => setCurrentStep("verification")}
            />
          )}
        </div>
      </main>
    </div>
  )
}
