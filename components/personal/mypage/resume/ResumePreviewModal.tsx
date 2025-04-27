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
  profile?: Profile // 추가
}

interface Profile {
  profileId: number;
  accountId: number;
  name: string;
  email: string;
  phone: string;
  profileImageKey?: string;
  desiredJobCategoryName?: string | null;
  desiredLocationName?: string | null;
  experienceLevel?: string | null;
  educationLevel?: string | null;
  desiredSalaryCode?: string | null;
  skills?: string;
  profileImageUrl?: string | null;
}

interface ResumeContent {
  id: number
  sectionType: number
  sectionTitle: string
  contentOrder: number
  content: any
}

// 1단계: ResumeSaveRequestDTO 기반 구조로 변경
interface ResumeSaveRequestDTO {
  resume: {
    id?: number;
    title: string;
    resumeType: number;
    resumeFileKey?: string;
    resumeFileName?: string;
    resumeFileType?: string;
    resumeUrl?: string;
    overview?: string;
    coverLetterId?: number;
    extraLink1?: string;
    extraLink2?: string;
    isPrimary?: boolean;
    status?: number;
  };
  profile?: {
    name?: string;
    email?: string;
    phone?: string;
    profileImageKey?: string;
    desiredJobCategoryName?: string | null;
    desiredLocationName?: string | null;
    skills?: string;
    profileImageUrl?: string | null;
    experienceLevel?: string;
    educationLevel?: string;
  };
  resumeContents?: any[];
}

