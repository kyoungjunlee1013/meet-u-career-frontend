import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { ScheduleHeader } from "@/components/business/schedule/ScheduleHeader"
import { ScheduleCalendar } from "@/components/business/schedule/ScheduleCalendar"
import { ScheduleSidebar } from "@/components/business/schedule/ScheduleSidebar"
import { ScheduleFooter } from "@/components/business/schedule/ScheduleFooter"

export const BusinessScheduleManagement = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BusinessHeader />
      <main className="flex-1 px-6 py-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScheduleHeader />
          <div className="mt-6 flex flex-col lg:flex-row gap-6">
            <div className="lg:flex-1">
              <ScheduleCalendar />
            </div>
            <div className="w-full lg:w-72">
              <ScheduleSidebar />
            </div>
          </div>
        </div>
      </main>
      <ScheduleFooter />
    </div>
  )
}
