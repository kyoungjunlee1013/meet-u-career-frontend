"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Info } from "lucide-react"
import { ConsentItems } from "./ConsentItems"
import { useRouter } from "next/navigation"

const registerSchema = z.object({
  userId: z.string()
    .min(4, "4~20자의 영문, 숫자, 특수문자 '_'사용가능")
    .max(20, "4~20자의 영문, 숫자, 특수문자 '_'사용가능")
    .regex(/^[a-zA-Z0-9_]+$/, "4~20자의 영문, 숫자, 특수문자 '_'사용가능"),
  password: z.string()
    .min(8, "8~16자리/영문 대소문자, 숫자, 특수문자 조합")
    .max(16, "8~16자리/영문 대소문자, 숫자, 특수문자 조합")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, "8~16자리/영문 대소문자, 숫자, 특수문자 조합"),
  phone: z.string()
    .min(10, "휴대폰 번호를 입력해주세요")
    .max(13, "휴대폰 번호는 13자 이하로 입력해주세요"),
  email: z.string().email("이메일 주소를 입력해주세요."),
  name: z.string().min(1, "이름을 입력해주세요"),
  birthday: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD 형식으로 입력해주세요"),
  allConsent: z.boolean(),
  serviceConsent: z.boolean(),
  marketingEmailConsent: z.boolean(),
  marketingSmsConsent: z.boolean(),
  privacyConsent: z.boolean(),
  thirdPartyConsent: z.boolean(),
}).strict()

type RegisterFormData = z.infer<typeof registerSchema>

