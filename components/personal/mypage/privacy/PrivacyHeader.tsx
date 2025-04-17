import { PrivacySearch } from "./PrivacySearch"

export function PrivacyHeader() {
  const handleSearch = (term: string) => {
    // Implement search functionality here
    console.log("Searching for:", term)
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">열람 차단 설정</h1>
        <PrivacySearch onSearch={handleSearch} />
      </div>
      <p className="text-gray-600">
        특정 기업이 내 프로필을 열람하지 못하도록 차단할 수 있습니다. 차단된 기업은 내 프로필을 검색하거나 열람할 수
        없습니다.
      </p>
    </div>
  )
}
