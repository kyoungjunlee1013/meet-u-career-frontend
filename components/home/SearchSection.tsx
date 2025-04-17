import { Search } from "lucide-react"

export const SearchSection = () => {
  return (
    <div className="mb-8">
      <div className="bg-[#f0f7ff] rounded-md p-3 flex items-center">
        <Search className="h-5 w-5 text-blue-500 mr-2" />
        <input
          type="text"
          placeholder="원하시는 채용 공고를 검색해보세요"
          className="bg-transparent border-none outline-none flex-1 text-sm placeholder-blue-400 text-blue-600"
        />
      </div>
    </div>
  )
}
