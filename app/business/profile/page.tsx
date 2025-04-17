import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { ProfileContent } from "@/components/business/profile/ProfileContent"

export default function BusinessProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <ProfileContent />
    </div>
  )
}
