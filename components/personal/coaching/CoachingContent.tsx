import { ResumeHeader } from "./ResumeHeader"
import { ResumeSettings } from "./ResumeSettings"
import { NotificationBox } from "./NotificationBox"
import { ResumeEditor } from "./ResumeEditor"

export const CoachingContent = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="bg-white border rounded-md p-6 mb-6">
        <ResumeHeader />
        <ResumeSettings />
      </div>
      <NotificationBox />
      <ResumeEditor />
    </div>
  )
}
