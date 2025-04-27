import { JobPostingStatusProps } from "@/types/dashboard";

export function JobPostingStatus({ data }: JobPostingStatusProps) {
  const {
    activeCount,
    expiredCount,
    draftCount,
    averageViewCount,
    averageApplyCount,
    averagePostingDays,
  } = data;

  const totalCount = activeCount + expiredCount + draftCount; // 총 공고 수

  // 각 상태별 비율 계산
  const activePercentage = (activeCount / totalCount) * 100;
  const expiredPercentage = (expiredCount / totalCount) * 100;
  const draftPercentage = (draftCount / totalCount) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">채용공고 상태</h3>
      </div>

      <div className="space-y-6">
        <StatusBar
          label="활성 채용공고"
          count={`${activeCount.toLocaleString()}개`}
          percentage={activePercentage}
          color="bg-blue-500"
        />
        <StatusBar
          label="마감된 채용공고"
          count={`${expiredCount.toLocaleString()}개`}
          percentage={expiredPercentage}
          color="bg-orange-500"
        />
        <StatusBar
          label="임시저장 채용공고"
          count={`${draftCount.toLocaleString()}개`}
          percentage={draftPercentage}
          color="bg-gray-300"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <MetricBox
          value={averageViewCount.toFixed(1)}
          description="공고당 평균 조회수"
        />
        <MetricBox
          value={averageApplyCount.toFixed(1)}
          description="공고당 평균 지원자 수"
        />
        <MetricBox
          value={averagePostingDays.toFixed(1)}
          description="평균 공고 게시 기간"
        />
      </div>
    </div>
  );
}

interface StatusBarProps {
  label: string;
  count: string;
  percentage: number;
  color: string;
}

function StatusBar({ label, count, percentage, color }: StatusBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{count}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-right mt-1">
        <span className="text-xs text-gray-500">{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
}

interface MetricBoxProps {
  value: string;
  description: string;
}

function MetricBox({ value, description }: MetricBoxProps) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold text-blue-600">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}
