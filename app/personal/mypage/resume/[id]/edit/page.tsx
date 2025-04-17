import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader"
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar"
import { ResumeEditor } from "@/components/personal/mypage/resume/ResumeEditor"

export default function EditResumePage({
  params,
}: {
  params: { id: string }
}) {
  const resumeId = params.id

  return (
    <main className="min-h-screen bg-gray-50">
      <PersonalHeader toggleSidebar={() => {}} />
      <div className="pt-16 md:pl-64">
        <PersonalSidebar isOpen={true} activeItem="이력서 관리" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ResumeEditor resumeType="direct" resumeId={resumeId} isEditMode={true} />
        </div>
      </div>
    </main>
  )
}
