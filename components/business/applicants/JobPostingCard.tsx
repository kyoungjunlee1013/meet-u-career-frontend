"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobPosting {
  id: number;
  title: string;
  department: string;
  deadline: string;
  applicants: number;
}

interface JobPostingCardProps {
  onSelectJob: (id: number) => void;
}

export const JobPostingCard = ({ onSelectJob }: JobPostingCardProps) => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  useEffect(() => {
    const fetchJobPostings = async () => {
      const response = await axios.get("/api/business/applicants");
      const data = response.data.data;
      const formatted = data.map((job: any) => ({
        id: job.id,
        title: job.title,
        department: job.department || "부서 미정",
        deadline: job.expirationDate?.split("T")[0] || "미정",
        applicants: job.applicantCount || 0,
      }));
      setJobPostings(formatted);
      const firstId = formatted[0]?.id?.toString() ?? "";
      setSelectedJobId(firstId);
      onSelectJob(Number(firstId));
    };
    fetchJobPostings();
  }, []);

  const handleChange = (value: string) => {
    setSelectedJobId(value);
    onSelectJob(Number(value));
  };

  // 🔥 선택된 JobPosting 객체를 구함
  const selectedJob = jobPostings.find(
    (job) => job.id.toString() === selectedJobId
  );

  return (
    <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <FileText className="h-5 w-5 text-gray-500" />
        </div>
        <div className="flex-1">
          <Select value={selectedJobId} onValueChange={handleChange}>
            <SelectTrigger className="border-0 p-0 h-auto shadow-none text-lg font-medium focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="채용공고를 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              {jobPostings.length > 0 ? (
                jobPostings.map((job) => (
                  <SelectItem key={job.id} value={job.id.toString()}>
                    {job.title}
                  </SelectItem>
                ))
              ) : (
                <div className="p-3 text-sm text-gray-500">
                  불러올 채용공고가 없습니다
                </div>
              )}
            </SelectContent>
          </Select>

          {selectedJob ? (
            <div className="mt-1 text-sm text-gray-500">
              <span>{selectedJob.department}</span>
              <span className="mx-1">|</span>
              <span>마감일: {selectedJob.deadline}</span>
              <span className="mx-1">|</span>
              <span>지원자: {selectedJob.applicants}명</span>
            </div>
          ) : (
            <div className="mt-1 text-sm text-gray-400">
              채용공고 정보를 불러오는 중입니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
