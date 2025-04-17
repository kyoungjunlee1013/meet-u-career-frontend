import { FileText, AlertCircle, CheckCircle } from "lucide-react"

export const JobStatistics = () => {
  const stats = [
    {
      title: "진행 공고",
      count: 12,
      icon: <FileText className="h-5 w-5 text-gray-600" />,
    },
    {
      title: "진행중 공고",
      count: 8,
      icon: <FileText className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "마감임박 공고",
      count: 3,
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    },
    {
      title: "일자리형 공고",
      count: 1,
      icon: <CheckCircle className="h-5 w-5 text-gray-600" />,
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-md shadow-sm p-4 flex items-center">
          <div className="mr-4">{stat.icon}</div>
          <div>
            <p className="text-sm text-gray-600">{stat.title}</p>
            <p className="text-xl font-semibold mt-1">
              {stat.count}
              <span className="text-sm font-normal text-gray-500 ml-1">건</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
