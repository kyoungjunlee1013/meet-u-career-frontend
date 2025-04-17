import { FileText, Clock, CheckCircle, XCircle } from "lucide-react"

export function ApplicationMetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-blue-50 rounded">
            <FileText className="h-5 w-5 text-blue-500" />
          </div>
          <button className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">282,000</h3>
          <p className="text-sm text-gray-500">총 지원 건수</p>
        </div>
        <div className="mt-2 flex items-center text-xs text-green-500">
          <span className="font-medium">+7.2%</span>
          <span className="ml-1 text-gray-500">지난 달 대비</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-blue-50 rounded">
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <button className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">84,600</h3>
          <p className="text-sm text-gray-500">진행 중</p>
        </div>
        <div className="mt-2 flex items-center text-xs text-green-500">
          <span className="font-medium">+5.8%</span>
          <span className="ml-1 text-gray-500">지난 달 대비</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-green-50 rounded">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <button className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">56,400</h3>
          <p className="text-sm text-gray-500">합격</p>
        </div>
        <div className="mt-2 flex items-center text-xs text-green-500">
          <span className="font-medium">+3.2%</span>
          <span className="ml-1 text-gray-500">지난 달 대비</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-red-50 rounded">
            <XCircle className="h-5 w-5 text-red-500" />
          </div>
          <button className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">141,000</h3>
          <p className="text-sm text-gray-500">불합격</p>
        </div>
        <div className="mt-2 flex items-center text-xs text-green-500">
          <span className="font-medium">+6.5%</span>
          <span className="ml-1 text-gray-500">지난 달 대비</span>
        </div>
      </div>
    </div>
  )
}
