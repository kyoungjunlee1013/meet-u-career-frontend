import { InterviewList } from "./InterviewList"

export function InterviewStatusTab({ interviews }) {
  if (!interviews.length) {
    return <div className="text-center text-gray-400 py-8">해당 상태의 면접 일정이 없습니다.</div>;
  }
  return (
    <div className="divide-y divide-gray-100">
      <InterviewList interviews={interviews} />
    </div>
  );
}
