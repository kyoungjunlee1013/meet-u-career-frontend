"use client"

import { MapPin, DollarSign, Briefcase, Trash2, Eye, Clock } from "lucide-react"
import { Badge } from "./Badge"

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  experience: string
  deadline: string
  skills: string[]
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative">
      <div className="absolute top-4 right-4">
        <button className="text-gray-400 hover:text-red-500 transition-colors">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{job.company}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{job.experience}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>마감일: {job.deadline}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill) => (
            <Badge key={skill} text={skill} />
          ))}
        </div>

        <button className="w-full flex items-center justify-center py-2.5 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
          <Eye className="h-4 w-4 mr-2" />
          공고 보기
        </button>
      </div>
    </div>
  )
}
