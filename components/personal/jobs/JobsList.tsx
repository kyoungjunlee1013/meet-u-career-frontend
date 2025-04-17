import Link from "next/link"
import { JobCard } from "./JobCard"

export const JobsList = () => {
  const jobListings = [
    {
      id: 1,
      company: "카카오",
      title: "경영 전략 채용",
      location: "서울 강남구",
      requirements: "경력 3년이상 필요",
      viewCount: "05/30(목)",
      href: "/personal/jobs/1",
      isRecommended: true,
    },
    {
      id: 2,
      company: "네이버",
      title: "경영 신입 채용",
      location: "경기 성남시",
      requirements: "경력 1년이상 필요",
      viewCount: "06/15(금)",
      href: "/personal/jobs/2",
      isRecommended: true,
      tag: "추천 TOP100",
    },
    {
      id: 3,
      company: "메가스터디",
      title: "인사 경력 채용",
      location: "경기 성남시",
      requirements: "경력 3년이상 필요",
      viewCount: "05/15(목)",
      href: "/personal/jobs/3",
      isRecommended: true,
    },
    {
      id: 4,
      company: "LG전자",
      title: "경영 전략 채용",
      location: "서울 강서구",
      requirements: "경력 3년이상 필요",
      viewCount: "05/25(목)",
      href: "/personal/jobs/4",
      isRecommended: true,
      tag: "추천 TOP100",
    },
    {
      id: 5,
      company: "우아한형제들",
      title: "경영 전략 채용",
      location: "경기 성남시",
      requirements: "경력 3년이상 필요",
      viewCount: "05/15(목)",
      href: "/personal/jobs/5",
      isRecommended: true,
      tag: "추천 TOP100",
    },
    {
      id: 6,
      company: "삼성전자",
      title: "마케팅 신입 채용",
      location: "서울 강남구",
      requirements: "경력 1년이상 필요",
      viewCount: "05/20(목)",
      href: "/personal/jobs/6",
      isRecommended: true,
      tag: "추천 TOP100",
    },
    {
      id: 7,
      company: "카카오",
      title: "마케팅 경력 채용",
      location: "서울 강남구",
      requirements: "경력 3년이상 필요",
      viewCount: "05/30(목)",
      href: "/personal/jobs/7",
      isRecommended: true,
    },
    {
      id: 8,
      company: "우아한형제들",
      title: "경영 전략 채용",
      location: "경기 성남시",
      requirements: "경력 3년이상 필요",
      viewCount: "05/15(목)",
      href: "/personal/jobs/8",
      isRecommended: true,
    },
    {
      id: 9,
      company: "네이버",
      title: "마케팅 신입 채용",
      location: "경기 성남시",
      requirements: "경력 1년이상 필요",
      viewCount: "05/20(목)",
      href: "/personal/jobs/9",
      isRecommended: true,
    },
    {
      id: 10,
      company: "LG전자",
      title: "서비스 신입 채용",
      location: "서울 강서구",
      requirements: "경력 1년이상 필요",
      viewCount: "05/25(목)",
      href: "/personal/jobs/10",
      isRecommended: true,
      tag: "추천 TOP100",
    },
    {
      id: 11,
      company: "메가스터디",
      title: "서비스 신입 채용",
      location: "서울 강남구",
      requirements: "경력 1년이상 필요",
      viewCount: "05/25(목)",
      href: "/personal/jobs/11",
      isRecommended: true,
    },
    {
      id: 12,
      company: "네이버",
      title: "경영 전략 채용",
      location: "경기 성남시",
      requirements: "경력 3년이상 필요",
      viewCount: "05/15(목)",
      href: "/personal/jobs/12",
      isRecommended: true,
    },
  ]

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">오늘의 채용공고</h2>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <Link href="/personal/jobs/newest" className="hover:underline">
            최신순
          </Link>
          <Link href="/personal/jobs/popular" className="hover:underline">
            인기순
          </Link>
          <Link href="/personal/jobs/recommended" className="hover:underline">
            추천채용순
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobListings.map((job) => (
          <JobCard
            key={job.id}
            company={job.company}
            title={job.title}
            location={job.location}
            requirements={job.requirements}
            viewCount={job.viewCount}
            href={job.href}
            isRecommended={job.isRecommended}
            tag={job.tag}
          />
        ))}
      </div>
    </div>
  )
}
