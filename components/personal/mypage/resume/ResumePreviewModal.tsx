"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  X,
  Download,
  Printer,
  Edit,
  FileText,
  File,
  LinkIcon,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  FolderOpen,
  FileTextIcon,
  Github,
  Globe,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"

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
  contents?: ResumeContent[]
}

interface ResumeContent {
  id: number
  sectionType: number
  sectionTitle: string
  contentOrder: number
  content: any
}

interface ResumePreviewModalProps {
  resume: Resume
  isOpen: boolean
  onClose: () => void
}

export const ResumePreviewModal = ({ resume, isOpen, onClose }: ResumePreviewModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const getResumeTypeIcon = () => {
    switch (resume.resumeType) {
      case 0:
        return <FileText className="h-5 w-5" />
      case 1:
        return <File className="h-5 w-5" />
      case 2:
        return <LinkIcon className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getResumeTypeLabel = () => {
    switch (resume.resumeType) {
      case 0:
        return "MeetU 이력서"
      case 1:
        return "파일 이력서"
      case 2:
        return "링크 이력서"
      default:
        return "MeetU 이력서"
    }
  }

  const getSectionIcon = (sectionType: number) => {
    switch (sectionType) {
      case 0:
        return <GraduationCap className="h-5 w-5 text-blue-600" />
      case 1:
        return <Briefcase className="h-5 w-5 text-blue-600" />
      case 2:
        return <Award className="h-5 w-5 text-blue-600" />
      case 3:
        return <Calendar className="h-5 w-5 text-blue-600" />
      case 4:
        return <FolderOpen className="h-5 w-5 text-blue-600" />
      case 5:
        return <FileTextIcon className="h-5 w-5 text-blue-600" />
      case 6:
        return <FileText className="h-5 w-5 text-blue-600" />
      default:
        return <FileText className="h-5 w-5 text-blue-600" />
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handlePdfDownload = () => {
    // In a real app, this would call an API endpoint to generate and download the PDF
    alert(`PDF 다운로드: /resumes/${resume.id}/export/pdf`)
  }

  // Mock data for demonstration
  const mockUserInfo = {
    name: "홍길동",
    email: "example@meetu.com",
    phone: "010-1234-5678",
    address: "서울시 강남구",
  }

  // Sort contents by contentOrder
  const sortedContents = resume.contents?.sort((a, b) => a.contentOrder - b.contentOrder) || []

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden">
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] flex flex-col"
          aria-modal="true"
          role="dialog"
          aria-labelledby="resume-preview-title"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              {getResumeTypeIcon()}
              <h2 id="resume-preview-title" className="text-xl font-semibold ml-2">
                이력서 미리보기
              </h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column - Basic info */}
                <div className="md:col-span-2">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{resume.title}</h3>
                    {resume.isPrimary && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">대표</span>
                    )}
                    <span className="flex items-center text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1">
                      {getResumeTypeIcon()}
                      <span className="ml-1">{getResumeTypeLabel()}</span>
                    </span>
                    <span
                      className={`text-xs rounded-full px-2 py-1 ${
                        resume.status === 2 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {resume.status === 2 ? "공개" : "비공개"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">이름</p>
                      <p className="font-medium">{mockUserInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">이메일</p>
                      <p className="font-medium">{mockUserInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">연락처</p>
                      <p className="font-medium">{mockUserInfo.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">주소</p>
                      <p className="font-medium">{mockUserInfo.address}</p>
                    </div>
                  </div>

                  {resume.overview && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">간단 소개</p>
                      <div className="bg-gray-50 p-3 rounded-md text-gray-700">{resume.overview}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    {resume.careerLevel && (
                      <div>
                        <p className="text-sm text-gray-500">경력 수준</p>
                        <p className="font-medium">{resume.careerLevel}</p>
                      </div>
                    )}
                    {resume.educationLevel && (
                      <div>
                        <p className="text-sm text-gray-500">학력 수준</p>
                        <p className="font-medium">{resume.educationLevel}</p>
                      </div>
                    )}
                    {resume.desiredPosition && (
                      <div>
                        <p className="text-sm text-gray-500">희망 직무</p>
                        <p className="font-medium">{resume.desiredPosition}</p>
                      </div>
                    )}
                  </div>

                  {resume.skills && resume.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">보유 기술</p>
                      <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {resume.externalLinks && resume.externalLinks.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">외부 링크</p>
                      <div className="flex flex-wrap gap-3">
                        {resume.externalLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            {link.includes("github") ? (
                              <Github className="h-4 w-4 mr-1" />
                            ) : (
                              <Globe className="h-4 w-4 mr-1" />
                            )}
                            <span className="text-sm underline">{link.replace(/^https?:\/\//, "")}</span>
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right column - Profile image */}
                <div className="flex flex-col items-center md:items-end">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-2">
                    <Image
                      src="/vibrant-street-market.png"
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm text-gray-500">최종 수정일: {resume.updatedAt}</p>
                </div>
              </div>
            </div>

            {/* Resume Content Cards */}
            {sortedContents.map((content) => (
              <div key={content.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  {getSectionIcon(content.sectionType)}
                  <h3 className="text-lg font-medium text-gray-800 ml-2">{content.sectionTitle}</h3>
                </div>

                {/* Render different content based on section type */}
                {content.sectionType === 0 && <EducationSection content={content.content} />}
                {content.sectionType === 1 && <ExperienceSection content={content.content} />}
                {content.sectionType === 2 && <CertificationSection content={content.content} />}
                {content.sectionType === 3 && <ActivitySection content={content.content} />}
                {content.sectionType === 4 && <PortfolioSection content={content.content} />}
                {content.sectionType === 5 && (
                  <CoverLetterSection
                    coverLetterId={resume.coverLetterId}
                    coverLetterTitle={resume.coverLetterTitle}
                    coverLetterUpdatedAt={resume.coverLetterUpdatedAt}
                  />
                )}
                {content.sectionType === 6 && <CustomSection content={content.content} />}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="border-t p-4 flex justify-end md:sticky md:bottom-0 bg-white">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button asChild variant="outline">
                <Link href={`/personal/mypage/resume/${resume.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  이력서 수정
                </Link>
              </Button>
              <Button onClick={handlePdfDownload} className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                PDF 다운로드
              </Button>
              <Button onClick={handlePrint} variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                인쇄
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only version */}
      <div className="hidden print:block p-8">
        <h1 className="text-3xl font-bold mb-6">{resume.title}</h1>

        {/* Basic info for print */}
        <div className="mb-6 border-b pb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">이름:</p>
              <p>{mockUserInfo.name}</p>
            </div>
            <div>
              <p className="font-bold">이메일:</p>
              <p>{mockUserInfo.email}</p>
            </div>
            <div>
              <p className="font-bold">연락처:</p>
              <p>{mockUserInfo.phone}</p>
            </div>
            <div>
              <p className="font-bold">주소:</p>
              <p>{mockUserInfo.address}</p>
            </div>
          </div>
        </div>

        {/* Print each section */}
        {sortedContents.map((content) => (
          <div key={content.id} className="mb-6">
            <h2 className="text-xl font-bold mb-3 border-b pb-2">{content.sectionTitle}</h2>

            {/* Render different content based on section type */}
            {content.sectionType === 0 && <EducationSection content={content.content} />}
            {content.sectionType === 1 && <ExperienceSection content={content.content} />}
            {content.sectionType === 2 && <CertificationSection content={content.content} />}
            {content.sectionType === 3 && <ActivitySection content={content.content} />}
            {content.sectionType === 4 && <PortfolioSection content={content.content} />}
            {content.sectionType === 5 && (
              <CoverLetterSection
                coverLetterId={resume.coverLetterId}
                coverLetterTitle={resume.coverLetterTitle}
                coverLetterUpdatedAt={resume.coverLetterUpdatedAt}
              />
            )}
            {content.sectionType === 6 && <CustomSection content={content.content} />}
          </div>
        ))}
      </div>
    </>
  )
}

// Education Section
function EducationSection({ content }: { content: any[] }) {
  if (!content || content.length === 0) {
    return <p className="text-gray-500">등록된 학력 정보가 없습니다.</p>
  }

  return (
    <div className="space-y-6">
      {content.map((education, index) => (
        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <div className="flex flex-col md:flex-row md:justify-between mb-2">
            <h4 className="font-medium text-gray-900">{education.school}</h4>
            <div className="text-sm text-gray-600">
              {education.startDate} ~ {education.isAttending ? "현재" : education.endDate}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="text-sm">
              <span className="text-gray-500">전공:</span> {education.major || "-"}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">학위:</span> {education.degree || "-"}
            </div>
          </div>
          {education.description && <p className="text-sm text-gray-700 mt-2">{education.description}</p>}
        </div>
      ))}
    </div>
  )
}

// Experience Section
function ExperienceSection({ content }: { content: any[] }) {
  if (!content || content.length === 0) {
    return <p className="text-gray-500">등록된 경력 정보가 없습니다.</p>
  }

  return (
    <div className="space-y-6">
      {content.map((experience, index) => (
        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <div className="flex flex-col md:flex-row md:justify-between mb-2">
            <h4 className="font-medium text-gray-900">{experience.company}</h4>
            <div className="text-sm text-gray-600">
              {experience.startDate} ~ {experience.isCurrentlyWorking ? "현재" : experience.endDate}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="text-sm">
              <span className="text-gray-500">부서:</span> {experience.department || "-"}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">직책:</span> {experience.position || "-"}
            </div>
          </div>
          {experience.description && <p className="text-sm text-gray-700 mt-2">{experience.description}</p>}
        </div>
      ))}
    </div>
  )
}

// Certification Section
function CertificationSection({ content }: { content: any[] }) {
  if (!content || content.length === 0) {
    return <p className="text-gray-500">등록된 자격증 정보가 없습니다.</p>
  }

  return (
    <div className="space-y-6">
      {content.map((certification, index) => (
        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <div className="flex flex-col md:flex-row md:justify-between mb-2">
            <h4 className="font-medium text-gray-900">{certification.name}</h4>
            <div className="text-sm text-gray-600">취득일: {certification.acquisitionDate || "-"}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="text-sm">
              <span className="text-gray-500">발급 기관:</span> {certification.organization || "-"}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">분야:</span> {certification.field || "-"}
            </div>
          </div>
          {certification.description && <p className="text-sm text-gray-700 mt-2">{certification.description}</p>}
        </div>
      ))}
    </div>
  )
}

// Activity Section
function ActivitySection({ content }: { content: any[] }) {
  if (!content || content.length === 0) {
    return <p className="text-gray-500">등록된 활동/경험 정보가 없습니다.</p>
  }

  return (
    <div className="space-y-6">
      {content.map((activity, index) => (
        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <div className="flex flex-col md:flex-row md:justify-between mb-2">
            <h4 className="font-medium text-gray-900">{activity.name}</h4>
            <div className="text-sm text-gray-600">
              {activity.startDate} ~ {activity.endDate}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="text-sm">
              <span className="text-gray-500">기관/단체:</span> {activity.organization || "-"}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">분야:</span> {activity.field || "-"}
            </div>
          </div>
          {activity.description && <p className="text-sm text-gray-700 mt-2">{activity.description}</p>}
        </div>
      ))}
    </div>
  )
}

// Portfolio Section
function PortfolioSection({ content }: { content: any[] }) {
  if (!content || content.length === 0) {
    return <p className="text-gray-500">등록된 포트폴리오 파일이 없습니다.</p>
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {content.map((item, index) => (
          <li key={index} className="py-3 flex items-center justify-between first:pt-0">
            <div className="flex items-center">
              <Download className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-800"
                  onClick={(e) => {
                    e.preventDefault()
                    alert(`파일 다운로드: ${item.fileName}`)
                  }}
                >
                  {item.fileName}
                </a>
                <p className="text-xs text-gray-500">
                  {formatFileSize(item.fileSize)} • {formatDate(item.uploadDate)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600"
              onClick={() => alert(`파일 다운로드: ${item.fileName}`)}
            >
              <Download className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Cover Letter Section
function CoverLetterSection({
  coverLetterId,
  coverLetterTitle,
  coverLetterUpdatedAt,
}: {
  coverLetterId?: number
  coverLetterTitle?: string
  coverLetterUpdatedAt?: string
}) {
  if (!coverLetterId || !coverLetterTitle) {
    return <p className="text-gray-500">연결된 자기소개서가 없습니다.</p>
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h4 className="font-medium mb-2">선택된 자기소개서</h4>
      <p className="text-gray-700">{coverLetterTitle}</p>
      {coverLetterUpdatedAt && <p className="text-sm text-gray-500 mt-1">최종 수정일: {coverLetterUpdatedAt}</p>}
    </div>
  )
}

// Custom Section
function CustomSection({ content }: { content: any }) {
  if (!content || !content.text) {
    return <p className="text-gray-500">등록된 내용이 없습니다.</p>
  }

  return (
    <div className="prose max-w-none">
      <p className="text-gray-700">{content.text}</p>
    </div>
  )
}
