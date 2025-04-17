"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { ScheduleEvent } from "./BusinessSchedule"
import { CalendarEvent } from "./CalendarEvent"
import { ScheduleModal } from "./ScheduleModal"

interface ScheduleCalendarProps {
  events: ScheduleEvent[]
  onAddEvent?: (event: Partial<ScheduleEvent>) => void
  onUpdateEvent?: (event: Partial<ScheduleEvent>) => void
}

type ViewType = "월" | "주" | "일"

export const ScheduleCalendar = ({ events, onAddEvent, onUpdateEvent }: ScheduleCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 10)) // April 10, 2025 as shown in the image
  const [view, setView] = useState<ViewType>("월")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)

  // Modal handlers
  const openAddModal = () => {
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const openEventModal = (event: ScheduleEvent) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const handleSaveEvent = (event: Partial<ScheduleEvent>) => {
    if (selectedEvent) {
      // Update existing event
      if (onUpdateEvent) {
        onUpdateEvent({ ...selectedEvent, ...event })
      }
    } else {
      // Add new event
      if (onAddEvent) {
        onAddEvent(event)
      }
    }
  }

  // Get the current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const firstDayOfWeek = firstDayOfMonth.getDay() // 0 = Sunday, 1 = Monday, etc.

  // Get the last day of the month
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()

  // Get the days from the previous month to display
  const daysFromPrevMonth = firstDayOfWeek
  const prevMonthDays = []
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
  const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate()

  for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
    prevMonthDays.push({
      date: new Date(prevMonthYear, prevMonth, i),
      day: i,
      isCurrentMonth: false,
    })
  }

  // Get the days for the current month
  const currentMonthDays = []
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push({
      date: new Date(currentYear, currentMonth, i),
      day: i,
      isCurrentMonth: true,
    })
  }

  // Get the days from the next month to display
  const totalDaysDisplayed = 42 // 6 rows of 7 days
  const daysFromNextMonth = totalDaysDisplayed - (prevMonthDays.length + currentMonthDays.length)
  const nextMonthDays = []
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear

  for (let i = 1; i <= daysFromNextMonth; i++) {
    nextMonthDays.push({
      date: new Date(nextMonthYear, nextMonth, i),
      day: i,
      isCurrentMonth: false,
    })
  }

  // Combine all days
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]

  // Group days into weeks
  const weeks = []
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7))
  }

  // Format month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const monthName = monthNames[currentMonth]

  // Navigate to previous month
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date(2025, 3, 10)) // Set to April 10, 2025 as in the image
  }

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Check if a date is today (April 10, 2025 in the image)
  const isToday = (date: Date) => {
    return date.getDate() === 10 && date.getMonth() === 3 && date.getFullYear() === 2025
  }

  // Check if a date is the highlighted day (April 13, 2025 in the image)
  const isHighlighted = (date: Date) => {
    return date.getDate() === 13 && date.getMonth() === 3 && date.getFullYear() === 2025
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        {/* Calendar Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">캘린더</h2>
          <button
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            onClick={openAddModal}
          >
            <Plus className="h-4 w-4" /> 일정 추가
          </button>
        </div>

        {/* Calendar Navigation */}
        <div className="flex justify-between items-center p-2">
          <div className="flex border rounded-md overflow-hidden">
            <button className="px-4 py-2 text-sm border-r hover:bg-gray-50" onClick={goToToday}>
              오늘
            </button>
            <button className="px-4 py-2 text-sm border-r hover:bg-gray-50" onClick={goToPrevMonth}>
              이전
            </button>
            <button className="px-4 py-2 text-sm hover:bg-gray-50" onClick={goToNextMonth}>
              다음
            </button>
          </div>

          <div className="text-lg font-medium">
            {monthName} {currentYear}
          </div>

          <div className="flex border rounded-md overflow-hidden">
            <button
              className={`px-4 py-2 text-sm ${view === "월" ? "bg-blue-600 text-white" : "hover:bg-gray-50"}`}
              onClick={() => setView("월")}
            >
              월
            </button>
            <button
              className={`px-4 py-2 text-sm border-x ${view === "주" ? "bg-blue-600 text-white" : "hover:bg-gray-50"}`}
              onClick={() => setView("주")}
            >
              주
            </button>
            <button
              className={`px-4 py-2 text-sm ${view === "일" ? "bg-blue-600 text-white" : "hover:bg-gray-50"}`}
              onClick={() => setView("일")}
            >
              일
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border-t">
          {/* Days of Week */}
          <div className="grid grid-cols-7 border-b">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={index} className="py-2 text-center font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 border-b last:border-b-0">
                {week.map((day, dayIndex) => {
                  const dayEvents = getEventsForDay(day.date)
                  const isCurrentDay = isToday(day.date)
                  const isHighlightedDay = isHighlighted(day.date)

                  return (
                    <div
                      key={dayIndex}
                      className={`min-h-[120px] border-r last:border-r-0 p-1 relative ${
                        !day.isCurrentMonth ? "text-gray-400" : ""
                      } ${isHighlightedDay ? "bg-blue-50" : ""}`}
                    >
                      <div className="flex justify-center items-center h-8 relative">
                        {isCurrentDay ? (
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                            {day.day}
                          </div>
                        ) : (
                          <span>{day.day}</span>
                        )}
                      </div>

                      {/* Events */}
                      <div className="mt-1 space-y-1">
                        {dayEvents.map((event) => (
                          <div key={event.id} onClick={() => openEventModal(event)}>
                            <CalendarEvent event={event} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      <ScheduleModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} onSave={handleSaveEvent} />
    </>
  )
}
