"use client";
import { apiClient } from "@/api/apiClient";

import { useState, useEffect } from "react";
import { ScheduleHeader } from "./ScheduleHeader";
import {
  Calendar,
  type ScheduleEventType,
  type ScheduleItem,
} from "./Calendar";
import { ScheduleSidebar } from "./ScheduleSidebar";

// 일정 수정 API 호출 함수
export async function updatePersonalSchedule(schedule: ScheduleItem) {
  const numericId = Number(schedule.id);
  const payload = {
    eventType: schedule.eventType,
    title: schedule.title,
    description: schedule.description,
    relatedId: schedule.relatedId ?? null,
    companyId: schedule.company?.id ?? null,
    companyName: schedule.company?.name ?? null,
    startDateTime:
      schedule.startDateTime.length === 16
        ? schedule.startDateTime + ":00"
        : schedule.startDateTime,
    endDateTime:
      schedule.endDateTime.length === 16
        ? schedule.endDateTime + ":00"
        : schedule.endDateTime,
    isAllDay: schedule.isAllDay,
  };
  const res = await apiClient.post(
    `/api/personal/calendar/update/${numericId}`,
    payload
  );
  return res.data;
}

function toIsoString(date: any): string {
  // LocalDateTime(Java) → ISO string 변환 보장
  if (!date) return new Date().toISOString();
  if (typeof date === "string") return date;
  if (date instanceof Date) return date.toISOString();
  // dayjs, moment, 또는 {year, month, day, ...} 등 다양한 구조 방어
  if (typeof date === "object" && date.year && date.month && date.day) {
    try {
      return new Date(
        date.year,
        date.month - 1,
        date.day,
        date.hour || 0,
        date.minute || 0,
        date.second || 0
      ).toISOString();
    } catch {
      return new Date().toISOString();
    }
  }
  return String(date);
}

export function mapDtoToScheduleItem(dto: any): ScheduleItem {
  // CalendarPersonalDTO (로그인)와 PublicCalendarItemDTO(비로그인) 모두 대응
  if (dto.eventType !== undefined) {
    // CalendarPersonalDTO
    return {
      id: String(dto.id ?? `${dto.eventType}-${dto.relatedId ?? dto.title}`),
      eventType: dto.eventType,
      title: dto.title,
      description: dto.description ?? "",
      relatedId: dto.relatedId ? String(dto.relatedId) : undefined,
      company:
        dto.companyId && dto.companyName
          ? { id: String(dto.companyId), name: dto.companyName }
          : null,
      startDateTime: toIsoString(dto.startDateTime),
      endDateTime: toIsoString(dto.endDateTime),
      isAllDay: dto.isAllDay ?? true,
      updatedAt: toIsoString(dto.updatedAt),
    };
  } else if (dto.expirationDate && dto.companyName) {
    // PublicCalendarItemDTO (비로그인)
    return {
      id: `public-${dto.title}-${toIsoString(dto.expirationDate)}`,
      eventType: 1, // APPLICATION_DEADLINE 등 기본값 (임의 지정)
      title: dto.title,
      description: "",
      relatedId: undefined,
      company: { id: "public", name: dto.companyName },
      startDateTime: toIsoString(dto.expirationDate),
      endDateTime: toIsoString(dto.expirationDate),
      isAllDay: true,
      updatedAt: toIsoString(dto.expirationDate),
    };
  } else {
    // 알 수 없는 구조 방어
    return {
      id: `unknown-${Math.random()}`,
      eventType: 4, // PERSONAL_EVENT 등 임의값
      title: dto.title ?? "알 수 없는 일정",
      description: "",
      relatedId: undefined,
      company: null,
      startDateTime: toIsoString(dto.startDateTime),
      endDateTime: toIsoString(dto.endDateTime),
      isAllDay: true,
      updatedAt: toIsoString(dto.updatedAt),
    };
  }
}

