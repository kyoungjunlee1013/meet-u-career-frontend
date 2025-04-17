"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"
import type { ScheduleEvent } from "./BusinessSchedule"

interface UpcomingEventsProps {
  events: ScheduleEvent[]
  onDeleteEvent?: (id: string) => void
}

export const UpcomingEvents = ({ events, onDeleteEvent }: UpcomingEventsProps) => {
  // Track which events are expanded
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())

  // Only show future events
  const upcomingEvents = sortedEvents.filter((event) => event.date >= new Date(2025, 3, 1))

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
    return `${month}/${day} (${weekday})`
  }

  const getEventIcon = (event: ScheduleEvent) => {
    if (event.type === "deadline") {
      return <Clock className="w-4 h-4 text-orange-500" />
    } else if (event.type === "personal") {
      return <Calendar className="w-4 h-4 text-blue-500" />
    } else {
      return <Calendar className="w-4 h-4 text-green-600" />
    }
  }

  const getEventBgColor = (event: ScheduleEvent) => {
    if (event.type === "deadline") {
      return "bg-orange-50"
    } else if (event.type === "personal") {
      return "bg-blue-50"
    } else {
      return "bg-green-50"
    }
  }

  const getEventTextColor = (event: ScheduleEvent) => {
    if (event.type === "deadline") {
      return "text-orange-500"
    } else if (event.type === "personal") {
      return "text-blue-500"
    } else {
      return "text-green-600"
    }
  }

  const getEventTitle = (event: ScheduleEvent) => {
    if (event.company === "카카오" && event.position) {
      return `[카카오 ${event.position}] ${event.title}`
    } else if (event.company === "네이버" && event.position) {
      return `[네이버 ${event.position}] ${event.title}`
    } else if (event.company === "네고") {
      return `[네고 창업] ${event.title}`
    } else {
      return event.title
    }
  }

  const toggleEventExpand = (eventId: string) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null)
    } else {
      setExpandedEventId(eventId)
    }
  }

  return (
    <div>
      <h3 className="text-base font-medium mb-2">다가오는 일정</h3>
      <p className="text-xs text-gray-500 mb-3">2025년 4월</p>

      <div className="space-y-6">
        {upcomingEvents.map((event) => {
          const isExpanded = expandedEventId === event.id
          const isPersonal = event.type === "personal"

          return (
            <div
              key={event.id}
              className={`relative pl-4 border-l-2 border-blue-500 ${isPersonal ? "cursor-pointer" : ""}`}
              onClick={isPersonal ? () => toggleEventExpand(event.id) : undefined}
            >
              <div className="flex justify-between items-start mb-1">
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${getEventBgColor(event)}`}>
                  {getEventIcon(event)}
                  <span className={`text-xs font-medium ${getEventTextColor(event)}`}>
                    {event.type === "recruitment" ? "전형 일정" : event.type === "deadline" ? "마감 일정" : "개인 일정"}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
              </div>

              {/* Event Title */}
              <p className="text-sm font-medium">{event.type === "personal" ? event.title : getEventTitle(event)}</p>

              {/* Expanded View for Personal Events */}
              {isExpanded && isPersonal && (
                <div className="mt-2 bg-gray-50 rounded-md p-3">
                  {event.description && (
                    <div className="mb-2">
                      <span className="text-sm font-medium">설명: </span>
                      <span className="text-sm">{event.description}</span>
                    </div>
                  )}

                  {event.startTime && event.endTime && (
                    <div className="mb-2">
                      <span className="text-sm font-medium">시간: </span>
                      <span className="text-sm">
                        {event.startTime} - {event.endTime}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-end mt-2">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded-md text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onDeleteEvent) onDeleteEvent(event.id)
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
