import type { ScheduleEvent } from "./BusinessSchedule"

interface CalendarEventProps {
  event: ScheduleEvent
}

export const CalendarEvent = ({ event }: CalendarEventProps) => {
  // Determine background color based on company and type
  const getBgColor = () => {
    if (event.company === "카카오") {
      return "bg-blue-500 text-white"
    } else if (event.company === "네이버") {
      return "bg-green-500 text-white"
    } else if (event.company === "네고") {
      return "bg-amber-500 text-white"
    } else {
      return "bg-gray-400 text-white"
    }
  }

  // Format the event title
  const getEventTitle = () => {
    if (event.company === "개인") {
      return event.title
    } else {
      return `[${event.company}${event.position ? ` ${event.position}` : ""}] ${event.title}`
    }
  }

  return <div className={`text-xs px-2 py-1 rounded-sm truncate ${getBgColor()}`}>{getEventTitle()}</div>
}
