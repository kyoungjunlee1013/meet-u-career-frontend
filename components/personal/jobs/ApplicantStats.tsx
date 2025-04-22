interface ApplicantStatsProps {
  title: string;
  applicantStats: {
    totalApplicantCount: number;
    experienceStats: {
      newApplicantCount: number;
      experiencedApplicantCount: number;
    };
  };
}

export const ApplicantStats = ({ title, applicantStats }: ApplicantStatsProps) => {
  const { totalApplicantCount, experienceStats } = applicantStats;
  const { newApplicantCount, experiencedApplicantCount } = experienceStats;

  // 막대 높이 계산
  const BAR_HEIGHT = 100; // 기준 높이 (px)
  const totalExp = newApplicantCount + experiencedApplicantCount || 1; // 0 방지
  const newHeight = (newApplicantCount / totalExp) * BAR_HEIGHT; // px 단위
  const expHeight = (experiencedApplicantCount / totalExp) * BAR_HEIGHT; // px 단위

  return (
    <div className="mb-8">
      {/* 제목: 컴포넌트 외부 좌측 정렬 */}
      <h3 className="text-lg font-bold mb-2 text-left">지원자 통계</h3>

      {/* 통계 카드 */}
      <div className="border rounded-md overflow-hidden">
        <div className="grid grid-cols-2 border-t text-center">
          {/* 지원자수 */}
          <div className="flex flex-col items-center justify-center py-6 bg-white border-r">
            <p className="text-sm text-gray-500 mb-2">지원자수</p>
            <p className="text-3xl font-bold text-blue-600 mb-4">{totalApplicantCount}명</p>
            <div className="flex justify-between items-center w-[80%] text-xs text-gray-500 px-0 mt-3 mx-auto">
              <span className="truncate whitespace-nowrap">{title}</span>
              <span className="font-medium text-gray-700 whitespace-nowrap">{totalApplicantCount}명</span>
            </div>
          </div>

          {/* 경력별 현황 */}
          <div className="flex flex-col justify-center items-center py-6 bg-white border-r">
            <p className="text-sm font-medium mb-6">경력별 현황</p>
            <div className="flex gap-4 h-32 items-end">
              {/* 신입 */}
              <div className="flex flex-col items-center relative group">
                <div className="w-6 bg-blue-500" style={{ height: `${newHeight}px` }}></div>

                {/* 툴팁 */}
                <div className="absolute -top-6 px-2 py-1 bg-[#1842a3] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap text-center">
                  {newApplicantCount}명
                </div>

                <span className="text-xs mt-2">신입</span>
              </div>

              {/* 경력 */}
              <div className="flex flex-col items-center relative group">
                <div className="w-6 bg-gray-300" style={{ height: `${expHeight}px` }}></div>

                {/* 툴팁 */}
                <div className="absolute -top-6 px-2 py-1 bg-[#1842a3] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap text-center">
                  {experiencedApplicantCount}명
                </div>

                <span className="text-xs mt-2">경력</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
