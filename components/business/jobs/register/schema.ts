import { z } from "zod"

export const jobPostingSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  jobCategoryId: z.string().min(1, "직무 카테고리를 선택해주세요."),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"]),
  workType: z.enum(["OFFICE", "REMOTE", "HYBRID"]),
  location: z.string().min(1, "근무지를 입력해주세요."),
  salary: z.string().min(1, "급여를 입력해주세요."),
  careerLevel: z.enum(["ANY", "ENTRY", "JUNIOR", "MID", "SENIOR", "EXECUTIVE"]),
  educationLevel: z.enum(["ANY", "HIGH_SCHOOL", "ASSOCIATE", "BACHELOR", "MASTER", "DOCTORATE"]),
  requiredSkills: z.array(z.string()),
  openingDate: z.string(),
  closingDate: z.string(),
  applicationMethod: z.enum(["EMAIL", "WEBSITE", "PHONE"]),
  contactEmail: z.string().email("유효한 이메일 주소를 입력해주세요.").optional().or(z.literal("")),
  contactWebsite: z.string().url("유효한 URL을 입력해주세요.").optional().or(z.literal("")),
  contactPhone: z.string().optional().or(z.literal("")),
  description: z.object({
    duties: z.string().min(1, "주요 업무를 입력해주세요."),
    requirements: z.string().min(1, "자격 요건을 입력해주세요."),
    preferences: z.string().optional().or(z.literal("")),
    benefits: z.string().optional().or(z.literal("")),
  }),
  templateType: z.number(),
})

export type JobPostingFormData = z.infer<typeof jobPostingSchema>
