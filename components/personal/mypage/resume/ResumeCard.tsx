"use client"

import { useState } from "react"
import { FileText, File, LinkIcon, Eye, Edit, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResumePreviewModal } from "./ResumePreviewModal"
import { DeleteConfirmModal } from "./DeleteConfirmModal"

interface Resume {
  id: number
  title: string
  updatedAt: string
  resumeType: number
  isPrimary: boolean
  status: number
  overview?: string
  location?: string
  desiredPosition?: string
  desiredSalary?: string
  careerLevel?: string
  educationLevel?: string
  skills?: string[]
  externalLinks?: string[]
  resumeFileKey?: string
  resumeFileName?: string
  resumeUrl?: string
  coverLetterId?: number
  coverLetterTitle?: string
  coverLetterUpdatedAt?: string
  contents?: {
    id: number
    sectionType: number
    sectionTitle: string
    contentOrder: number
    content: any
  }[]
}

interface ResumeCardProps {
  resume: Resume
  onSetPrimary: (id: number) => void
  onDelete: (id: number) => void
}

export const ResumeCard = ({ resume, onSetPrimary, onDelete }: ResumeCardProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [previewResume, setPreviewResume] = useState<Resume | null>(null)

  const getResumeTypeIcon = () => {
    switch (resume.resumeType) {
      case 0:
        return <FileText className="h-4 w-4" />
      case 1:
        return <File className="h-4 w-4" />
      case 2:
        return <LinkIcon className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getResumeTypeLabel = () => {
    switch (resume.resumeType) {
      case 0:
        return "MeetU"
      case 1:
        return "파일"
      case 2:
        return "링크"
      default:
        return "MeetU"
    }
  }

  const handleDelete = () => {
    onDelete(resume.id)
    setIsDeleteModalOpen(false)
  }

  const handlePreview = () => {
    // In a real app, this would fetch the full resume data
    // For now, we'll add mock data to the resume object
    const resumeWithContents = {
      ...resume,
      overview:
        "경력 5년차 백엔드 개발자로, 대규모 서비스 아키텍처 설계 및 구현 경험이 있습니다. 새로운 기술 습득과 팀 협업에 강점이 있으며, 사용자 중심의 서비스 개발에 관심이 많습니다.",
      location: "서울시 강남구",
      desiredPosition: "백엔드 개발자",
      desiredSalary: "6000만원",
      careerLevel: "경력 5년",
      educationLevel: "학사",
      skills: ["Java", "Spring", "MySQL", "AWS", "Docker", "Kubernetes"],
      externalLinks: ["https://github.com/honggildong", "https://honggildong.dev"],
      coverLetterId: 1,
      coverLetterTitle: "백엔드 개발자 자기소개서",
      coverLetterUpdatedAt: "2025-04-10",
      contents: [
        {
          id: 1,
          sectionType: 0,
          sectionTitle: "학력",
          contentOrder: 1,
          content: [
            {
              id: "edu-1",
              school: "서울대학교",
              major: "컴퓨터공학과",
              degree: "학사",
              startDate: "2014-03",
              endDate: "2018-02",
              isAttending: false,
              description: "컴퓨터 알고리즘, 데이터베이스, 운영체제 등 전공 과목 이수",
            },
            {
              id: "edu-2",
              school: "한국대학교",
              major: "소프트웨어공학과",
              degree: "석사",
              startDate: "2018-03",
              endDate: "2020-02",
              isAttending: false,
              description: "분산 시스템 연구실에서 클라우드 컴퓨팅 관련 연구 진행",
            },
          ],
        },
        {
          id: 2,
          sectionType: 1,
          sectionTitle: "경력",
          contentOrder: 2,
          content: [
            {
              id: "exp-1",
              company: "ABC 기술",
              department: "백엔드 개발팀",
              position: "주니어 개발자",
              startDate: "2020-03",
              endDate: "2022-02",
              isCurrentlyWorking: false,
              description: "Spring Boot 기반 RESTful API 개발 및 유지보수, MySQL 데이터베이스 설계 및 최적화",
            },
            {
              id: "exp-2",
              company: "XYZ 소프트웨어",
              department: "서버 개발팀",
              position: "선임 개발자",
              startDate: "2022-03",
              endDate: "",
              isCurrentlyWorking: true,
              description: "대규모 트래픽 처리를 위한 마이크로서비스 아키텍처 설계 및 구현, AWS 클라우드 인프라 관리",
            },
          ],
        },
        {
          id: 3,
          sectionType: 2,
          sectionTitle: "자격증",
          contentOrder: 3,
          content: [
            {
              id: "cert-1",
              name: "정보처리기사",
              organization: "한국산업인력공단",
              acquisitionDate: "2017-05-15",
              field: "IT",
              description: "",
            },
            {
              id: "cert-2",
              name: "AWS Certified Solutions Architect",
              organization: "Amazon Web Services",
              acquisitionDate: "2021-08-20",
              field: "클라우드",
              description: "AWS 클라우드 아키텍처 설계 및 구현 능력 인증",
            },
          ],
        },
        {
          id: 4,
          sectionType: 4,
          sectionTitle: "포트폴리오",
          contentOrder: 4,
          content: [
            {
              id: "portfolio-1",
              fileName: "포트폴리오_최종.pdf",
              fileKey: "file-key-1",
              fileSize: 2500000,
              fileType: "application/pdf",
              uploadDate: "2025-03-15T14:30:00Z",
            },
            {
              id: "portfolio-2",
              fileName: "Project_소개자료.pptx",
              fileKey: "file-key-2",
              fileSize: 4200000,
              fileType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              uploadDate: "2025-03-20T09:15:00Z",
            },
          ],
        },
      ],
    }
    setPreviewResume(resumeWithContents)
    setIsPreviewOpen(true)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <span className="flex items-center text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1">
              {getResumeTypeIcon()}
              <span className="ml-1">{getResumeTypeLabel()}</span>
            </span>
            {resume.isPrimary && (
              <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">대표</span>
            )}
          </div>
          <span
            className={`text-xs rounded-full px-2 py-1 ${
              resume.status === 2 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
            }`}
          >
            {resume.status === 2 ? "공개" : "비공개"}
          </span>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-1">{resume.title}</h3>
        <p className="text-sm text-gray-500">최종 수정일: {resume.updatedAt}</p>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-1" />
            미리보기
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 flex items-center justify-center"
            onClick={() => (window.location.href = `/personal/mypage/resume/${resume.id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-1" />
            수정
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`flex-1 ${resume.isPrimary ? "bg-blue-50 text-blue-600" : ""}`}
            onClick={() => onSetPrimary(resume.id)}
            disabled={resume.isPrimary}
          >
            <Star className={`h-4 w-4 mr-1 ${resume.isPrimary ? "fill-blue-600" : ""}`} />
            대표 설정
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-red-600 hover:bg-red-50"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            삭제
          </Button>
        </div>
      </div>

      {isPreviewOpen && previewResume && (
        <ResumePreviewModal resume={previewResume} isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          resumeTitle={resume.title}
        />
      )}
    </div>
  )
}
