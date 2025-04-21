export const ApplicantStats = () => {
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
            <p className="text-3xl font-bold text-blue-600 mb-4">38명</p>
            <div className="text-xs text-gray-500">
              웹개발 / 웹퍼블리셔
              <span className="font-medium text-gray-700">38명</span>
            </div>
          </div>

          {/* 경력별 현황 */}
          <div className="flex flex-col justify-center items-center py-6 bg-white border-r">
            <p className="text-sm font-medium mb-6">경력별 현황</p>
            <div className="flex gap-4 h-32 items-end">
              {/* 신입 */}
              <div className="flex flex-col items-center">
                <div className="w-6 bg-blue-500" style={{ height: "80px" }}></div>
                <span className="text-xs mt-2">신입</span>
              </div>
              {/* 1년 미만 */}
              <div className="flex flex-col items-center">
                <div className="w-6 bg-gray-300" style={{ height: "0px" }}></div>
                <span className="text-xs mt-2">1년 미만</span>
              </div>
              {/* 1~3년 */}
              <div className="flex flex-col items-center">
                <div className="w-6 bg-gray-300" style={{ height: "20px" }}></div>
                <span className="text-xs mt-2">1~3년</span>
              </div>
              {/* 3~5년 */}
              <div className="flex flex-col items-center">
                <div className="w-6 bg-gray-300" style={{ height: "30px" }}></div>
                <span className="text-xs mt-2">3~5년</span>
              </div>
              {/* 5년 이상 */}
              <div className="flex flex-col items-center">
                <div className="w-6 bg-gray-300" style={{ height: "30px" }}></div>
                <span className="text-xs mt-2">5년 이상</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
