"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Info } from "lucide-react"
import { ConsentItems } from "./ConsentItems"

const registerSchema = z.object({
  userId: z
    .string()
    .min(4, "4~20자의 영문, 숫자, 특수문자 '_'사용가능")
    .max(20, "4~20자의 영문, 숫자, 특수문자 '_'사용가능")
    .regex(/^[a-zA-Z0-9_]+$/, "4~20자의 영문, 숫자, 특수문자 '_'사용가능"),
  password: z
    .string()
    .min(8, "8~16자리/영문 대소문자, 숫자, 특수문자 조합")
    .max(16, "8~16자리/영문 대소문자, 숫자, 특수문자 조합")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "8~16자리/영문 대소문자, 숫자, 특수문자 조합",
    ),
  email: z.string().email("이메일 주소를 입력해주세요."),
  name: z.string().min(1, "이름을 입력해주세요"),
  birthdate: z
    .string()
    .min(1, "생년월일을 입력해주세요")
    .regex(/^\d{8}$/, "YYYYMMDD 형식으로 입력해주세요"),
  allConsent: z.boolean().optional(),
  serviceConsent: z.boolean().default(false),
  marketingEmailConsent: z.boolean().default(false),
  marketingSmsConsent: z.boolean().default(false),
  privacyConsent: z.boolean().default(false),
  thirdPartyConsent: z.boolean().default(false),
})

type RegisterFormData = z.infer<typeof registerSchema>

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      allConsent: false,
      serviceConsent: false,
      marketingEmailConsent: false,
      marketingSmsConsent: false,
      privacyConsent: false,
      thirdPartyConsent: false,
    },
  })

  const allConsent = watch("allConsent")

  const handleAllConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setValue("allConsent", checked)
    setValue("serviceConsent", checked)
    setValue("marketingEmailConsent", checked)
    setValue("marketingSmsConsent", checked)
    setValue("privacyConsent", checked)
    setValue("thirdPartyConsent", checked)
  }

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data)
    // Here you would normally submit the form data to your API
    // For demo purposes, we'll just log it to the console
    alert("회원가입이 완료되었습니다.")
  }

  return (
    <div className="max-w-[600px] mx-auto px-4 py-8">
      <h1 className="text-center text-xl font-medium mb-8">사람인 통합 개인회원 가입</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ID Field */}
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            아이디
          </label>
          <input
            type="text"
            id="userId"
            placeholder="4~20자의 영문, 숫자, 특수문자 '_'사용가능"
            className={`w-full px-3 py-2.5 border ${
              errors.userId ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            {...register("userId")}
          />
          {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
            className={`w-full px-3 py-2.5 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          <p className="text-xs text-gray-500 mt-1">
            8~16자리 영문 대소문자, 숫자, 특수문자 중 3가지 이상 조합으로 만들어주세요.
          </p>
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            이름
          </label>
          <input
            type="text"
            id="name"
            placeholder="이름 입력"
            className={`w-full px-3 py-2.5 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            이메일
          </label>
          <input
            type="email"
            id="email"
            placeholder="email@saramin.co.kr"
            className={`w-full px-3 py-2.5 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Birthdate Field */}
        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
            생년월일
          </label>
          <input
            type="text"
            id="birthdate"
            placeholder="YYYYMMDD"
            className={`w-full px-3 py-2.5 border ${
              errors.birthdate ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            {...register("birthdate")}
          />
          {errors.birthdate && <p className="text-red-500 text-xs mt-1">{errors.birthdate.message}</p>}
        </div>

        {/* Information Notice */}
        <div className="flex items-start text-xs text-gray-500">
          <Info className="h-4 w-4 text-gray-400 mr-1 flex-shrink-0 mt-0.5" />
          <p>취업에 관련된 정보를 빠르게 받고 싶으세요</p>
        </div>

        {/* Consent Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">약관</h3>
          <div className="border rounded-md p-4">
            <ConsentItems allConsent={allConsent} handleAllConsentChange={handleAllConsentChange} register={register} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "인증요청"
          )}
        </button>
      </form>
    </div>
  )
}
