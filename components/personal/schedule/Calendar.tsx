"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { ScheduleModal } from "./ScheduleModal"

// 엔티티 기반 일정 유형 상수(enum)
export enum ScheduleEventType {
  APPLICATION_DEADLINE = 1,   // 지원 마감
  BOOKMARK_DEADLINE = 2,      // 스크랩 마감
  COMPANY_EVENT = 3,          // 기업 행사
  PERSONAL_EVENT = 4,         // 개인 커스텀 일정
}

// 엔티티 기반 ScheduleItem 타입
export interface ScheduleItem {
  id: string;
  eventType: ScheduleEventType;
  title: string;
  description?: string;
  relatedId?: string;
  company?: { id: string; name: string } | null;
  startDateTime: string; // ISO
  endDateTime: string;   // ISO
  isAllDay: boolean;
  updatedAt: string;     // ISO
}

interface CalendarProps {
  schedules: ScheduleItem[];
  activeFilters: ScheduleEventType[];
  onScheduleUpdate: (schedule: ScheduleItem) => void;
  onAddSchedule: (schedule: ScheduleItem) => void;
  onDelete: (id: string) => void;
}

export const Calendar = ({ schedules, activeFilters, onScheduleUpdate, onAddSchedule, onDelete }: CalendarProps) => {
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | undefined>(undefined)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  

  const getCalendarData = () => {
    // Get the first day of the month (0-6, where 0 is Sunday)
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    // 일요일(0)부터 시작하도록 변경
    const firstDayIndex = firstDayOfMonth; // 0:일, 1:월, ..., 6:토

    // Get the last day of the month
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    // Get the last day of the previous month
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

    // Calculate days from previous month to display
    const daysFromPrevMonth = firstDayIndex

    // Calculate total days needed to fill the calendar (typically 42 - a 6x7 grid)
    const totalDays = 42 // 6 rows of 7 days

    const calendarData = []

    // Add days from previous month
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = lastDayOfPrevMonth - i
      calendarData.push({
        day,
        month: "prev",
        date: new Date(currentYear, currentMonth - 1, day),
        events: [],
      })
    }

    // Add days from current month
    for (let day = 1; day <= lastDayOfMonth; day++) {
      calendarData.push({
        day,
        month: "current",
        date: new Date(currentYear, currentMonth, day),
        events: [],
      })
    }

    // Add days from next month to fill the grid
    const remainingDays = totalDays - calendarData.length
    for (let day = 1; day <= remainingDays; day++) {
      calendarData.push({
        day,
        month: "next",
        date: new Date(currentYear, currentMonth + 1, day),
        events: [],
      })
    }

    return calendarData
  }

  const calendarData = getCalendarData()

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"]

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
    setView("month")
  }

  const goToThisWeek = () => {
    const today = new Date()
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
    setView("week")
  }

  const goToNextWeek = () => {
    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(today.getDate() + 7)
    setCurrentMonth(nextWeek.getMonth())
    setCurrentYear(nextWeek.getFullYear())
    setView("day")
  }

  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

  // Helper function to format a date as YYYY-MM-DD
  const formatDateString = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // +1 because months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Helper function to create a valid date with proper month handling
  const createValidDate = (year: number, month: number, day: number): Date => {
    // Handle month overflow/underflow
    let adjustedYear = year
    let adjustedMonth = month

    if (month < 0) {
      adjustedMonth = 11 // December
      adjustedYear = year - 1
    } else if (month > 11) {
      adjustedMonth = 0 // January
      adjustedYear = year + 1
    }

    return new Date(adjustedYear, adjustedMonth, day)
  }

  const openAddModal = (day?: number) => {
    if (day) {
      setSelectedDate(new Date(currentYear, currentMonth, day))

      // Create a new schedule with the formatted date
      setSelectedSchedule({
        id: "",
        eventType: ScheduleEventType.PERSONAL_EVENT,
        title: "",
        description: "",
        relatedId: undefined,
        company: null,
        // 클릭한 날짜를 'YYYY-MM-DDT00:00'으로 세팅
        startDateTime: formatDateString(new Date(currentYear, currentMonth, day)) + 'T00:00',
        endDateTime: formatDateString(new Date(currentYear, currentMonth, day)) + 'T00:00',
        isAllDay: false,
        updatedAt: formatDateString(new Date()),
      })
    } else {
      setSelectedDate(null)
      // When no day is selected, create a schedule for today
      const today = new Date()
      setSelectedSchedule({
        id: "",
        eventType: ScheduleEventType.PERSONAL_EVENT,
        title: "",
        description: "",
        relatedId: undefined,
        company: null,
        startDateTime: formatDateString(today),
        endDateTime: formatDateString(today),
        isAllDay: false,
        updatedAt: formatDateString(today),
      })
    }

    setIsEditing(false)
    setIsModalOpen(true)
  }

  const openEditModal = (schedule: ScheduleItem) => {
    setSelectedSchedule(schedule)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleSaveSchedule = (schedule: ScheduleItem) => {
    try {
      const scheduleDate = new Date(schedule.startDateTime)

      // Verify the date is valid
      if (isNaN(scheduleDate.getTime())) {
        throw new Error("Invalid date")
      }

      const updatedSchedule = {
        ...schedule,
      }

      if (isEditing) {
        // 수정: 단일 일정만 전달
        onScheduleUpdate(updatedSchedule);
      } else {
        // 추가: 새로운 일정 객체 생성 후 onAddSchedule로 전달
        const newId = Date.now().toString();
        onAddSchedule({ ...updatedSchedule, id: newId });
      }
    } catch (error) {
      console.error("Error saving schedule:", error)
      // Could add user feedback here
    }
  }

  const getFilteredSchedules = (day: number, month: string) => {
    return schedules.filter((event: ScheduleItem) => {
      if (month !== "current") return false;
      if (activeFilters.length > 0 && !activeFilters.includes(event.eventType)) return false;
      // 날짜를 로컬 Date 객체로 비교 (타임존 문제 방지)
      const eventDate = new Date(event.startDateTime);
      const cellDate = new Date(currentYear, currentMonth, day);
      return (
        eventDate.getFullYear() === cellDate.getFullYear() &&
        eventDate.getMonth() === cellDate.getMonth() &&
        eventDate.getDate() === cellDate.getDate()
      );
    });
  }

  return (
    <div className="bg-white border rounded-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 text-sm rounded-md ${view === "month" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            onClick={goToToday}
          >
            오늘
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${view === "week" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            onClick={goToThisWeek}
          >
            이번
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${view === "day" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            onClick={goToNextWeek}
          >
            다음
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-md hover:bg-gray-100" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-medium">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button className="p-1 rounded-md hover:bg-gray-100" onClick={goToNextMonth}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <button
          className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700"
          onClick={() => openAddModal()}
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">일정 추가</span>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0 border-t border-l">
        {weekdays.map((day, index) => (
          <div key={day} className="py-2 text-center text-sm font-medium border-r border-b bg-gray-50">
            {day}
          </div>
        ))}

        {calendarData.map((day, index) => {
          const isToday =
            day.month === "current" &&
            day.day === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()

          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border-r border-b relative 
              ${day.month !== "current" ? "bg-gray-100" : ""} 
              ${isToday ? "bg-blue-50" : ""}`}
              onClick={() => day.month === "current" && openAddModal(day.day)}
            >
              <div className={`text-sm mb-2 ${isToday ? "font-bold text-blue-600" : ""}`}>{day.day}</div>
              {getFilteredSchedules(day.day, day.month).map((event: ScheduleItem) => {
                let bgColor = "bg-blue-100 text-blue-800";
                let borderColor = "border-blue-200";

                // eventType(enum) 기반 색상 매핑
                switch (event.eventType) {
                  case ScheduleEventType.APPLICATION_DEADLINE:
                    bgColor = "bg-blue-100 text-blue-800";
                    borderColor = "border-blue-200";
                    break;
                  case ScheduleEventType.BOOKMARK_DEADLINE:
                    bgColor = "bg-yellow-100 text-yellow-800";
                    borderColor = "border-yellow-200";
                    break;
                  case ScheduleEventType.COMPANY_EVENT:
                    bgColor = "bg-purple-100 text-purple-800";
                    borderColor = "border-purple-200";
                    break;
                  case ScheduleEventType.PERSONAL_EVENT:
                    bgColor = "bg-green-100 text-green-800";
                    borderColor = "border-green-200";
                    break;
                }

                return (
                  <div
                    key={event.id}
                    className={`${bgColor} text-xs p-1.5 rounded border ${borderColor} mb-1 truncate cursor-pointer hover:opacity-80`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(event);
                    }}
                  >
                    {event.title}
                  </div>
                );
              })}
            </div>
          )
        })}
      </div>

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSchedule}
        schedule={selectedSchedule}
        isEditing={isEditing}
        onDelete={onDelete}
      />
    </div>
  )
}
