"use server"

import { z } from "zod"

// Mock data for development - replace with actual DB queries in production
const mockCoverLetter = {
  id: "1",
  title: "웹 개발자 지원 자기소개서",
  contents: [
    {
      id: "content1",
      title: "성장 과정",
      content:
        "어릴 때부터 컴퓨터와 기술에 관심이 많았습니다. 중학교 시절 처음으로 HTML과 CSS를 독학하며 웹사이트를 만들기 시작했고, 고등학교에서는 프로그래밍 동아리를 직접 만들어 활동했습니다. 대학에서는 컴퓨터공학을 전공하며 다양한 프로젝트를 통해 실무 경험을 쌓았습니다.",
    },
    {
      id: "content2",
      title: "지원 동기",
      content:
        "귀사의 혁신적인 기술 스택과 개발 문화에 큰 매력을 느껴 지원하게 되었습니다. 특히 사용자 경험을 중시하는 귀사의 철학이 제 개발 가치관과 일치합니다. 귀사에서 제 기술력을 발휘하여 더 나은 서비스를 만드는데 기여하고 싶습니다.",
    },
    {
      id: "content3",
      title: "직무 역량",
      content:
        "프론트엔드 개발자로서 React, TypeScript, Next.js 등의 기술 스택을 활용한 다양한 프로젝트 경험이 있습니다. 특히 사용자 인터페이스 최적화와 접근성 향상에 중점을 두고 개발해왔으며, 백엔드 개발자들과의 협업 경험도 풍부합니다. 지속적인 학습을 통해 최신 기술 트렌드를 따라가고 있습니다.",
    },
  ],
}

const mockJobCategories = [
  { jobCode: "dev", jobName: "개발" },
  { jobCode: "design", jobName: "디자인" },
  { jobCode: "marketing", jobName: "마케팅" },
]

const mockJobTitles = {
  dev: [
    { jobCode: "frontend", jobName: "프론트엔드 개발" },
    { jobCode: "backend", jobName: "백엔드 개발" },
    { jobCode: "fullstack", jobName: "풀스택 개발" },
  ],
  design: [
    { jobCode: "ui", jobName: "UI 디자인" },
    { jobCode: "ux", jobName: "UX 디자인" },
  ],
  marketing: [
    { jobCode: "digital", jobName: "디지털 마케팅" },
    { jobCode: "content", jobName: "콘텐츠 마케팅" },
  ],
}

const mockJobPostings = {
  frontend: [
    { id: "job1", title: "시니어 프론트엔드 개발자" },
    { id: "job2", title: "주니어 프론트엔드 개발자" },
  ],
  backend: [
    { id: "job3", title: "백엔드 개발자 (Java)" },
    { id: "job4", title: "백엔드 개발자 (Node.js)" },
  ],
}

// Validation schemas
const analyzeContentSchema = z.object({
  contentId: z.string(),
  jobTitle: z.string(),
  jobPostingId: z.string().optional().nullable(),
})

const analyzeAllContentsSchema = z.object({
  coverLetterId: z.string(),
  contentIds: z.array(z.string()),
  jobTitle: z.string(),
  jobPostingId: z.string().optional().nullable(),
})

// Helper function to generate mock analysis
const generateMockAnalysis = (contentId: string, jobTitle: string) => {
  // Generate random score between 60 and 95
  const fitScore = Math.floor(Math.random() * 36) + 60

  let comment = ""
  if (fitScore >= 80) {
    comment = "해당 내용은 선택한 직무와 높은 연관성을 보입니다. 구체적인 경험과 역량이 잘 드러나 있습니다."
  } else if (fitScore >= 60) {
    comment =
      "해당 내용은 선택한 직무와 부분적으로 연관성이 있습니다. 더 구체적인 직무 관련 경험을 추가하면 좋을 것 같습니다."
  } else {
    comment = "해당 내용은 선택한 직무와의 연관성이 낮습니다. 직무와 관련된 경험과 역량을 더 강조하는 것이 좋겠습니다."
  }

  return {
    contentId,
    jobTitle,
    fitScore,
    comment,
    createdAt: new Date().toISOString(),
  }
}

// Server actions
export async function getCoverLetterById(id: string) {
  // In production, fetch from database
  // For now, return mock data
  return mockCoverLetter
}

export async function getJobCategories() {
  // In production, fetch from database
  // For now, return mock data
  return mockJobCategories
}

export async function getJobTitles(categoryCode: string) {
  // In production, fetch from database
  // For now, return mock data
  return mockJobTitles[categoryCode as keyof typeof mockJobTitles] || []
}

export async function getJobPostings(jobCode: string) {
  // In production, fetch from database
  // For now, return mock data
  return mockJobPostings[jobCode as keyof typeof mockJobPostings] || []
}

export async function analyzeContent(contentId: string, jobTitle: string) {
  try {
    // Validate input
    analyzeContentSchema.parse({ contentId, jobTitle })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In production, call AI analysis API and store result in database
    // For now, generate mock analysis
    const analysis = generateMockAnalysis(contentId, jobTitle)

    return analysis
  } catch (error) {
    console.error("Error analyzing content:", error)
    throw new Error("Failed to analyze content")
  }
}

export async function analyzeAllContents(
  coverLetterId: string,
  contentIds: string[],
  jobTitle: string
) {
  try {
    // Validate input
    analyzeAllContentsSchema.parse({ coverLetterId, contentIds, jobTitle })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // In production, call AI analysis API for each content and store results
    // For now, generate mock analyses
    const updatedContents = mockCoverLetter.contents.map((content) => {
      if (contentIds.includes(content.id)) {
        return {
          ...content,
          analysis: generateMockAnalysis(content.id, jobTitle),
        }
      }
      return content
    })

    return updatedContents
  } catch (error) {
    console.error("Error analyzing all contents:", error)
    throw new Error("Failed to analyze all contents")
  }
}
