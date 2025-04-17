import { Eye } from "lucide-react"

const keywords = [
  { name: "React", count: "1253개", growth: "+12%" },
  { name: "Java", count: "1120개", growth: "+8%" },
  { name: "Python", count: "980개", growth: "+15%" },
  { name: "AWS", count: "850개", growth: "+20%" },
  { name: "DevOps", count: "780개", growth: "+18%" },
  { name: "UI/UX", count: "720개", growth: "+5%" },
  { name: "Spring", count: "680개", growth: "+3%" },
  { name: "JavaScript", count: "650개", growth: "+7%" },
  { name: "Node.js", count: "620개", growth: "+10%" },
  { name: "Docker", count: "580개", growth: "+22%" },
  { name: "Kubernetes", count: "540개", growth: "+25%" },
  { name: "TypeScript", count: "520개", growth: "+17%" },
  { name: "SQL", count: "490개", growth: "+2%" },
  { name: "Git", count: "470개", growth: "+6%" },
  { name: "Agile", count: "450개", growth: "+8%" },
]

export function PopularKeywords() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">인기 채용 키워드</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <Eye className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {keywords.map((keyword) => (
          <div key={keyword.name} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium">{keyword.name}</h4>
            <p className="text-sm text-gray-500 mt-1">{keyword.count}</p>
            <p className="text-xs text-green-500 mt-1">{keyword.growth}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
