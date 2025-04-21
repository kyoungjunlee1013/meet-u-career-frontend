"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Copy } from "lucide-react"
import { useState } from "react"

interface FindIdResultProps {
  id: string | null
  onReset: () => void
}

export default function FindIdResult({ id, onReset }: FindIdResultProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (id) {
      navigator.clipboard.writeText(id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">아이디 조회 결과</h2>
        <p className="text-gray-600 text-center">입력하신 정보와 일치하는 아이디를 찾았습니다.</p>
      </div>

      <div className="bg-gray-50 rounded-md p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">찾은 아이디</p>
            <p className="text-lg font-medium">{id}</p>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Copy ID to clipboard"
          >
            {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={() => (window.location.href = "/login")}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          로그인하러 가기
        </Button>

        <Button
          onClick={onReset}
          variant="outline"
          className="w-full py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          다른 아이디 찾기
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500 pt-2">
        <a href="/find-password" className="text-blue-600 hover:underline">
          비밀번호를 잊으셨나요?
        </a>
      </div>
    </div>
  )
}
