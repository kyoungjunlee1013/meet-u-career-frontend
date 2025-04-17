"use client"

import { useState } from "react"
import { CoverLetterStatsCardList } from "./CoverLetterStatsCardList"
import { CoverLetterFilterBar } from "./CoverLetterFilterBar"
import { CoverLetterCardList } from "./CoverLetterCardList"
import { CoverLetterEmptyState } from "./CoverLetterEmptyState"

export const CoverLetterContent = () => {
  const [coverLetters, setCoverLetters] = useState<any[]>([
    {
      id: 1,
      title: "소프트웨어 엔지니어 자기소개서",
      company: "테크 기업",
      updatedAt: "2023-05-15",
      sections: [
        { title: "지원 동기", content: "소프트웨어 엔지니어로서 성장하고 싶어 지원하게 되었습니다." },
        { title: "기술 역량", content: "Java, Spring, React 등의 기술 스택을 활용한 프로젝트 경험이 있습니다." },
        { title: "성장 비전", content: "지속적인 학습을 통해 기술적 역량을 높이고 싶습니다." },
      ],
      status: "완료",
    },
    {
      id: 2,
      title: "프론트엔드 개발자 지원",
      company: "스타트업",
      updatedAt: "2023-06-20",
      sections: [
        { title: "지원 동기", content: "프론트엔드 개발자로서 사용자 경험을 개선하고 싶습니다." },
        { title: "기술 역량", content: "React, TypeScript, Next.js 등의 기술을 활용한 경험이 있습니다." },
        { title: "협업 경험", content: "디자이너, 백엔드 개발자와 협업하여 프로젝트를 진행한 경험이 있습니다." },
      ],
      status: "진행 중",
    },
    {
      id: 3,
      title: "백엔드 개발자 포지션",
      company: "대기업",
      updatedAt: "2023-07-10",
      sections: [
        { title: "지원 동기", content: "백엔드 개발자로서 대규모 시스템을 설계하고 구현하고 싶습니다." },
        { title: "기술 역량", content: "Node.js, Express, MongoDB 등의 기술을 활용한 경험이 있습니다." },
        { title: "프로젝트 경험", content: "대용량 트래픽을 처리하는 API 서버를 구현한 경험이 있습니다." },
        { title: "성장 비전", content: "시스템 아키텍처 설계 능력을 향상시키고 싶습니다." },
        { title: "자기 소개", content: "문제 해결을 좋아하고 새로운 기술을 배우는 것을 즐깁니다." },
      ],
      status: "완료",
    },
  ])

  const [filter, setFilter] = useState({
    search: "",
    status: "all",
    sort: "latest",
  })

  const handleFilterChange = (newFilter: Partial<typeof filter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }))
  }

  const handleDelete = (coverLetter: any) => {
    setCoverLetters((prev) => prev.filter((cl) => cl.id !== coverLetter.id))
  }

  const handlePreview = (coverLetter: any) => {
    // Preview functionality would be implemented here
    console.log("Preview cover letter:", coverLetter)
  }

  const filteredCoverLetters = coverLetters
    .filter((cl) => {
      // Filter by search term
      if (filter.search && !cl.title.toLowerCase().includes(filter.search.toLowerCase())) {
        return false
      }
      // Filter by status
      if (filter.status !== "all" && cl.status !== filter.status) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      // Sort by date
      if (filter.sort === "latest") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      } else {
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      }
    })

  return (
    <div className="space-y-6">
      <CoverLetterStatsCardList
        stats={[
          { title: "전체", count: coverLetters.length },
          { title: "완료", count: coverLetters.filter((cl) => cl.status === "완료").length },
          { title: "진행 중", count: coverLetters.filter((cl) => cl.status === "진행 중").length },
        ]}
      />

      <CoverLetterFilterBar
        filter={filter}
        onFilterChange={handleFilterChange}
        totalCount={filteredCoverLetters.length}
      />

      {filteredCoverLetters.length > 0 ? (
        <CoverLetterCardList coverLetters={filteredCoverLetters} onDelete={handleDelete} onPreview={handlePreview} />
      ) : (
        <CoverLetterEmptyState />
      )}
    </div>
  )
}
