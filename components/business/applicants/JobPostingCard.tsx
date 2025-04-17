"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const jobPostings = [
  {
    id: 1,
    title: "프론트엔드 개발자 (React/TypeScript)",
    department: "개발팀",
    deadline: "2023.12.31",
    applicants: 24,
  },
  {
    id: 2,
    title: "백엔드 개발자 (Node.js)",
    department: "개발팀",
    deadline: "2023.12.15",
    applicants: 18,
  },
  {
    id: 3,
    title: "UI/UX 디자이너",
    department: "디자인팀",
    deadline: "2023.12.20",
    applicants: 12,
  },
]

export const JobPostingCard = () => {
  const [selectedJob, setSelectedJob] = useState(jobPostings[0])

  return (
    <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <FileText className="h-5 w-5 text-gray-500" />
        </div>
        <div className="flex-1">
          <Select
            defaultValue={selectedJob.id.toString()}
            onValueChange={(value) => {
              const job = jobPostings.find((j) => j.id.toString() === value)
              if (job) setSelectedJob(job)
            }}
          >
            <SelectTrigger className="border-0 p-0 h-auto shadow-none text-lg font-medium focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder={selectedJob.title} />
            </SelectTrigger>
            <SelectContent>
              {jobPostings.map((job) => (
                <SelectItem key={job.id} value={job.id.toString()}>
                  {job.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-1 text-sm text-gray-500">
            <span>{selectedJob.department}</span>
            <span className="mx-1">|</span>
            <span>마감일: {selectedJob.deadline}</span>
            <span className="mx-1">|</span>
            <span>지원자: {selectedJob.applicants}명</span>
          </div>
        </div>
      </div>
    </div>
  )
}
