import { type CompanyProfileFormData, companyProfileSchema } from "@/components/business/profile/schema";
import { apiClient } from "@/api/apiClient";

// 🔧 회사 규모 문자열을 숫자로 변환
const parseEmployeeCount = (size: string): number => {
  switch (size) {
    case "1-10명": return 10;
    case "11-50명": return 50;
    case "51-100명": return 100;
    case "101-300명": return 300;
    case "301-500명": return 500;
    case "500명+": return 1000;
    default: return 0;
  }
};

export async function updateCompanyProfile(data: CompanyProfileFormData) {
  try {
    const validatedData = companyProfileSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        message: "입력 데이터가 유효하지 않습니다.",
        errors: validatedData.error.format(),
      };
    }

    const parsed = validatedData.data;

    const refinedData = {
      companyName: parsed.companyName,
      representativeName: parsed.ceoName,  // ✅ 키 수정
      businessNumber: parsed.businessNumber,
      industry: parsed.industry,
      foundedDate: parsed.establishmentDate, // ✅ 키 수정
      address: parsed.address,
      website: parsed.website,
      introduction: parsed.introduction,
      numEmployees: parseEmployeeCount(parsed.companySize),
      revenue: 0, // 기본값
    };

    console.log("🚀 refinedData to send:", refinedData);

    const response = await apiClient.put("/api/business/dashboard/info/update", refinedData);

    const { msg, data: responseData } = response.data;

    if (msg === "success") {
      return {
        success: true,
        message: "기업 정보가 성공적으로 업데이트되었습니다.",
        data: responseData,
      };
    } else {
      return {
        success: false,
        message: "기업 정보 업데이트에 실패했습니다.",
      };
    }
  } catch (error) {
    console.error("❌ 기업 정보 업데이트 실패:", error);
    return {
      success: false,
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
