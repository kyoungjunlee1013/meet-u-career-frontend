import { z } from "zod"

export const jobPostingSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  jobCategoryIds: z.array(z.number()), // 복수 선택, DTO와 일치
  jobUrl: z.string().optional().or(z.literal("")),
  industry: z.string().min(1, "산업 분야를 입력해주세요."),
  jobType: z.string().min(1, "고용 형태를 선택해주세요."), // 문자열로 변경
  locationCode: z.string().min(1, "근무 지역을 선택해주세요."),
  experienceLevel: z.number(), // int로 변경
  educationLevel: z.number(), // int로 변경
  salaryCode: z.number().optional(), // 코드형
  salaryRange: z.string().optional(), // 텍스트
  openingDate: z.string(),
  expirationDate: z.string(),
  closeType: z.number().optional(),
  keyword: z.array(z.string()), // 배열로 관리, API 전송 시 join
  templateType: z.number(),
  description: z.object({
    duties: z.string(),
    requirements: z.string(),
    preferences: z.string(),
    benefits: z.string(),
  }),
  // applyMethod: z.string().optional(),
  // applyEmail: z.string().optional(),
});

export type JobPostingFormData = z.infer<typeof jobPostingSchema>;
