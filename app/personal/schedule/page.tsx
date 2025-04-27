import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { UnifiedScheduleContent } from "@/components/common/schedule/UnifiedScheduleContent"
import { mapDtoToScheduleItem, createPersonalSchedule, updatePersonalSchedule, deletePersonalSchedule } from "@/components/personal/schedule/ScheduleContent"
import { ScheduleHeader } from "@/components/personal/schedule/ScheduleHeader"
import { Footer } from "@/components/home/Footer"

import { apiClient } from "@/api/apiClient";

async function fetchPersonalSchedules() {
  const res = await apiClient.get("/api/personal/calendar/list");
  // apiClient는 status 체크와 에러 처리를 axios 방식으로 하므로, 필요에 따라 try/catch로 감싸도 됨
  const json = res.data;
  return Array.isArray(json.data) ? json.data : [];
}

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1 bg-gray-50">
        <UnifiedScheduleContent
          userType="personal"
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
