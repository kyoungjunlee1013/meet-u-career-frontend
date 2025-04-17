"use client"

import { Grid, List, ChevronDown } from "lucide-react"
import { TalentCard } from "./TalentCard"
import { Pagination } from "./Pagination"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const talents = [
  {
    id: 1,
    name: "김지훈",
    title: "프론트엔드 개발자",
    location: "서울",
    experience: "경력 3년",
    education: "학력 대졸",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    moreSkills: 1,
    description: "3년차 프론트엔드 개발자로 사용자 경험을 중시하는 웹 애플리케이션 제작에 관심이 있습니다.",
    bookmarked: false,
  },
  {
    id: 2,
    name: "이서연",
    title: "백엔드 개발자",
    location: "서울",
    experience: "경력 4년",
    education: "학력 석사",
    skills: ["Java", "Spring Boot", "MySQL", "AWS", "Docker"],
    moreSkills: 1,
    description: "5년차 백엔드 개발자로 안정적 서비스 설계와 확장성 있는 아키텍처 설계 경험이 있습니다.",
    bookmarked: true,
  },
  {
    id: 3,
    name: "박민준",
    title: "풀스택 개발자",
    location: "부산",
    experience: "경력 4년",
    education: "학력 대졸",
    skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express"],
    moreSkills: 2,
    description:
      "4년차 풀스택 개발자로 웹 서비스 개발과 운영 경험이 있으며, 현재 MEAN 스택을 집중적으로 공부하고 있습니다.",
    bookmarked: false,
  },
  {
    id: 4,
    name: "최준호",
    title: "데이터 사이언티스트",
    location: "대전",
    experience: "경력 3년",
    education: "학력 대졸",
    skills: ["Python", "R", "TensorFlow", "PyTorch", "Machine Learning"],
    moreSkills: 1,
    description: "3년차 데이터 사이언티스트로 머신러닝 모델 개발 및 최적화, 데이터 분석과 보고 경험이 있습니다.",
    bookmarked: true,
  },
  {
    id: 5,
    name: "한소희",
    title: "DevOps 엔지니어",
    location: "서울",
    experience: "경력 4년",
    education: "학력 대졸",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    moreSkills: 1,
    description: "4년차 DevOps 엔지니어로 클라우드 인프라 구축 및 개발자, CI/CD 파이프라인 구축 경험이 있습니다.",
    bookmarked: false,
  },
  {
    id: 6,
    name: "임준호",
    title: "안드로이드 개발자",
    location: "경기",
    experience: "경력 2년",
    education: "학력 대졸",
    skills: ["Kotlin", "Java", "Android SDK", "MVVM", "Room"],
    moreSkills: 1,
    description: "2년차 안드로이드 개발자로 사용자 친화적인 모바일 애플리케이션 개발 경험을 쌓고 있습니다.",
    bookmarked: false,
  },
  {
    id: 7,
    name: "홍지은",
    title: "iOS 개발자",
    location: "서울",
    experience: "경력 3년",
    education: "학력 대졸",
    skills: ["Swift", "Objective-C", "UIKit", "SwiftUI", "Core Data"],
    moreSkills: 1,
    description: "3년차 iOS 개발자로 다양한 앱 개발과 출시 사례가 있으며 최신 기술을 활용하는 것을 좋아합니다.",
    bookmarked: true,
  },
  {
    id: 8,
    name: "강현우",
    title: "시스템 엔지니어",
    location: "인천",
    experience: "경력 7년",
    education: "학력 대졸",
    skills: ["Linux", "Windows Server", "Network Security", "Virtualization", "Cloud Infrastructure"],
    moreSkills: 0,
    description: "7년차 시스템 엔지니어로 대규모 IT 인프라 구축 및 관리, 보안 시스템 설계 경험이 있습니다.",
    bookmarked: false,
  },
]

export const TalentsGrid = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium">
          <span className="text-blue-500">15</span> 명의 인재
        </div>

        <div className="flex items-center gap-2">
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <button
              className={`p-1.5 ${viewType === "grid" ? "bg-blue-100 text-blue-500" : "bg-white text-gray-500"}`}
              onClick={() => setViewType("grid")}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              className={`p-1.5 ${viewType === "list" ? "bg-blue-100 text-blue-500" : "bg-white text-gray-500"}`}
              onClick={() => setViewType("list")}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <Button variant="outline" className="text-sm h-8 flex items-center gap-1 border-gray-300">
            <span>관련순</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className={`grid ${viewType === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-4`}>
        {talents.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination />
      </div>
    </div>
  )
}
