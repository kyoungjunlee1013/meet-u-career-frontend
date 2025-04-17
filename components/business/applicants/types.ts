export type ApplicantStatus = "서류검토중" | "서류합격" | "서류불합격" | "면접예정" | "면접완료" | "최종합격"

export const statusColors: Record<ApplicantStatus, string> = {
  서류검토중: "bg-blue-100 text-blue-800",
  서류합격: "bg-green-100 text-green-800",
  서류불합격: "bg-red-100 text-red-800",
  면접예정: "bg-amber-100 text-amber-800",
  면접완료: "bg-indigo-100 text-indigo-800",
  최종합격: "bg-teal-100 text-teal-800",
}

export interface Education {
  school: string
  degree: string
  period: string
  gpa: string
}

export interface Experience {
  company: string
  position: string
  period: string
  description: string
}

export interface Project {
  name: string
  period: string
  description: string
  role: string
}

export interface Language {
  name: string
  level: string
}

export interface Certificate {
  name: string
  date: string
}

export interface Applicant {
  id: number
  name: string
  email: string
  phone: string
  position: string
  applyDate: string
  status: ApplicantStatus
  education: Education[]
  experience: Experience[]
  skills: string[]
  projects: Project[]
  languages: Language[]
  certificates: Certificate[]
  coverLetter: string
}

// Mock data function
export const getMockApplicant = (id: string): Applicant => ({
  id: Number.parseInt(id),
  name: "김지원",
  email: "jiwon.kim@example.com",
  phone: "010-1234-5678",
  position: "프론트엔드 개발자 (React/TypeScript)",
  applyDate: "2023.11.15",
  status: "서류검토중",
  education: [
    {
      school: "서울대학교",
      degree: "컴퓨터공학 학사",
      period: "2015.03 - 2019.02",
      gpa: "3.8/4.5",
    },
    {
      school: "한국디지털대학원",
      degree: "소프트웨어공학 석사",
      period: "2019.03 - 2021.02",
      gpa: "4.2/4.5",
    },
  ],
  experience: [
    {
      company: "테크스타트업",
      position: "프론트엔드 개발자",
      period: "2021.03 - 2023.10",
      description: "React와 TypeScript를 활용한 웹 애플리케이션 개발. 사용자 경험 개선 및 성능 최적화 작업 수행.",
    },
    {
      company: "디지털솔루션즈",
      position: "웹 개발 인턴",
      period: "2020.06 - 2020.12",
      description: "HTML, CSS, JavaScript를 활용한 웹사이트 개발 및 유지보수.",
    },
  ],
  skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Next.js", "Redux", "Git"],
  projects: [
    {
      name: "온라인 쇼핑몰 플랫폼",
      period: "2022.01 - 2022.06",
      description: "React와 Next.js를 활용한 온라인 쇼핑몰 플랫폼 개발. 상품 검색, 장바구니, 결제 기능 구현.",
      role: "프론트엔드 개발 리드",
    },
    {
      name: "소셜 미디어 대시보드",
      period: "2021.07 - 2021.12",
      description:
        "다양한 소셜 미디어 플랫폼의 데이터를 통합하여 보여주는 대시보드 개발. 데이터 시각화 및 실시간 업데이트 기능 구현.",
      role: "프론트엔드 개발자",
    },
  ],
  languages: [
    { name: "한국어", level: "원어민" },
    { name: "영어", level: "비즈니스 레벨" },
  ],
  certificates: [
    { name: "정보처리기사", date: "2019.05" },
    { name: "TOEIC 950", date: "2018.11" },
  ],
  coverLetter: `안녕하세요, 귀사의 프론트엔드 개발자 포지션에 지원합니다.

저는 React와 TypeScript를 활용한 웹 애플리케이션 개발 경험이 있으며, 사용자 경험을 최우선으로 생각하는 개발자입니다. 귀사의 혁신적인 제품과 서비스에 기여하고 싶습니다.

제가 가진 기술적 역량과 경험이 귀사의 비전과 목표 달성에 도움이 될 것이라 확신합니다. 면접에서 더 자세한 이야기를 나눌 수 있기를 기대합니다.`,
})