export const RegisterForm = () => {
  const router = useRouter();
  const [userIdMsg, setUserIdMsg] = useState<string | null>(null)

  const {
    register,
    watch,
    setValue,
    setFocus,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // 입력할 때마다 validation
    defaultValues: {
      userId: "",
      password: "",
      email: "",
      name: "",
      birthday: "",
      allConsent: false,
      serviceConsent: false,
      marketingEmailConsent: false,
      marketingSmsConsent: false,
      privacyConsent: false,
      thirdPartyConsent: false,
    },
  })

  const userIdRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const birthdayRef = useRef<HTMLInputElement>(null)

  const userId = watch("userId")
  const allConsent = watch("allConsent")

  useEffect(() => {
    const checkUserId = async () => {
      if (!userId || userId.length < 4) {
        setUserIdMsg(null)
        return
      }
      try {
        const response = await axios.post("/api/personal/account/check/userid", null, {
          params: { userId },
        })
        setUserIdMsg(response.data.msg)
      } catch (error) {
        console.error("아이디 중복 체크 실패", error)
        setUserIdMsg("아이디 중복 체크 실패")
      }
    }

    const timer = setTimeout(() => {
      checkUserId()
    }, 100)

    return () => clearTimeout(timer)
  }, [userId])

  // 휴대폰 번호 자동 변환 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "") // 숫자만 남기기

    if (value.length < 4) {
      // 3자리 이하
      setValue("phone", value)
    } else if (value.length < 8) {
      // 3~7자리
      setValue("phone", value.slice(0, 3) + "-" + value.slice(3))
    } else {
      // 8자리 이상
      setValue("phone", value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11))
    }
  }

  // 생년월일 자동 변환 핸들러
  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "") // 숫자만 남김

    if (value.length >= 5) {
      value = value.slice(0, 4) + "-" + value.slice(4)
    }
    if (value.length >= 8) {
      value = value.slice(0, 7) + "-" + value.slice(7, 9)
    }
    setValue("birthday", value)
  }

  // 전체 체크
  const handleAllConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setValue("allConsent", checked)
    setValue("serviceConsent", checked)
    setValue("marketingEmailConsent", checked)
    setValue("privacyConsent", checked)
    setValue("marketingSmsConsent", checked)
    setValue("thirdPartyConsent", checked)
  }

  // 개별 체크박스 클릭 시 전체 체크 여부 갱신
  const handleIndividualConsentChange = () => {
    const service = getValues("serviceConsent")
    const marketingEmail = getValues("marketingEmailConsent")
    const privacy = getValues("privacyConsent")
    const marketingSms = getValues("marketingSmsConsent")
    const thirdParty = getValues("thirdPartyConsent")

    if (service && marketingEmail && privacy && marketingSms && thirdParty) {
      setValue("allConsent", true)
    } else {
      setValue("allConsent", false)
    }
  }

  const handleRegister = async () => {
    const isValid = await trigger()

    if (!isValid) {
      if (errors.userId) {
        userIdRef.current?.focus()
        alert("아이디를 확인해 주세요.")
      } else if (errors.password) {
        passwordRef.current?.focus()
        alert("비밀번호를 확인해 주세요.")
      } else if (errors.name) {
        nameRef.current?.focus()
        alert("이름을 확인해 주세요.")
      } else if (errors.email) {
        emailRef.current?.focus()
        alert("이메일을 확인해 주세요.")
      } else if (errors.birthday) {
        birthdayRef.current?.focus()
        alert("생년월일을 확인해 주세요.")
      }
      return
    }

    // 아이디 중복 여부 검사 추가
    if (userIdMsg && userIdMsg.includes("이미 존재")) {
      alert("이미 존재하는 아이디입니다. 다른 아이디를 입력해 주세요.")
      userIdRef.current?.focus()
      return
    }

    // 필수 약관(service, marketingEmail) 동의 확인
    const isRequiredTermsAgreed = getValues("serviceConsent") && getValues("marketingEmailConsent")
    if (!isRequiredTermsAgreed) {
      alert("필수 약관에 모두 동의해야 회원가입할 수 있습니다.")
      return
    }

    try {
      const response = await axios.post("/api/personal/account/signup", getValues())
      alert("회원가입이 완료되었습니다.")
      console.log("response", response.data)

      // 메인 페이지로 이동
      router.push("/");
    } catch (error) {
      alert("회원가입에 실패했습니다.")
      console.error(error)
    }
  }

  return (
    <div className="max-w-[600px] mx-auto px-4 py-8">
      <h1 className="text-center text-xl font-medium mb-8">사람인 통합 개인회원 가입</h1>

      <div className="space-y-6">
        {/* 아이디 */}
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
          <input
            type="text"
            id="userId"
            placeholder="4~20자의 영문, 숫자, 특수문자 '_'사용가능"
            className={`w-full px-3 py-2.5 border ${errors.userId ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            autoComplete="off"
            {...register("userId")}
          />
          {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>}
          {userIdMsg && (
            <p className={`text-xs mt-1 ${userIdMsg.includes("이미 존재") ? "text-red-500" : "text-blue-600"}`}>
              {userIdMsg}
            </p>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
            className={`w-full px-3 py-2.5 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            autoComplete="off"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* 이름, 전화번호, 이메일, 생년월일 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <input
            type="text"
            id="name"
            placeholder="이름"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md"
            autoComplete="off"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">휴대폰 번호</label>
          <input
            type="text"
            id="phone"
            placeholder="휴대폰 번호 입력 (010-xxxx-xxxx)"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md"
            autoComplete="off"
            {...register("phone")}
            onChange={handlePhoneChange}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일 주소를 입력해 주세요"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md"
            autoComplete="off"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
          <input
            type="text"
            id="birthday"
            placeholder="YYYY-MM-DD"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md"
            autoComplete="off"
            {...register("birthday")}
            onChange={handleBirthdayChange}
          />
          {errors.birthday && <p className="text-red-500 text-xs mt-1">{errors.birthday.message}</p>}
        </div>

        {/* Info Notice */}
        <div className="flex items-start text-xs text-gray-500">
          <Info className="h-4 w-4 text-gray-400 mr-1 flex-shrink-0 mt-0.5" />
          <p>취업에 관련된 정보를 빠르게 받고 싶으세요</p>
        </div>

        {/* 약관 동의 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">약관</h3>
          <div className="border rounded-md p-4">
            <ConsentItems
              allConsent={allConsent}
              handleAllConsentChange={handleAllConsentChange}
              register={register}
              handleIndividualConsentChange={handleIndividualConsentChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleRegister}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          회원가입
        </button>
      </div>
    </div>
  )
}
