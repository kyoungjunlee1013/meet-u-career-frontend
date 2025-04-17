"use client"

import { useState } from "react"
import { ResumeHeader } from "./ResumeHeader"
import { ResumeSummaryStatsCardList } from "./ResumeSummaryStatsCardList"
import { ResumeTypeTabGroup } from "./ResumeTypeTabGroup"
import { ResumeCardList } from "./ResumeCardList"
import { ResumeEmptyState } from "./ResumeEmptyState"

// Mock data for resumes
const mockResumes = [
  {
    id: 1,
    title: "백엔드 개발자 이력서",
    updatedAt: "2025-04-14",
    resumeType: 0, // MeetU 이력서
    isPrimary: true,
    status: 2, // 공개
  },
  {
    id: 2,
    title: "프론트엔드 개발자 이력서",
    updatedAt: "2025-04-10",
    resumeType: 0, // MeetU 이력서
    isPrimary: false,
    status: 1, // 비공개
  },
  {
    id: 3,
    title: "포트폴리오 PDF",
    updatedAt: "2025-04-05",
    resumeType: 1, // 파일 이력서
    isPrimary: false,
    status: 2, // 공개
  },
  {
    id: 4,
    title: "노션 이력서",
    updatedAt: "2025-03-28",
    resumeType: 2, // 링크 이력서
    isPrimary: false,
    status: 2, // 공개
  },
  {
    id: 5,
    title: "영문 이력서",
    updatedAt: "2025-03-20",
    resumeType: 1, // 파일 이력서
    isPrimary: false,
    status: 1, // 비공개
  },
]

export const ResumeContent = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null)
  const [resumes, setResumes] = useState(mockResumes)

  // Filter resumes based on active tab
  const filteredResumes = activeTab !== null ? resumes.filter((resume) => resume.resumeType === activeTab) : resumes

  // Calculate stats
  const stats = {
    total: resumes.length,
    meetU: resumes.filter((r) => r.resumeType === 0).length,
    fileAndLink: resumes.filter((r) => r.resumeType === 1 || r.resumeType === 2).length,
  }

  // Handle set primary resume
  const handleSetPrimary = (id: number) => {
    setResumes((prev) =>
      prev.map((resume) => ({
        ...resume,
        isPrimary: resume.id === id,
      })),
    )
  }

  // Handle delete resume
  const handleDelete = (id: number) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id))
  }

  return (
    <div className="space-y-6">
      <ResumeHeader />
      <ResumeSummaryStatsCardList stats={stats} />
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ResumeTypeTabGroup activeTab={activeTab} setActiveTab={setActiveTab} />

        {filteredResumes.length > 0 ? (
          <ResumeCardList resumes={filteredResumes} onSetPrimary={handleSetPrimary} onDelete={handleDelete} />
        ) : (
          <ResumeEmptyState activeTab={activeTab} />
        )}
      </div>
    </div>
  )
}
