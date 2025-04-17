"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Eye,
  Users,
  MapPin,
  Building,
  Clock,
  Calendar,
  Edit,
  ExternalLink,
  AlertCircle,
  ChevronDown,
  X,
} from "lucide-react"

interface JobCardProps {
  job: {
    id: number
    title: string
    status: string
    statusLabel: string
    daysLeft?: string
    views: number
    applicants: number
    location: string
    workType: string
    experience: string
    salary: string
    postedDate: string
    deadline: string
    error?: string
    description?: string
    requirements?: string
    benefits?: string
    companyName?: string
  }
}

export const JobCard = ({ job }: JobCardProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "게시 중":
        return "text-blue-600"
      case "승인 대기":
        return "text-amber-500"
      case "지원됨":
        return "text-gray-600"
      case "반려됨":
        return "text-red-500"
      default:
        return "text-gray-600"
    }
  }

  const isRejected = job.status === "반려됨"

  return (
    <>
      <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">{job.title}</h3>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center text-sm mb-2">
            <span className={`mr-2 font-medium ${getStatusColor(job.status)}`}>{job.statusLabel}</span>
            {job.daysLeft && (
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">{job.daysLeft}</span>
            )}
          </div>

          {isRejected && (
            <div className="bg-red-50 border border-red-100 rounded-md p-3 my-3 text-sm text-red-600 flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
              <p>{job.error}</p>
            </div>
          )}

          <div className="flex items-center space-x-6 mt-3">
            <div className="flex items-center text-gray-500 text-sm">
              <Eye className="h-4 w-4 mr-1" />
              <span>{job.views}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Users className="h-4 w-4 mr-1" />
              <span>{job.applicants}</span>
            </div>
          </div>

          <div className="flex items-center mt-3 space-x-4">
            <div className="flex items-center text-gray-600 text-sm">
              <Building className="h-4 w-4 mr-1 text-gray-400" />
              <span>{job.workType}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Clock className="h-4 w-4 mr-1 text-gray-400" />
              <span>{job.experience}</span>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">연봉:</span>
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
              <span className="text-gray-500">
                게시일: {job.postedDate} | 마감일: {job.deadline}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 px-4 py-3 flex justify-between">
          <Link
            href={`/business/jobs/register?id=${job.id}`}
            className="text-gray-600 hover:text-gray-900 flex items-center text-sm"
          >
            <Edit className="h-4 w-4 mr-1" />
            <span>수정</span>
          </Link>
          <button
            className="text-gray-600 hover:text-gray-900 flex items-center text-sm"
            onClick={() => setIsPreviewOpen(true)}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            <span>미리보기</span>
          </button>
        </div>
      </div>

      {isPreviewOpen && <JobPreviewModal job={job} onClose={() => setIsPreviewOpen(false)} />}
    </>
  )
}

interface JobPreviewModalProps {
  job: JobCardProps["job"]
  onClose: () => void
}

const JobPreviewModal = ({ job, onClose }: JobPreviewModalProps) => {
  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="job-preview-title"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 id="job-preview-title" className="text-xl font-bold">
            공고 미리보기
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
            aria-label="닫기"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            <p className="text-gray-600 mb-4">{job.companyName || "회사명"}</p>

            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">{job.workType}</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">{job.location}</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">{job.experience}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span>마감일: {job.deadline}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-2">연봉:</span>
              <span>{job.salary}</span>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-medium mb-3">주요 업무</h3>
              <div className="text-gray-700">
                {job.description || <p className="text-gray-500 italic">주요 업무 내용이 없습니다.</p>}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-3">자격 요건</h3>
              <div className="text-gray-700">
                {job.requirements || <p className="text-gray-500 italic">자격 요건 내용이 없습니다.</p>}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-3">복리 후생</h3>
              <div className="text-gray-700">
                {job.benefits || <p className="text-gray-500 italic">복리 후생 내용이 없습니다.</p>}
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-4">지원 방법</h3>
            <p className="text-gray-700 mb-6">
              지원 마감일({job.deadline})까지 아래 '지원하기' 버튼을 통해 지원해 주세요.
            </p>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              지원하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
