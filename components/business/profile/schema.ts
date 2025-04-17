import { z } from "zod"

export const companyProfileSchema = z.object({
  logo: z.any().optional(), // This will be handled separately
  companyName: z.string().min(1, "회사명을 입력해주세요."),
  ceoName: z.string().min(1, "대표자명을 입력해주세요."),
  businessNumber: z
    .string()
    .min(1, "사업자등록번호를 입력해주세요.")
    .regex(/^\d{3}-\d{2}-\d{5}$/, "올바른 사업자등록번호 형식이 아닙니다. (예: 123-45-67890)"),
  address: z.string().min(1, "회사 주소를 입력해주세요."),
  detailAddress: z.string().optional(),
  phone: z
    .string()
    .min(1, "회사 전화번호를 입력해주세요.")
    .regex(/^\d{2,3}-\d{3,4}-\d{4}$/, "올바른 전화번호 형식이 아닙니다. (예: 02-1234-5678)"),
  email: z.string().min(1, "회사 이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
  website: z.string().url("올바른 웹사이트 URL을 입력해주세요.").or(z.string().length(0)).optional(),
  establishmentDate: z.string().min(1, "설립일을 입력해주세요."),
  companySize: z.string().min(1, "회사 규모를 입력해주세요."),
  industry: z.string().min(1, "업종을 입력해주세요."),
  introduction: z.string().min(1, "회사 소개를 입력해주세요.").max(1000, "회사 소개는 1000자 이내로 작성해주세요."),
})

export type CompanyProfileFormData = z.infer<typeof companyProfileSchema>
