"use client"

import { useState, useEffect } from "react"
import { ScheduleHeader } from "./ScheduleHeader"
import { Calendar, type ScheduleEventType, type ScheduleItem } from "./Calendar"
import { ScheduleSidebar } from "./ScheduleSidebar"

function mapDtoToScheduleItem(dto: any): ScheduleItem {
  return {
    id: String(dto.id),
    eventType: dto.eventType,
    title: dto.title,
    description: dto.description ?? "",
    relatedId: dto.relatedId ? String(dto.relatedId) : undefined,
    company: dto.companyId
      ? { id: String(dto.companyId), name: dto.companyName }
      : null,
    startDateTime: dto.startDateTime,
    endDateTime: dto.endDateTime,
    isAllDay: dto.isAllDay,
    updatedAt: dto.updatedAt,
  };
}

export const ScheduleContent = () => {
  const [activeFilters, setActiveFilters] = useState<ScheduleEventType[]>([])
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: "1",
      eventType: 1, // APPLICATION_DEADLINE
      title: "카카오 채용 지원 마감",
      description: "서류 제출 마지막 날!",
      relatedId: "555",
      company: { id: "32", name: "Kakao Corp" },
      startDateTime: "2025-04-30T23:59:00",
      endDateTime: "2025-04-30T23:59:00",
      isAllDay: true,
      updatedAt: "2025-04-20T12:00:00",
    },
    {
      id: "2",
      eventType: 4, // PERSONAL_EVENT
      title: "모각코",
      description: "토요일 개발자 스터디",
      relatedId: undefined,
      company: null,
      startDateTime: "2025-04-27T14:00:00",
      endDateTime: "2025-04-27T17:00:00",
      isAllDay: false,
      updatedAt: "2025-04-21T10:33:00",
    },
    {
      id: "3",
      eventType: 2, // BOOKMARK_DEADLINE
      title: "라인 인턴십 마감",
      description: "라인 북마크 공고 지원 마감일",
      relatedId: undefined,
      company: { id: "c2", name: "라인" },
      startDateTime: "2025-04-10T23:59:59",
      endDateTime: "2025-04-10T23:59:59",
      isAllDay: true,
      updatedAt: "2025-04-03T10:00:00",
    },
  ])

  // useEffect(() => {
  //   fetch("/api/calendar/list")
  //     .then(res => res.json())
  //     .then(json => {
  //       const arr = Array.isArray(json.data) ? json.data : [];
  //       const mapped = arr.map(mapDtoToScheduleItem);
  //       setSchedules(mapped);
  //     });
  // }, []);

  const handleFilterChange = (filters: ScheduleEventType[]) => {
    setActiveFilters(filters)
  }

  const handleScheduleUpdate = (updatedSchedules: ScheduleItem[]) => {
    setSchedules(updatedSchedules)
  }

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
  }

  // Sort schedules by startDateTime for the upcoming events section
  const sortedSchedules = [...schedules].sort((a, b) => {
    return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
  })

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <ScheduleHeader />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="flex-1">
          <Calendar schedules={schedules} activeFilters={activeFilters} onScheduleUpdate={handleScheduleUpdate} />
        </div>
        <div className="w-full md:w-64">
          <ScheduleSidebar
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            upcomingEvents={sortedSchedules}
            onDeleteSchedule={handleDeleteSchedule}
          />
        </div>
      </div>
    </div>
  )
}