export async function createPersonalSchedule(schedule: ScheduleItem) {
  const payload = {
    eventType: 4,
    title: schedule.title,
    description: schedule.description,
    relatedId: schedule.relatedId ?? null,
    companyId: schedule.company?.id ?? null,
    companyName: schedule.company?.name ?? null,
    startDateTime:
      schedule.startDateTime.length === 16
        ? schedule.startDateTime + ":00"
        : schedule.startDateTime,
    endDateTime:
      schedule.endDateTime.length === 16
        ? schedule.endDateTime + ":00"
        : schedule.endDateTime,
    isAllDay: schedule.isAllDay,
  };

  const res = await apiClient.post("/api/personal/calendar/create", payload);
  return res.data;
}

export const handleDeleteSchedule = async (id: string) => {
  // 기존 삭제 로직 복사
  try {
    const numericId = Number(id);
    const res = await apiClient.post(
      `/api/personal/calendar/delete/${numericId}`
    );
    return res.data;
  } catch (error) {
    alert("일정 삭제 실패: " + (error as Error).message);
  }
};

const ScheduleContent = () => {
  const [activeFilters, setActiveFilters] = useState<ScheduleEventType[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Calendar view state lifted up
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // 일정 추가 핸들러 (백엔드 연동)
  const handleAddSchedule = async (schedule: ScheduleItem) => {
    try {
      await createPersonalSchedule(schedule);
      setLoading(true);
      setError(null);

      try {
        const { data } = await apiClient.get<{ data: any[] }>(
          "/api/personal/calendar/list"
        );
        const arr = Array.isArray(data) ? data : [];
        setSchedules(arr.map(mapDtoToScheduleItem));
      } catch (err: any) {
        setError(err?.message || "데이터 로딩 오류");
      } finally {
        setLoading(false);
      }
    } catch (error) {
      alert("일정 등록 실패: " + (error as Error).message);
    }
  };

  // 일정 수정 핸들러 (백엔드 연동)
  const handleUpdateSchedule = async (schedule: ScheduleItem) => {
    try {
      await updatePersonalSchedule(schedule);
      setLoading(true);
      setError(null);

      try {
        const { data } = await apiClient.get<{ data: any[] }>(
          "/api/personal/calendar/list"
        );
        const arr = Array.isArray(data) ? data : [];
        setSchedules(arr.map(mapDtoToScheduleItem));
      } catch (err: any) {
        setError(err?.message || "데이터 로딩 오류");
      } finally {
        setLoading(false);
      }
    } catch (error) {
      alert("일정 수정 실패: " + (error as Error).message);
    }
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await apiClient.get<{ data: any[] }>(
          "/api/personal/calendar/list"
        );
        const arr = Array.isArray(data) ? data : [];
        console.log("[일정 API 응답]", arr);
        const mapped = arr.map(mapDtoToScheduleItem);
        console.log("[일정 변환 결과]", mapped);
        setSchedules(mapped);
      } catch (err: any) {
        console.error("[일정 로딩 실패]", err);
        setError(err?.message || "데이터 로딩 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleFilterChange = (filters: ScheduleEventType[]) => {
    setActiveFilters(filters);
  };

  const handleScheduleUpdate = (updatedSchedules: ScheduleItem[]) => {
    setSchedules(updatedSchedules);
  };

  // Sort schedules by startDateTime for the upcoming events section
  const sortedSchedules = [...schedules].sort((a, b) => {
    return (
      new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
    );
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <ScheduleHeader />
      {loading ? (
        <div className="text-center py-12 text-gray-500">
          일정 데이터를 불러오는 중...
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex-1">
            <Calendar
              schedules={schedules}
              activeFilters={activeFilters}
              onScheduleUpdate={handleUpdateSchedule}
              onAddSchedule={handleAddSchedule}
              onDelete={handleDeleteSchedule}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              currentYear={currentYear}
              setCurrentYear={setCurrentYear}
            />
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
      )}
    </div>
  );
};
export { handleDeleteSchedule as deletePersonalSchedule };
