"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { companyProfileSchema, type CompanyProfileFormData } from "./schema"
import { FormField } from "./FormField"
import { FormSection } from "./FormSection"
import { LogoUpload } from "./LogoUpload"
import { updateCompanyProfile } from "@/app/business/profile/actions"
import { Building, MapPin, Phone, Mail, Globe, Calendar, Users, Briefcase, FileText } from "lucide-react"

export const ProfileForm = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyProfileFormData>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      companyName: "(주)서울인",
      ceoName: "김대표",
      businessNumber: "123-45-67890",
      address: "서울 구로구 디지털로 34길 43",
      detailAddress: "디지털타워 5층",
      phone: "02-1234-5678",
      email: "contact@seoulin.com",
      website: "https://www.seoulin.com",
      establishmentDate: "2004-07-15",
      companySize: "500명+",
      industry: "IT/인터넷/서비스",
      introduction:
        "서울인은 IT 서비스 전문 기업으로, 다양한 디지털 솔루션을 제공합니다. 우리는 혁신적인 기술과 창의적인 아이디어로 고객의 비즈니스 성장을 지원합니다.",
    },
  })

  const handleLogoChange = (file: File | null) => {
    setLogoFile(file)
  }

  const onSubmit = async (data: CompanyProfileFormData) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: null })

    // In a real application, you would handle the logo file upload here
    // For example, upload to a storage service and get a URL
    const formData = new FormData()
    if (logoFile) {
      formData.append("logo", logoFile)
    }

    // Add all form data to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== "logo") {
        formData.append(key, value as string)
      }
    })

    try {
      const result = await updateCompanyProfile(data)

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "기업 정보가 성공적으로 업데이트되었습니다.",
        })
        // Optionally redirect after a delay
        // setTimeout(() => router.push("/business/dashboard"), 2000)
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "기업 정보 업데이트에 실패했습니다.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {submitStatus.type && (
        <div
          className={`mb-6 p-4 rounded-md ${
            submitStatus.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
          role="alert"
        >
          {submitStatus.message}
        </div>
      )}

      <FormSection title="기본 정보" description="회사의 기본 정보를 입력해주세요.">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 flex justify-center">
            <LogoUpload onLogoChange={handleLogoChange} />
          </div>

          <div className="md:w-3/4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-400 mr-2" />
                  <FormField
                    label="회사명"
                    name="companyName"
                    register={register}
                    error={errors.companyName}
                    required
                  />
                </div>

                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                  <FormField label="업종" name="industry" register={register} error={errors.industry} required />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  <FormField label="대표자명" name="ceoName" register={register} error={errors.ceoName} required />
                </div>

                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-2" />
                  <FormField
                    label="사업자등록번호"
                    name="businessNumber"
                    register={register}
                    error={errors.businessNumber}
                    placeholder="000-00-00000"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection title="연락처 정보" description="회사의 연락처 정보를 입력해주세요.">
        <div className="space-y-6">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-2" />
            <div className="flex-1 space-y-4">
              <FormField label="회사 주소" name="address" register={register} error={errors.address} required />
              <FormField label="상세 주소" name="detailAddress" register={register} error={errors.detailAddress} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <FormField
                label="회사 전화번호"
                name="phone"
                register={register}
                error={errors.phone}
                placeholder="02-0000-0000"
                required
              />
            </div>

            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <FormField
                label="회사 이메일"
                name="email"
                register={register}
                error={errors.email}
                type="email"
                required
              />
            </div>

            <div className="flex items-center">
              <Globe className="h-5 w-5 text-gray-400 mr-2" />
              <FormField
                label="회사 웹사이트"
                name="website"
                register={register}
                error={errors.website}
                placeholder="https://www.example.com"
              />
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <FormField
                label="설립일"
                name="establishmentDate"
                register={register}
                error={errors.establishmentDate}
                type="date"
                required
              />
            </div>

            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-2" />
              <FormField
                label="회사 규모"
                name="companySize"
                register={register}
                error={errors.companySize}
                as="select"
                required
              >
                <option value="">선택해주세요</option>
                <option value="1-10명">1-10명</option>
                <option value="11-50명">11-50명</option>
                <option value="51-100명">51-100명</option>
                <option value="101-300명">101-300명</option>
                <option value="301-500명">301-500명</option>
                <option value="500명+">500명+</option>
              </FormField>
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection title="회사 소개" description="회사에 대한 상세 정보를 입력해주세요.">
        <div className="space-y-4">
          <FormField
            label="회사 소개"
            name="introduction"
            register={register}
            error={errors.introduction}
            as="textarea"
            rows={6}
            required
            description="1000자 이내"
          />
        </div>
      </FormSection>

      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          onClick={() => router.push("/business/dashboard")}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  )
}
