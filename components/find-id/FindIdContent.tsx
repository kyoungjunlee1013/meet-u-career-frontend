"use client"

import { useState } from "react"
import FindIdForm from "./FindIdForm"
import FindIdSteps from "./FindIdSteps"
import { DynamicFindIdResult } from "@/utils/dynamic-imports"

export default function FindIdContent() {
  const [step, setStep] = useState<"form" | "result">("form")
  const [foundId, setFoundId] = useState<string | null>(null)

  const handleFindId = (email: string) => {
    // Simulate ID lookup - in a real app, this would be a server action
    setTimeout(() => {
      // Mock result - would come from the server in a real implementation
      setFoundId(`user_${email.split("@")[0]}`)
      setStep("result")
    }, 1000)
  }

  const handleReset = () => {
    setStep("form")
    setFoundId(null)
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your ID</h1>
          <p className="text-gray-600">Recover your account ID using your registered email</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <FindIdSteps currentStep={step} />

          {step === "form" ? (
            <FindIdForm onSubmit={handleFindId} />
          ) : (
            <DynamicFindIdResult id={foundId} onReset={handleReset} />
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">
            Need more help?{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              Contact Support
            </a>
          </p>
          <p>
            <a href="/login" className="text-blue-600 hover:underline">
              Return to Login
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