interface ResumePreviewModalProps {
  data: ResumeSaveRequestDTO;
  isOpen: boolean;
  onClose: () => void;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

export const ResumePreviewModal = ({ data, isOpen, onClose }: ResumePreviewModalProps) => {
  if (!isOpen || !data) return null;
  const { resume, profile, resumeContents } = data;
  const externalLinks = resume.externalLinks ?? [];

  const modalRef = useRef<HTMLDivElement>(null)

  // --- 2단계: 기본 정보 표시 (읽기 전용) ---
  // 타입/상태 뱃지 텍스트
  const typeBadge = resume.resumeType === 1 ? "파일" : resume.resumeType === 2 ? "링크" : "MeetU";
  const statusBadge = resume.status === 2 ? "공개" : "비공개";









  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 relative" ref={modalRef}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <X size={24} />
        </button>
        {/* 제목 및 뱃지 */}
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{resume.title}</h2>
          {resume.isPrimary && <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold">대표</span>}
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-semibold">{typeBadge}</span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${resume.status === 2 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>{statusBadge}</span>
        </div>
        {/* 프로필 정보 */}
        <div className="flex items-center gap-4 mb-6">
          {profile?.profileImageUrl && (
            <Image src={profile.profileImageUrl} alt="프로필 이미지" width={56} height={56} className="rounded-full object-cover border" />
          )}
          <div className="flex flex-col gap-1">
            <div className="text-lg font-semibold text-gray-800">{profile?.name}</div>
            <div className="text-sm text-gray-600">{profile?.email}</div>
            <div className="text-sm text-gray-600">{profile?.phone}</div>
            {profile?.desiredJobCategoryName && <div className="text-xs text-gray-500">희망직무: {profile.desiredJobCategoryName}</div>}
            {profile?.desiredLocationName && <div className="text-xs text-gray-500">희망지역: {profile.desiredLocationName}</div>}
            {profile?.skills && <div className="text-xs text-gray-500">스킬: {profile.skills}</div>}
          </div>
        </div>
        {/* --- overview(요약) --- */}
        {resume.overview && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">요약</h3>
            <div className="text-gray-700 whitespace-pre-line border rounded p-3 bg-gray-50">{resume.overview}</div>
          </div>
        )}

        {/* --- 파일/URL --- */}
        {resume.resumeType === 1 && resume.resumeFileName && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">이력서 파일</h3>
            <div className="flex items-center gap-2">
              <FileTextIcon className="w-5 h-5 text-gray-400" />
              <span>{resume.resumeFileName}</span>
              {/* 실제 다운로드 링크는 필요에 따라 구현 */}
            </div>
            <div className="text-xs text-gray-500 mt-1">파일 타입: {resume.resumeFileType}</div>
          </div>
        )}
        {resume.resumeType === 2 && resume.resumeUrl && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">이력서 URL</h3>
            <a href={resume.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
              <Globe className="w-4 h-4" />
              {resume.resumeUrl}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* --- 자기소개서 --- */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-1 text-gray-900">자기소개서</h3>
          {resume.coverLetterId ? (
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              <span>연결된 자기소개서 ID: {resume.coverLetterId}</span>
            </div>
          ) : (
            <div className="text-gray-500">연결된 자기소개서가 없습니다.</div>
          )}
        </div>

        {/* --- 추가 링크 --- */}
        {(resume.extraLink1 || resume.extraLink2) && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">추가 링크</h3>
            <div className="flex flex-col gap-1">
              {resume.extraLink1 && (
                <a href={resume.extraLink1} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  {resume.extraLink1}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {resume.extraLink2 && (
                <a href={resume.extraLink2} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {resume.extraLink2}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* --- 이력서 섹션 리스트 --- */}
        {resumeContents && resumeContents.length > 0 && (
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">이력서 항목</h3>
            <div className="space-y-4">
              {resumeContents.map((item, idx) => (
                <div key={item.id ?? idx} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    {/* 섹션 타입별 아이콘 */}
                    {item.sectionType === 0 && <GraduationCap className="w-4 h-4 text-gray-400" />}
                    {item.sectionType === 1 && <Briefcase className="w-4 h-4 text-gray-400" />}
                    {item.sectionType === 2 && <Award className="w-4 h-4 text-gray-400" />}
                    {item.sectionType === 3 && <FolderOpen className="w-4 h-4 text-gray-400" />}
                    {item.sectionType === 4 && <FileTextIcon className="w-4 h-4 text-gray-400" />}
                    <span className="font-medium text-gray-900">{item.sectionTitle}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-1">
                    {item.organization && <div className="text-gray-700">기관/단체: {item.organization}</div>}
                    {item.title && <div className="text-gray-700">직함/학위: {item.title}</div>}
                    {item.field && <div className="text-gray-700">분야: {item.field}</div>}
                  </div>
                  {(item.dateFrom || item.dateTo) && (
                    <div className="text-xs text-gray-500 mb-1">{item.dateFrom} ~ {item.dateTo}</div>
                  )}
                  {item.description && <div className="text-gray-700 whitespace-pre-line">{item.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

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

  // Sort contents by contentOrder
  const sortedContents = resumeContents?.sort((a, b) => a.contentOrder - b.contentOrder) || [];
  const educationList = resumeContents?.filter(c => c.sectionType === 0) || [];
  const experienceList = resumeContents?.filter(c => c.sectionType === 1) || [];
  const certificationList = resumeContents?.filter(c => c.sectionType === 2) || [];
  const activityList = resumeContents?.filter(c => c.sectionType === 3) || [];
  const portfolioList = resumeContents?.filter(c => c.sectionType === 4) || [];

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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                {/* Left: Main Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h2 className="text-2xl font-bold text-gray-900 truncate">{resume.title}</h2>
                    {resume.isPrimary && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">대표</span>
                    )}
                    <span className="flex items-center text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1">
                      {getResumeTypeIcon()}
                      <span className="ml-1">{getResumeTypeLabel()}</span>
                    </span>
                    <span
                      className={`text-xs rounded-full px-2 py-1 ${resume.status === 2 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
                    >
                      {resume.status === 2 ? "공개" : "비공개"}
                    </span>
                  </div>

                  {resume.overview && (
                    <div className="mb-4">
                      <div className="bg-gray-50 p-3 rounded text-gray-700 text-sm">{resume.overview}</div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 mb-4">
                    {profile?.skills && (
                      <div className="flex flex-wrap gap-2 items-center">
                        {profile.skills.split(',').map((skill: string, idx: number) => (
                          <span key={idx} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {externalLinks && externalLinks.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-3">
                        {externalLinks.map((link, idx) => (
                          <a
                            key={idx}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                    {profile?.name && (
                      <div>
                        <p className="text-xs text-gray-500">이름</p>
                        <p className="font-medium text-gray-900">{profile.name}</p>
                      </div>
                    )}
                    {profile?.email && (
                      <div>
                        <p className="text-xs text-gray-500">이메일</p>
                        <p className="font-medium text-gray-900">{profile.email}</p>
                      </div>
                    )}
                    {profile?.phone && (
                      <div>
                        <p className="text-xs text-gray-500">연락처</p>
                        <p className="font-medium text-gray-900">{profile.phone}</p>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                    {profile?.experienceLevel && (
                      <div>
                        <p className="text-xs text-gray-500">경력 수준</p>
                        <p className="font-medium text-gray-900">{profile.experienceLevel}</p>
                      </div>
                    )}
                    {profile?.educationLevel && (
                      <div>
                        <p className="text-xs text-gray-500">학력 수준</p>
                        <p className="font-medium text-gray-900">{profile.educationLevel}</p>
                      </div>
                    )}
                    {profile?.desiredLocationName && (
                      <div>
                        <p className="text-xs text-gray-500">희망 근무지</p>
                        <p className="font-medium text-gray-900">{profile.desiredLocationName}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Profile image + updated date */}
                <div className="flex flex-col items-center md:items-end shrink-0">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-200 mb-2 border border-gray-300">
                    <Image
                      src={profile?.profileImageUrl || "/vibrant-street-market.png"}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">최종 수정일: {formatDate(resume.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Resume Content Cards - Only render if data exists */}
            {educationList.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  {getSectionIcon(0)}
                  <h3 className="text-lg font-medium text-gray-800 ml-2">학력</h3>
                </div>
                <EducationSection list={educationList} />
              </div>
            )}
            {experienceList.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  {getSectionIcon(1)}
                  <h3 className="text-lg font-medium text-gray-800 ml-2">경력</h3>
                </div>
                <ExperienceSection list={experienceList} />
              </div>
            )}
            {certificationList.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  {getSectionIcon(2)}
                  <h3 className="text-lg font-medium text-gray-800 ml-2">자격증</h3>
                </div>
                <CertificationSection list={certificationList} />
              </div>
            )}
            {activityList.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  {getSectionIcon(3)}
                  <h3 className="text-lg font-medium text-gray-800 ml-2">활동/경험</h3>
                </div>
                <ActivitySection list={activityList} />
              </div>
            )}
            {portfolioList.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center mb-4">
                  {getSectionIcon(4)}
                  <h3 className="text-lg font-medium text-gray-800 ml-2">포트폴리오</h3>
                </div>
                <PortfolioSection list={portfolioList} />
              </div>
            )}

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
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b pb-2">학력</h2>
          <EducationSection list={educationList} />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b pb-2">경력</h2>
          <ExperienceSection list={experienceList} />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b pb-2">자격증</h2>
          <CertificationSection list={certificationList} />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b pb-2">활동/경험</h2>
          <ActivitySection list={activityList} />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b pb-2">포트폴리오</h2>
          <PortfolioSection list={portfolioList} />
        </div>
        {/* CoverLetterSection, CustomSection 등은 필요시 아래에 추가 구현 */}

      </div>
    </>
  )
}

// Education Section
function EducationSection({ list }: { list: any[] }) {
  if (!list || list.length === 0) {
    return <p className="text-gray-500">등록된 학력 정보가 없습니다.</p>;
  }
  return (
    <div className="space-y-6">
      {list.map((education, index) => (
        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <div className="flex flex-col md:flex-row md:justify-between mb-2">
            <h4 className="font-medium text-gray-900">{education.organization}</h4>
            <div className="text-sm text-gray-600">
              {education.dateFrom?.slice(0, 10)} ~ {education.dateTo?.slice(0, 10)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="text-sm">
              <span className="text-gray-500">전공:</span> {education.field || "-"}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">학위:</span> {education.title || "-"}
            </div>
          </div>
          {education.description && <p className="text-sm text-gray-700 mt-2">{education.description}</p>}
        </div>
      ))}
    </div>
  );
}


// Experience Section
function ExperienceSection({ list }: { list: any[] }) {
  if (!list || list.length === 0) {
    return <p className="text-gray-500">등록된 경력 정보가 없습니다.</p>;
  }
  return (
    <div className="space-y-6">
      {list.map((experience, index) => (
        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <div className="flex flex-col md:flex-row md:justify-between mb-2">
            <h4 className="font-medium text-gray-900">{experience.organization}</h4>
            <div className="text-sm text-gray-600">
              {experience.dateFrom?.slice(0, 10)} ~ {experience.dateTo ? experience.dateTo.slice(0, 10) : ""}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="text-sm">
              <span className="text-gray-500">직책:</span> {experience.title || "-"}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">분야:</span> {experience.field || "-"}
            </div>
          </div>
          {experience.description && <p className="text-sm text-gray-700 mt-2">{experience.description}</p>}
        </div>
      ))}
    </div>
  );
}


// Certification Section
function CertificationSection({ list }: { list: any[] }) {
  if (!list || list.length === 0) {
    return <p className="text-gray-500">등록된 자격증 정보가 없습니다.</p>;
  }
  return (
    <div className="space-y-6">
      {list.map((cert, index) => (
        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <div className="flex flex-col md:flex-row md:justify-between mb-2">
            <h4 className="font-medium text-gray-900">{cert.title}</h4>
            <div className="text-sm text-gray-600">취득일: {cert.dateFrom?.slice(0, 10) || "-"}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="text-sm">
              <span className="text-gray-500">발급 기관:</span> {cert.organization || "-"}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">분야:</span> {cert.field || "-"}
            </div>
          </div>
          {cert.description && <p className="text-sm text-gray-700 mt-2">{cert.description}</p>}
        </div>
      ))}
    </div>
  );
}


// Activity Section
function ActivitySection({ list }: { list: any[] }) {
  if (!list || list.length === 0) {
    return <p className="text-gray-500">등록된 활동/경험 정보가 없습니다.</p>;
  }
  return (
    <div className="space-y-6">
      {list.map((activity, index) => (
        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <div className="flex flex-col md:flex-row md:justify-between mb-2">
            <h4 className="font-medium text-gray-900">{activity.organization}</h4>
            <div className="text-sm text-gray-600">
              {activity.dateFrom?.slice(0, 10)} ~ {activity.dateTo ? activity.dateTo.slice(0, 10) : ""}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="text-sm">
              <span className="text-gray-500">활동명:</span> {activity.title || "-"}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">분야:</span> {activity.field || "-"}
            </div>
          </div>
          {activity.description && <p className="text-sm text-gray-700 mt-2">{activity.description}</p>}
        </div>
      ))}
    </div>
  );
}


// Portfolio Section
function PortfolioSection({ list }: { list: any[] }) {
  if (!list || list.length === 0) {
    return <p className="text-gray-500">등록된 포트폴리오 파일이 없습니다.</p>;
  }
  return (
    <div className="space-y-6">
      {list.map((item, index) => (
        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <div className="flex flex-col md:flex-row md:justify-between mb-2">
            <h4 className="font-medium text-gray-900">{item.title}</h4>
            <div className="text-sm text-gray-600">
              {item.dateFrom?.slice(0, 10)} ~ {item.dateTo ? item.dateTo.slice(0, 10) : ""}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="text-sm">
              <span className="text-gray-500">기관/단체:</span> {item.organization || "-"}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">분야:</span> {item.field || "-"}
            </div>
          </div>
          {item.description && <p className="text-sm text-gray-700 mt-2">{item.description}</p>}
        </div>
      ))}
    </div>
  );
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
      {coverLetterUpdatedAt && <p className="text-sm text-gray-500 mt-1">최종 수정일: {formatDate(coverLetterUpdatedAt)}</p>}
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
