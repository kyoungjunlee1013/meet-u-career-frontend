"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"

export const ResumeEditor = () => {
  const [resumeText, setResumeText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAIFeedback = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-white border rounded-md p-6">
      <h2 className="text-lg font-medium mb-4">자원 투기</h2>
      <div className="flex gap-6">
        <div className="flex-1">
          <textarea
            className="w-full h-44 p-4 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="내용을 입력하세요..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          ></textarea>
          <div className="text-right mt-2">
            <span className="text-xs text-gray-500">0/4000자</span>
          </div>
        </div>
        <div className="w-96 bg-gray-50 rounded-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium">AI 코칭 피드백</h3>
            <button
              className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-md flex items-center gap-1 hover:bg-gray-300"
              onClick={handleAIFeedback}
              disabled={isLoading}
            >
              <Sparkles className="h-3 w-3" />
              <span>AI 코칭 받기</span>
            </button>
          </div>
          <div className="h-36 flex items-center justify-center text-center">
            {isLoading ? (
              <div className="text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500 mx-auto mb-2"></div>
                <p className="text-sm">AI 피드백을 생성 중입니다...</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">내용을 입력하고 AI 코칭을 요청하면 피드백을 받을 수 있습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
