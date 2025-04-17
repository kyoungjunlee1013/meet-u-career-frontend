"use client"

import type React from "react"

import type { UseFormRegister } from "react-hook-form"
import { ChevronRight } from "lucide-react"

interface ConsentItemsProps {
  allConsent: boolean
  handleAllConsentChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  register: UseFormRegister<any>
}

export const ConsentItems = ({ allConsent, handleAllConsentChange, register }: ConsentItemsProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="allConsent"
          checked={allConsent}
          onChange={handleAllConsentChange}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor="allConsent" className="ml-2 text-sm font-medium">
          전체 동의
        </label>
      </div>

      <p className="text-xs text-gray-600 ml-6">
        위치기반 서비스 이용약관(선택), 마케팅 정보 수신 동의(이메일,SMS/MMS)(선택) 동의를 포함합니다.
      </p>

      <div className="border-t pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="serviceConsent"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              {...register("serviceConsent")}
            />
            <label htmlFor="serviceConsent" className="ml-2 text-sm">
              (필수) 개인회원 약관에 동의
            </label>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="marketingEmailConsent"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              {...register("marketingEmailConsent")}
            />
            <label htmlFor="marketingEmailConsent" className="ml-2 text-sm">
              (필수) 개인정보 수집 및 이용에 동의
            </label>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacyConsent"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              {...register("privacyConsent")}
            />
            <label htmlFor="privacyConsent" className="ml-2 text-sm">
              (선택) 위치기반서비스 이용약관에 동의
            </label>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="marketingSmsConsent"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              {...register("marketingSmsConsent")}
            />
            <label htmlFor="marketingSmsConsent" className="ml-2 text-sm">
              (선택) 마케팅 정보 수신 동의 - 이메일
            </label>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="thirdPartyConsent"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              {...register("thirdPartyConsent")}
            />
            <label htmlFor="thirdPartyConsent" className="ml-2 text-sm">
              (선택) 마케팅 정보 수신 동의 - SMS/MMS
            </label>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
