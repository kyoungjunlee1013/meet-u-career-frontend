import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { PrivacyContent } from "@/components/personal/mypage/privacy/PrivacyContent"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalHeader />
      <div className="flex">
        <PersonalSidebar activeItem="열람 차단 설정" />
        <main className="flex-1 pt-16 md:pl-64">
          <PrivacyContent />
        </main>
      </div>
    </div>
  )
}
