export const JobApplicationStats = () => {
  return (
    <div className="mb-12">
      <h3 className="text-base font-bold mb-4">지원자통계</h3>
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-blue-600">27</span>
          <span className="text-sm">명</span>
        </div>
        <p className="text-xs text-gray-500">취업자/지원자 중 27명</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="text-sm font-medium mb-4 text-center">경력별 현황</h4>
          <div className="h-40 flex items-end justify-around">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-blue-500 rounded-t" style={{ height: "40px" }}></div>
              <span className="text-xs">신입</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-blue-500 rounded-t" style={{ height: "60px" }}></div>
              <span className="text-xs">1~3 년차</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-blue-500 rounded-t" style={{ height: "120px" }}></div>
              <span className="text-xs">3~5년</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-blue-500 rounded-t" style={{ height: "80px" }}></div>
              <span className="text-xs">5년 이상</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-4 text-center">연봉별 현황</h4>
          <div className="h-40 flex items-end justify-around">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-blue-500 rounded-t" style={{ height: "50px" }}></div>
              <span className="text-xs">2,500~3,000</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-blue-500 rounded-t" style={{ height: "20px" }}></div>
              <span className="text-xs">3,000~3,500</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-blue-500 rounded-t" style={{ height: "90px" }}></div>
              <span className="text-xs">3,500~4,000</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-blue-500 rounded-t" style={{ height: "110px" }}></div>
              <span className="text-xs">4,000 이상</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
