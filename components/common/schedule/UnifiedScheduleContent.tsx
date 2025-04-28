"use client"

import { useState, useEffect } from "react"
import { Calendar, type ScheduleEventType, type ScheduleItem } from "../../personal/schedule/Calendar"
import { BusinessScheduleSidebar } from "../../business/schedule/BusinessScheduleSidebar"
import { PublicUpcomingEventsSidebar } from "../../public/schedule/PublicUpcomingEventsSidebar";
// 앞으로 props로 API/헤더 등을 받을 예정
import { ScheduleSidebar } from "../../personal/schedule/ScheduleSidebar";

interface UnifiedScheduleContentProps {
  userType: "personal" | "business";
  apiEndpoint: string;
  createSchedule: (schedule: ScheduleItem) => Promise<any>;
  updateSchedule: (schedule: ScheduleItem) => Promise<any>;
  deleteSchedule: (id: string) => Promise<any>;
  mapDtoToScheduleItem: (dto: any) => ScheduleItem;
  headerComponent?: React.ReactNode;
}

export const UnifiedScheduleContent = ({
  userType,
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

  //const isLoggedIn = false;
  const isLoggedIn = true; // 실제 연동 시 userStore에서 가져옴

  let content;
  if (loading) {
    content = <div className="text-center py-12 text-gray-500">일정 데이터를 불러오는 중...</div>;
  } else if (error) {
    content = <div className="text-center py-12 text-red-500">{error}</div>;
  } else {
    content = (
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="flex-1">
          {(() => {
            // deduplication: 대표 일정 1개만 남기기
            const getPriority = (title: string) => {
              if (title.includes("접수 마감")) return 1;
              if (title.includes("스크랩 마감")) return 2;
              if (title.includes("접수 시작")) return 3;
              return 99;
            };
            const dedupedSchedules = (() => {
              const mapped = schedules.map(ev => ({
                ...ev,
                _priority: getPriority(ev.title),
                _baseKey: `${ev.title.replace(/(접수 시작|접수 마감|스크랩 마감)/g, "").trim()}|${ev.companyName || (ev.company?.name ?? "")}|${ev.endDateTime}`
              }));
              mapped.sort((a, b) => a._priority - b._priority);
              return mapped.filter((event, idx, arr) =>
                arr.findIndex(e => e._baseKey === event._baseKey) === idx
              ).map(({ _priority, _baseKey, ...rest }) => rest);
            })();

            if (userType === "personal" && !isLoggedIn) {
              // 비로그인: 대표 일정 1개만
              return (
                <Calendar
                  schedules={dedupedSchedules}
                  activeFilters={activeFilters}
                  onScheduleUpdate={handleUpdateSchedule}
                  onAddSchedule={handleAddSchedule}
                  onDelete={handleDeleteSchedule}
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  currentYear={currentYear}
                  setCurrentYear={setCurrentYear}
                  readOnly={true}
                />
              );
            } else {
              // 로그인: 모든 일정 그대로
              return (
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
                  readOnly={false}
                />
              );
            }
          })()}

        </div>
        <div className="w-full md:w-64">
          {userType === "personal" ? (
            !isLoggedIn ? (
              <PublicUpcomingEventsSidebar
                events={(() => {
                  // 1. 우선순위 부여
                  const getPriority = (title: string) => {
                    if (title.includes("접수 마감")) return 1;
                    if (title.includes("스크랩 마감")) return 2;
                    if (title.includes("접수 시작")) return 3;
                    return 99;
                  };
                  // 2. 변환 및 우선순위 필드 추가
                  const mapped = schedules.map(ev => ({
                    title: ev.title,
                    expirationDate: ev.endDateTime,
                    companyName: ev.companyName || (ev.company?.name ?? ""),
                    _priority: getPriority(ev.title),
                    _baseKey: `${ev.title.replace(/(접수 시작|접수 마감|스크랩 마감)/g, "").trim()}|${ev.companyName || (ev.company?.name ?? "")}|${ev.endDateTime}`
                  }));
                  // 3. 우선순위 높은 순 정렬
                  mapped.sort((a, b) => a._priority - b._priority);
                  // 4. 중복 제거 (baseKey 기준)
                  const deduped = mapped.filter((event, idx, arr) =>
                    arr.findIndex(e => e._baseKey === event._baseKey) === idx
                  );
                  // 5. 내부 필드 제거
                  return deduped.map(({ _priority, _baseKey, ...rest }) => rest);
                })()}
              />
            ) : (
              <ScheduleSidebar
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
                upcomingEvents={sortedSchedules}
                onDeleteSchedule={handleDeleteSchedule}
              />
            )
          ) : (
            <BusinessScheduleSidebar
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
              upcomingEvents={sortedSchedules}
              onDeleteSchedule={handleDeleteSchedule}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      {headerComponent}
      {content}
    </div>
  );
}
