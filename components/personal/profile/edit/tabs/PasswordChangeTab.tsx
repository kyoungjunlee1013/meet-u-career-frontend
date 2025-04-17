"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"

export const PasswordChangeTab = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">비밀번호 변경</h2>
      <p className="text-sm text-gray-500 mb-6">
        안전한 비밀번호를 사용하여 계정을 보호하세요. 비밀번호는 정기적으로 변경하는 것이 좋습니다.
      </p>

      <div className="space-y-4 mb-8">
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
            현재 비밀번호 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="current-password"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="현재 비밀번호를 입력하세요"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
            새 비밀번호 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="새 비밀번호를 입력하세요"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
            새 비밀번호 확인 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="새 비밀번호를 다시 입력하세요"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">비밀번호 요구사항:</h3>
        <ul className="text-xs text-blue-700 space-y-1 pl-5 list-disc">
          <li>8자 이상의 길이</li>
          <li>최소 1개의 대문자</li>
          <li>최소 1개의 소문자</li>
          <li>최소 1개의 숫자</li>
          <li>최소 1개의 특수문자</li>
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  )
}
