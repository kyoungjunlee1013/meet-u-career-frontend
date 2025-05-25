"use client";
import { useState, useEffect } from "react";
import { apiClient } from "@/api/apiClient";
import { useUserStore } from "@/store/useUserStore";
import { ScheduleHeader } from "./ScheduleHeader";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  type ScheduleItem,
  type ScheduleEventType,
} from "./Calendar";
import { ScheduleSidebar } from "./ScheduleSidebar";

// 일정 수정 API
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

// 일정 등록 API
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

// 일정 삭제 API
export const handleDeleteSchedule = async (id: string) => {
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

// 날짜 변환 함수
function toIsoString(date: any): string {
  if (!date) return new Date().toISOString();
  if (typeof date === "string") return date;
  if (date instanceof Date) return date.toISOString();
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
// 일정 매핑 함수
export function mapDtoToScheduleItem(dto: any): ScheduleItem {
  if ("eventType" in dto) {
    // 로그인 사용자 DTO 처리
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
    // 비회원용 DTO 처리
    return {
      id: `public-${dto.title}-${toIsoString(dto.expirationDate)}`,
      eventType: 1,
      title: dto.title,
      description: "",
      relatedId: undefined,
      company: { id: "public", name: dto.companyName },
      companyId: "public",
      companyName: dto.companyName,
      startDateTime: toIsoString(dto.expirationDate),
      endDateTime: toIsoString(dto.expirationDate),
      isAllDay: true,
      updatedAt: toIsoString(dto.expirationDate),
    };
  } else {
    // 예외 및 방어 로직
    return {
      id: `unknown-${Math.random()}`,
      eventType: 4,
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

// 주요 컴포넌트
const ScheduleContent = () => {
  const { userInfo } = useUserStore();
  const isLoggedIn = !!userInfo;

  const [activeFilters, setActiveFilters] = useState<ScheduleEventType[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.get<{ data: any[] }>(
        "/api/personal/calendar/list"
      );
      const arr = Array.isArray(data) ? data : [];
      console.log("[일정 API 응답]", arr);
      setSchedules(arr.map(mapDtoToScheduleItem));
    } catch (err: any) {
      console.error("[일정 로딩 실패]", err);
      setError(err?.message || "데이터 로딩 오류");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSchedule = async (schedule: ScheduleItem) => {
    try {
      await createPersonalSchedule(schedule);
      await fetchSchedules();
    } catch (error) {
      alert("일정 등록 실패: " + (error as Error).message);
    }
  };

  const handleUpdateSchedule = async (schedule: ScheduleItem) => {
    try {
      await updatePersonalSchedule(schedule);
      await fetchSchedules();
    } catch (error) {
      alert("일정 수정 실패: " + (error as Error).message);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const sortedSchedules = [...schedules].sort((a, b) => {
    return (
      new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
    );
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <ScheduleHeader />
      {!isLoggedIn && (
        <p className="text-sm text-gray-500 mb-4">
          로그인 시 관심 공고와 개인 일정을 모두 확인할 수 있어요.
        </p>
      )}
      {loading ? (
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="w-full md:w-64 space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
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
              readOnly={!isLoggedIn}
            />
          </div>
          <div className="w-full md:w-64">
            <ScheduleSidebar
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
              upcomingEvents={sortedSchedules}
              onDeleteSchedule={handleDeleteSchedule}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { ScheduleContent };
export { handleDeleteSchedule as deletePersonalSchedule };
