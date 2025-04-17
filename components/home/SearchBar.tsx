import { Search } from "lucide-react"

export const SearchBar = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center mb-6">
        <Search className="h-5 w-5 text-blue-500 mr-2" />
        <span className="text-blue-500 text-sm font-medium">회원님을 위한 추천공고</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {featuredJobs.map((job, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-md p-4 hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-gray-100 mb-3"></div>
            <h3 className="text-sm font-medium mb-1 line-clamp-2 h-10">{job.title}</h3>
            <div className="text-xs text-gray-500 mb-1">{job.company}</div>
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>{job.date}</span>
              <button className="text-gray-300 hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const featuredJobs = [
  {
    title: "[코웨이]2025년 3월 경력직 채용 공고(IT 직무)",
    company: "코웨이(주)",
    date: "~04.04(목)",
  },
  {
    title: "[DB하이텍 & DB글로벌칩] 경력 사원 공개채용 (반도체 제조/설계/품질)",
    company: "(주)DB하이텍",
    date: "D-2",
  },
  {
    title: "[유니크] 기업연구·경영 계획 직무 담당자 채용",
    company: "(주)유니크",
    date: "채용시",
  },
  {
    title: "[모바이스전자] 해외기획 신입 및 경력 모집",
    company: "(주)모바이스전자",
    date: "~04.18(목)",
  },
  {
    title: "신규 서비스 베리드 기획자 채용",
    company: "(주)카카오",
    date: "~04.18(목)",
  },
]
