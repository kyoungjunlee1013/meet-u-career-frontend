"use client"

import { useState } from "react"
import { ScheduleHeader } from "./ScheduleHeader"
import { Calendar, type ScheduleType, type ScheduleItem } from "./Calendar"
import { ScheduleSidebar } from "./ScheduleSidebar"

export const ScheduleContent = () => {
  const [activeFilters, setActiveFilters] = useState<ScheduleType[]>([])
  const [schedules, setSchedules] = useState<ScheduleItem[]>([])

  const handleFilterChange = (filters: ScheduleType[]) => {
    setActiveFilters(filters)
  }

  const handleScheduleUpdate = (updatedSchedules: ScheduleItem[]) => {
    setSchedules(updatedSchedules)
  }

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
  }

  // Sort schedules by date for the upcoming events section
  const sortedSchedules = [...schedules].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <ScheduleHeader />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="flex-1">
          <Calendar activeFilters={activeFilters} onScheduleUpdate={handleScheduleUpdate} />
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
