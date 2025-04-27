"use client"

import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { UnifiedScheduleContent } from "@/components/common/schedule/UnifiedScheduleContent";
import {
  createBusinessSchedule,
  updateBusinessSchedule,
  deleteBusinessSchedule,
  mapBusinessDtoToScheduleItem
} from "./BusinessScheduleContent";

export function BusinessSchedule() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <BusinessHeader />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">일정 관리</h1>
          <p className="text-sm text-gray-600 mt-1">채용 공고별 전형 진행 상황 및 마감 일정을 한눈에 관리하세요.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Calendar Section (통합 캘린더로 교체) */}
          <div className="flex-1">
            <UnifiedScheduleContent
              apiEndpoint="/api/personal/calendar/business/list"
              createSchedule={createBusinessSchedule}
              updateSchedule={updateBusinessSchedule}
              deleteSchedule={deleteBusinessSchedule}
              mapDtoToScheduleItem={mapBusinessDtoToScheduleItem}
              userType="business"
            />
          </div>

          {/* Sidebar/Filter (원한다면 이 부분도 통합 캘린더 props로 분리 가능) */}
          {/* <div className="w-full md:w-[300px]">
            <ScheduleFilter ... />
            <UpcomingEvents ... />
          </div> */}
        </div>
      </main>
    </div>
  );
}
