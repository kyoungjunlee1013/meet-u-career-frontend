import Link from "next/link"
import { ChevronRight, MapPin, Calendar, DollarSign, Bookmark } from "lucide-react"

export function RecommendedJobs() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">추천 공고</h2>
        <Link href="/personal/jobs" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          전체보기 <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full p-6"
            >
              {/* 상단: 회사/포지션/로고 */}
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 mr-3 bg-gray-200"></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base leading-tight">{job.company}</h4>
                  <p className="text-sm text-gray-600 mt-0.5">{job.title}</p>
                </div>
              </div>
              {/* 상세 정보 */}
              <div className="flex flex-col gap-1 text-sm text-gray-700 mb-4 mt-2">
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>마감일: {job.deadline}</span>
                </div>
              </div>
              {/* 태그 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {/* 하단: 지원하기/북마크 */}
              <div className="flex items-end justify-between mt-6">
                <button
                  className="h-10 px-6 border border-blue-600 text-blue-600 bg-white text-sm font-medium rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  지원하기
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const recommendedJobs = [
  {
    company: "(주)사람인HR",
    title: "프론트엔드 개발자",
    location: "서울 강남구",
    salary: "5,000만원 ~ 7,000만원",
    deadline: "2023-04-15",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    company: "테크스타트(주)",
    title: "백엔드 개발자",
    location: "서울 서초구",
    salary: "6,000만원 ~ 8,000만원",
    deadline: "2023-04-20",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    company: "글로벌소프트(주)",
    title: "풀스택 개발자",
    location: "서울 영등포구",
    salary: "7,000만원 ~ 9,000만원",
    deadline: "2023-04-25",
    skills: ["React", "Node.js", "AWS"],
  },
]
