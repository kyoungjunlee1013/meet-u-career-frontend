"use client"

import { useState, useEffect } from "react"
import { Calendar, type ScheduleEventType, type ScheduleItem } from "../../personal/schedule/Calendar"
import { BusinessScheduleSidebar } from "../../business/schedule/BusinessScheduleSidebar"

// 앞으로 props로 API/헤더 등을 받을 예정
interface UnifiedScheduleContentProps {
  apiEndpoint: string;
  createSchedule: (schedule: ScheduleItem) => Promise<any>;
  updateSchedule: (schedule: ScheduleItem) => Promise<any>;
  deleteSchedule: (id: string) => Promise<any>;
  mapDtoToScheduleItem: (dto: any) => ScheduleItem;
  headerComponent?: React.ReactNode;
}

export const UnifiedScheduleContent = ({
  apiEndpoint,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  mapDtoToScheduleItem,
  headerComponent,
}: UnifiedScheduleContentProps) => {
  const [activeFilters, setActiveFilters] = useState<ScheduleEventType[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // --- 기존 개인 일정 관리와 동일하게 동작 (임시 더미 API) ---
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(apiEndpoint)
      .then(res => {
        if (!res.ok) throw new Error("일정 데이터를 불러오지 못했습니다.");
        return res.json();
      })
      .then(json => {
        const arr = Array.isArray(json.data) ? json.data : [];
        setSchedules(arr.map(mapDtoToScheduleItem));
      })
      .catch((err) => setError(err.message || "데이터 로딩 오류"))
      .finally(() => setLoading(false));
  }, [apiEndpoint, mapDtoToScheduleItem]);

  const handleAddSchedule = async (schedule: ScheduleItem) => {
    try {
      await createSchedule(schedule);
      setLoading(true);
      setError(null);
      const res = await fetch(apiEndpoint);
      if (!res.ok) throw new Error("일정 데이터를 불러오지 못했습니다.");
      const json = await res.json();
      const arr = Array.isArray(json.data) ? json.data : [];
      setSchedules(arr.map(mapDtoToScheduleItem));
    } catch (error) {
      alert("일정 등록 실패: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSchedule = async (schedule: ScheduleItem) => {
    try {
      await updateSchedule(schedule);
      setLoading(true);
      setError(null);
      const res = await fetch(apiEndpoint);
      if (!res.ok) throw new Error("일정 데이터를 불러오지 못했습니다.");
      const json = await res.json();
      const arr = Array.isArray(json.data) ? json.data : [];
      setSchedules(arr.map(mapDtoToScheduleItem));
    } catch (error) {
      alert("일정 수정 실패: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    try {
      await deleteSchedule(id);
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
    } catch (error) {
      alert("일정 삭제 실패: " + (error as Error).message);
    }
  };


  // 사이드바용 정렬 (기존과 동일)
  const sortedSchedules = [...schedules].sort((a, b) => {
    return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
  })

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      {headerComponent}
      {loading ? (
        <div className="text-center py-12 text-gray-500">일정 데이터를 불러오는 중...</div>
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
            <BusinessScheduleSidebar
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
}
