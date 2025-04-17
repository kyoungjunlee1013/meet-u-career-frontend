import FindIdContent from "@/components/find-id/FindIdContent"
import LoginHeader from "@/components/login/LoginHeader"

export default function FindIdPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <LoginHeader />
      <FindIdContent />
    </div>
  )
}
