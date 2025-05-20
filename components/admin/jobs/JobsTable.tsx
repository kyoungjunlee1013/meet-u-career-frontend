"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"
import JobDetailModal from "./JobDetailModal"
import { apiClient } from "@/api/apiClient"

interface JobPosting {
  id: number
  title: string
  companyName: string
  status: number
  registrationDate: string
  viewCount: number
  applyCount: number
  deadline: string
  description?: string
}

export default function JobsTable({ activeTab }: { activeTab: string }) {
  const [jobListings, setJobListings] = useState<JobPosting[]>([])
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchJobs = async () => {
    const statusParam =
      activeTab === "pending" ? 2 : activeTab === "approved" ? 1 : undefined
    const response = await apiClient.get(`/api/admin/job-postings`, {
      params: { page: 0, status: statusParam },
    })
    setJobListings(response.data.data)
  }

  useEffect(() => {
    fetchJobs()
  }, [activeTab])

  const handleOpenModal = (job: JobPosting) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => setIsModalOpen(false)

  const handleAction = async (
    id: number,
    action: "approve" | "reject" | "block"
  ) => {
    await apiClient.patch(`/api/admin/job-postings/${id}/${action}`)
    fetchJobs()
    setIsModalOpen(false)
  }

  const getStatusBadge = (status: number) => {
    const statusTextMap: Record<number, string> = {
      0: "반려",
      1: "승인됨",
      2: "대기 중",
      3: "차단됨",
    }

    const statusColorMap: Record<number, string> = {
      0: "text-red-600",
      1: "text-green-600",
      2: "text-yellow-600",
      3: "text-gray-600",
    }

    return (
      <span className={statusColorMap[status] || "text-gray-600"}>
        {statusTextMap[status] || "알 수 없음"}
      </span>
    )
  }

  return (
    <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "No",
                "공고명",
                "기업명",
                "승인 상태",
                "등록일",
                "조회수",
                "지원자수",
                "마감일",
                "관리",
              ].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobListings.map((job, index) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {job.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {job.companyName}
                </td>
                <td className="px-6 py-4">{getStatusBadge(job.status)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {job.registrationDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {job.viewCount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {job.applyCount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {job.deadline}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    {job.status === 2 && (
                      <>
                        <button
                          onClick={() => handleAction(job.id, "approve")}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded hover:bg-green-100 text-xs font-medium"
                        >
                          승인
                        </button>
                        <button
                          onClick={() => handleAction(job.id, "reject")}
                          className="px-3 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 text-xs font-medium"
                        >
                          거부
                        </button>
                      </>
                    )}
                    {job.status === 1 && (
                      <button
                        onClick={() => handleAction(job.id, "block")}
                        className="px-3 py-1 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 text-xs font-medium"
                      >
                        차단
                      </button>
                    )}
                    <button
                      onClick={() => handleOpenModal(job)}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-xs font-medium flex items-center"
                    >
                      <Eye className="w-3 h-3 mr-1" /> 상세
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={handleCloseModal}
          onAction={handleAction}
        />
      )}
    </div>
  )
}
