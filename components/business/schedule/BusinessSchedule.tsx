"use client"

import { useState } from "react"
import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { ScheduleCalendar } from "./ScheduleCalendar"
import { ScheduleFilter } from "./ScheduleFilter"
import { UpcomingEvents } from "./UpcomingEvents"

export interface ScheduleEvent {
  id: string
  title: string
  date: Date
  type: "recruitment" | "deadline" | "personal"
  company: "카카오" | "네이버" | "네고" | "개인"
  position?: string
  location?: string
  description?: string
  startTime?: string
  endTime?: string
}

export const BusinessSchedule = () => {
  // This is dummy data based on the image
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: "1",
      title: "서류 마감",
      date: new Date(2025, 3, 4), // April 5th
      type: "deadline",
      company: "카카오",
      position: "UX 디자이너",
    },
    {
      id: "2",
      title: "서류 전형",
      date: new Date(2025, 3, 9), // April 10th
      type: "recruitment",
      company: "카카오",
      position: "UX 디자이너",
    },
    {
      id: "3",
      title: "서류 심사 결과 발표",
      date: new Date(2025, 3, 9), // April 10th
      type: "recruitment",
      company: "카카오",
      position: "UX 디자이너",
    },
    {
      id: "4",
      title: "창업 파트",
      date: new Date(2025, 3, 9), // April 10th
      type: "deadline",
      company: "네고",
    },
    {
      id: "5",
      title: "내부 회의",
      date: new Date(2025, 3, 10), // April 11th
      type: "personal",
      company: "개인",
      description: "2분기 채용 계획 및 전략 논의",
      location: "회의실 A",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      id: "6",
      title: "1차 면접",
      date: new Date(2025, 3, 17), // April 18th
      type: "recruitment",
      company: "네이버",
      position: "백엔드 개발자",
    },
    {
      id: "7",
      title: "2차 면접",
      date: new Date(2025, 3, 21), // April 22nd
      type: "recruitment",
      company: "네이버",
      position: "백엔드 개발자",
    },
    {
      id: "8",
      title: "채용 전략 회의",
      date: new Date(2025, 3, 7), // April 8th
      type: "personal",
      company: "개인",
      description: "2분기 채용 계획 및 전략 논의",
      location: "회의실 B",
      startTime: "10:00",
      endTime: "12:00",
    },
  ])

  const [selectedTypes, setSelectedTypes] = useState<("recruitment" | "deadline" | "personal")[]>([
    "recruitment",
    "deadline",
    "personal",
  ])

  const toggleType = (type: "recruitment" | "deadline" | "personal") => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const filteredEvents = events.filter((event) => selectedTypes.includes(event.type))

  const handleAddEvent = (event: Partial<ScheduleEvent>) => {
    setEvents((prev) => [
      ...prev,
      { ...event, id: Date.now().toString(), date: new Date(event.date || "") } as ScheduleEvent,
    ])
  }

  const handleUpdateEvent = (event: Partial<ScheduleEvent>) => {
    setEvents((prev) =>
      prev.map((existingEvent) =>
        existingEvent.id === event.id
          ? ({ ...existingEvent, ...event, date: new Date(event.date || "") } as ScheduleEvent)
          : existingEvent,
      ),
    )
  }

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

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
          {/* Calendar Section */}
          <div className="flex-1">
            <ScheduleCalendar events={filteredEvents} onAddEvent={handleAddEvent} onUpdateEvent={handleUpdateEvent} />
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-[300px]">
            <ScheduleFilter selectedTypes={selectedTypes} onToggleType={toggleType} />
            <UpcomingEvents events={filteredEvents} onDeleteEvent={handleDeleteEvent} />
          </div>
        </div>
      </main>
    </div>
  )
}
