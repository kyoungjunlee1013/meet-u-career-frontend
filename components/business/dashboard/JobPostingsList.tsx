import { Eye, MapPin, Calendar, Briefcase, Clock, ChevronDown, ExternalLink } from "lucide-react"

export const JobPostingsList = () => {
  const jobPostings = [
    {
      id: 1,
      title: "프론트엔드 개발자 (React/Next.js)",
      startDate: "2023.03.13",
      endDate: "2023.04.13",
      location: "서울 구로구",
      type: "정규직",
      experience: "3년 이상 / 학사 이상",
      views: 1245,
      applicants: 37,
      status: "모집중",
      isHot: true,
    },
    {
      id: 2,
      title: "백엔드 개발자 (Node.js/Express)",
      startDate: "2023.03.13",
      endDate: "2023.04.13",
      location: "서울 구로구",
      type: "정규직",
      experience: "5년 이상 / 학사 이상",
      views: 987,
      applicants: 28,
      status: "모집 마감",
      isHot: false,
    },
    {
      id: 3,
      title: "인사팀 HRM 담당 신입/경력 채용",
      startDate: "2023.03.01",
      endDate: "2023.04.30",
      location: "서울 구로구",
      type: "정규직",
      experience: "신입 / 학사 이상",
      views: 1245,
      applicants: 37,
      status: "D-17",
      isHot: true,
    },
    {
      id: 4,
      title: "마케팅 매니저 (경력 5년 이상)",
      startDate: "2023.02.20",
      endDate: "2023.03.20",
      location: "서울 구로구",
      type: "정규직",
      experience: "7년 이상 / 학사 이상",
      views: 756,
      applicants: 19,
      status: "마감",
      isHot: false,
    },
    {
      id: 5,
      title: "UI/UX 디자이너",
      startDate: "2023.02.15",
      endDate: "2023.03.15",
      location: "서울 구로구",
      type: "정규직",
      experience: "3년 이상 / 전문학사 이상",
      views: 892,
      applicants: 24,
      status: "마감",
      isHot: false,
    },
  ]

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">채용공고 목록</h2>
        <div className="flex items-center">
          <button className="bg-blue-500 text-white text-sm rounded-md px-3 py-1.5 mr-2 hover:bg-blue-600 transition-colors">
            채용공고 등록
          </button>
          <div className="relative">
            <button className="flex items-center text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white hover:bg-gray-50">
              <span className="mr-1">정렬: 게시일 역순</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {jobPostings.map((job) => (
          <div key={job.id} className="border border-gray-200 rounded-md p-4 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  {job.title}
                  {job.isHot && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">D-17</span>
                  )}
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <span>작성일: {job.startDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <span>마감일: {job.endDate}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center col-span-2">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{job.experience}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center text-gray-500">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>조회 {job.views}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <span className="mr-1">지원 {job.applicants}</span>
                </div>
                <button className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50 transition-colors">
                  상세보기 <ExternalLink className="h-3 w-3 inline ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
