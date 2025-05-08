
import { type CompanyProfileFormData, companyProfileSchema } from "@/components/business/profile/schema"
import { apiClient } from "@/api/apiClient"

export async function updateCompanyProfile(data: CompanyProfileFormData) {
  try {
    const validatedData = companyProfileSchema.safeParse(data)

    if (!validatedData.success) {
      return {
        success: false,
        message: "입력 데이터가 유효하지 않습니다.",
        errors: validatedData.error.format(),
      }
    }

    // ✅ 실제 API 요청 보내기
    const response = await apiClient.put("/api/business/dashboard/info/profile", validatedData.data)

    return {
      success: true,
      message: "기업 정보가 성공적으로 업데이트되었습니다.",
      data: response.data,
    }
  } catch (error) {
    console.error("❌ 기업 정보 업데이트 실패:", error)
    return {
      success: false,
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    }
  }
}
