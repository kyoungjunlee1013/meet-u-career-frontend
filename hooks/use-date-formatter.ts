import { format, parseISO } from "date-fns"
import { ko } from "date-fns/locale"

export function useDateFormatter() {
  // Format date as "4/5 (Sat)"
  const formatScheduleDate = (dateString: string) => {
    const date = parseISO(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekday = format(date, "EEE", { locale: ko })

    return `${month}/${day} (${weekday})`
  }

  return {
    formatScheduleDate,
  }
}
