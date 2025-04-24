import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { UnifiedScheduleContent } from "@/components/common/schedule/UnifiedScheduleContent"
import { mapDtoToScheduleItem, createPersonalSchedule, updatePersonalSchedule, deletePersonalSchedule } from "@/components/personal/schedule/ScheduleContent"
import { ScheduleHeader } from "@/components/personal/schedule/ScheduleHeader"
import { Footer } from "@/components/home/Footer"

async function fetchPersonalSchedules() {
  const res = await fetch("/api/personal/calendar/list");
  if (!res.ok) throw new Error("일정 데이터를 불러오지 못했습니다.");
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1 bg-gray-50">
        <UnifiedScheduleContent
          apiEndpoint="/api/personal/calendar/list"
          createSchedule={createPersonalSchedule}
          updateSchedule={updatePersonalSchedule}
          deleteSchedule={deletePersonalSchedule}
          mapDtoToScheduleItem={mapDtoToScheduleItem}
          headerComponent={<ScheduleHeader />}
        />
      </main>
      <Footer />
    </div>
  )
}
