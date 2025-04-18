import { InterviewCard } from "./InterviewCard"

export function InterviewList({ interviews }) {
  // status 값을 카드 컴포넌트가 인식하는 값으로 변환
  const mapStatus = (status) => {
    if (status === "검토중") return "scheduled";
    if (status === "수락") return "completed";
    if (status === "거절") return "canceled";
    return status;
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 justify-center">
      {interviews.map((interview) => (
        <div key={interview.id} className="flex justify-center h-full">
          <InterviewCard interview={{ ...interview, status: mapStatus(interview.status) }} />
        </div>
      ))}
    </div>
  )
}
