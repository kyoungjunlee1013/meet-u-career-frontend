export function ApplicationConversionRates() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-1 text-sm">
          <span>공고 조회 → 지원</span>
          <span className="font-medium">12.8%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "12.8%" }}></div>
        </div>
        <div className="mt-1 text-xs text-green-500">
          <span>+1.2% 지난 달 대비</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1 text-sm">
          <span>지원 → 서류 합격</span>
          <span className="font-medium">35.2%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "35.2%" }}></div>
        </div>
        <div className="mt-1 text-xs text-green-500">
          <span>+2.5% 지난 달 대비</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1 text-sm">
          <span>서류 합격 → 면접 합격</span>
          <span className="font-medium">42.8%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "42.8%" }}></div>
        </div>
        <div className="mt-1 text-xs text-red-500">
          <span>-1.5% 지난 달 대비</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1 text-sm">
          <span>면접 합격 → 최종 합격</span>
          <span className="font-medium">78.5%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78.5%" }}></div>
        </div>
        <div className="mt-1 text-xs text-green-500">
          <span>+2.2% 지난 달 대비</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1 text-sm">
          <span>지원 → 최종 합격</span>
          <span className="font-medium">20.0%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "20%" }}></div>
        </div>
        <div className="mt-1 text-xs text-green-500">
          <span>+1.8% 지난 달 대비</span>
        </div>
      </div>
    </div>
  )
}
