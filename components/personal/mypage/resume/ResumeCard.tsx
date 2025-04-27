"use client"

import { useState } from "react"
import { FileText, File, LinkIcon, Eye, Edit, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResumePreviewModal } from "./ResumePreviewModal"
import { DeleteConfirmModal } from "./DeleteConfirmModal"
import { apiClient } from "@/api/apiClient"

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
  onPreview: (id: number) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toISOString().slice(0, 10);
};

export const ResumeCard = ({ resume, onSetPrimary, onDelete, onPreview }: ResumeCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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

  const handleDelete = async () => {
  try {
    await apiClient.delete(`/api/personal/resume/${resume.id}`);
    onDelete(resume.id);
  } catch (err) {
    alert("이력서 삭제에 실패했습니다.");
  } finally {
    setIsDeleteModalOpen(false);
  }
}

  const handlePreview = () => {
  onPreview(resume.id);
};

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
        <p className="text-sm text-gray-500">최종 수정일: {formatDate(resume.updatedAt)}</p>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onPreview(resume.id)}>
            <Eye className="h-4 w-4 mr-1" />
            미리보기
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 flex items-center justify-center"
            onClick={() => (window.location.href = `/personal/mypage/resume/create?id=${resume.id}`)}
          >
            <Edit className="h-4 w-4 mr-1" />
            수정
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`flex-1 ${resume.isPrimary ? "bg-blue-50 text-blue-600" : ""}`}
            onClick={async () => {
              try {
                await apiClient.patch(`/api/personal/resume/${resume.id}/represent`);
                onSetPrimary(resume.id);
              } catch (err) {
                alert("대표 이력서 설정에 실패했습니다.");
              }
            }}
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
