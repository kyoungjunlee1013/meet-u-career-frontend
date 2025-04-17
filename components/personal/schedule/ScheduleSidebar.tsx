"use client"
import { Calendar, CheckSquare, Building, Trash2 } from "lucide-react"
import type { ScheduleType, ScheduleItem } from "./Calendar"

interface ScheduleSidebarProps {
  activeFilters: ScheduleType[]
  onFilterChange: (filters: ScheduleType[]) => void
  upcomingEvents: ScheduleItem[]
  onDeleteSchedule: (id: string) => void
}

export const ScheduleSidebar = ({
  activeFilters,
  onFilterChange,
  upcomingEvents,
  onDeleteSchedule,
}: ScheduleSidebarProps) => {
  const toggleFilter = (type: ScheduleType) => {
    if (activeFilters.includes(type)) {
      onFilterChange(activeFilters.filter((t) => t !== type))
    } else {
      onFilterChange([...activeFilters, type])
    }
  }

  const isFilterActive = (type: ScheduleType) => {
    return activeFilters.length === 0 || activeFilters.includes(type)
  }

  return (
    <div>
      <div className="bg-white border rounded-md p-4 mb-6">
        <h2 className="text-lg font-medium mb-4">일정 유형 필터링</h2>
        <p className="text-xs text-gray-500 mb-4">보고 싶은 일정 유형을 선택하세요</p>

        <div className="space-y-2">
          <div
            className={`flex items-center gap-2 p-2 ${
              isFilterActive("interview") ? "bg-blue-50" : "bg-gray-50"
            } rounded-md text-sm cursor-pointer`}
            onClick={() => toggleFilter("interview")}
          >
            <Calendar className={`h-4 w-4 ${isFilterActive("interview") ? "text-blue-500" : "text-gray-400"}`} />
            <span>채용 지원 일정</span>
          </div>
          <div
            className={`flex items-center gap-2 p-2 ${
              isFilterActive("deadline") ? "bg-yellow-50" : "bg-gray-50"
            } rounded-md text-sm cursor-pointer`}
            onClick={() => toggleFilter("deadline")}
          >
            <Building className={`h-4 w-4 ${isFilterActive("deadline") ? "text-yellow-500" : "text-gray-400"}`} />
            <span>관심 공고 마감일</span>
          </div>
          <div
            className={`flex items-center gap-2 p-2 ${
              isFilterActive("personal") ? "bg-green-50" : "bg-gray-50"
            } rounded-md text-sm cursor-pointer`}
            onClick={() => toggleFilter("personal")}
          >
            <CheckSquare className={`h-4 w-4 ${isFilterActive("personal") ? "text-green-500" : "text-gray-400"}`} />
            <span>개인 일정</span>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-600 space-y-2">
          <div className="flex items-start">
            <span className="w-3 h-3 rounded-full bg-blue-500 mt-1 mr-2 flex-shrink-0"></span>
            <p>채용 지원 일정: 지원한 채용 공고의 면접, 결과 발표 등</p>
          </div>
          <div className="flex items-start">
            <span className="w-3 h-3 rounded-full bg-yellow-500 mt-1 mr-2 flex-shrink-0"></span>
            <p>관심 공고 마감일: 북마크한 채용 공고의 지원 마감일</p>
          </div>
          <div className="flex items-start">
            <span className="w-3 h-3 rounded-full bg-green-500 mt-1 mr-2 flex-shrink-0"></span>
            <p>개인 일정: 직접 추가한 취업 준비 관련 개인 일정</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-md p-4">
        <h2 className="text-lg font-medium mb-4">다가오는 일정</h2>

        <div className="space-y-6">
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">표시할 일정이 없습니다</p>
          ) : (
            <div className="space-y-4">
              {upcomingEvents.slice(0, 4).map((event) => {
                const eventDate = new Date(event.date)
                const formattedDate = `${eventDate.getMonth() + 1}/${eventDate.getDate()} (${["일", "월", "화", "수", "목", "금", "토"][eventDate.getDay()]})`

                let eventTypeClass = "bg-blue-50"
                let eventTypeIcon = <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                let eventTypeName = "채용 지원 일정"

                if (event.type === "deadline") {
                  eventTypeClass = "bg-yellow-50"
                  eventTypeIcon = <Building className="h-4 w-4 text-yellow-500 mr-2" />
                  eventTypeName = "관심 공고 마감일"
                } else if (event.type === "personal") {
                  eventTypeClass = "bg-green-50"
                  eventTypeIcon = <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                  eventTypeName = "개인 일정"
                }

                return (
                  <div key={event.id} className="border rounded-md overflow-hidden">
                    <div className={`flex items-center ${eventTypeClass} px-3 py-2`}>
                      {eventTypeIcon}
                      <span className="text-sm font-medium">{eventTypeName}</span>
                      <span className="ml-auto text-xs text-gray-500">{formattedDate}</span>
                    </div>
                    <div className="p-3 border-t">
                      <h3 className="font-medium text-sm mb-1">{event.title}</h3>
                      {event.description && (
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-600">{event.description}</p>
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-xs text-gray-500">{event.time || ""}</div>
                        <button
                          className="text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeleteSchedule(event.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
