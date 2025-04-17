import { InterviewCard } from "./InterviewCard"

export function InterviewList() {
  const interviews = [
    {
      id: 1,
      status: "scheduled",
      date: "2023-06-15T14:00:00",
      company: "(주)사람인HR",
      position: "웹 프론트엔드 개발자",
      location: "서울 강남구 테헤란로 152",
      time: "오후 2:00",
      interviewer: "김인사 팀장",
      logo: "/abstract-company-logo.png",
    },
    {
      id: 2,
      status: "completed",
      date: "2023-06-10T10:30:00",
      company: "테크스타트(주)",
      position: "React 개발자",
      location: "온라인 화상면접",
      time: "오전 10:30",
      interviewer: "박개발 CTO",
      hasReview: true,
      logo: "/abstract-corporate-logo.png",
    },
    {
      id: 3,
      status: "canceled",
      date: "2023-05-25T15:30:00",
      company: "글로벌소프트(주)",
      position: "백엔드 개발자",
      location: "서울 영등포구 여의도동 45",
      time: "오후 3:30",
      interviewer: "이기술 이사",
      logo: "/abstract-geometric-company.png",
    },
  ]

  return (
    <div>
      {interviews.map((interview) => (
        <div key={interview.id} className="p-4 hover:bg-gray-50 transition-colors">
          <InterviewCard interview={interview} />
        </div>
      ))}
    </div>
  )
}
