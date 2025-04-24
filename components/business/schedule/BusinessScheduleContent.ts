import { ScheduleItem } from "@/components/personal/schedule/Calendar";

// 기업회원 일정 전체 조회 (API 연동은 2단계에서 구현)
export async function fetchBusinessSchedules(): Promise<any[]> {
  const res = await fetch("/api/personal/calendar/business/list");
  if (!res.ok) throw new Error("기업 일정 데이터를 불러오지 못했습니다.");
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

// 기업회원 커스텀 일정 생성
export async function createBusinessSchedule(schedule: ScheduleItem): Promise<any> {
  const payload = {
    ...schedule,
    isAllDay: schedule.isAllDay ?? false,
    // 필요시 companyId 등 추가
  };
  // 공통 엔드포인트 사용
  const res = await fetch("/api/personal/calendar/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("일정 생성 실패");
  return res.json();
}

// 기업회원 커스텀 일정 수정
export async function updateBusinessSchedule(schedule: ScheduleItem): Promise<any> {
  const payload = {
    ...schedule,
    isAllDay: schedule.isAllDay ?? false,
  };
  // 공통 엔드포인트 사용
  const res = await fetch(`/api/personal/calendar/update/${schedule.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("일정 수정 실패");
  return res.json();
}

// 기업회원 커스텀 일정 삭제
export async function deleteBusinessSchedule(id: string): Promise<any> {
  const numericId = typeof id === "string" ? id.replace(/[^\d]/g, "") : id;
  // 공통 엔드포인트 사용
  const res = await fetch(`/api/personal/calendar/delete/${numericId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("일정 삭제 실패");
  return res.json();
}

// DTO → ScheduleItem 변환 함수 (실제 변환 로직은 2단계에서 구현)
export function mapBusinessDtoToScheduleItem(dto: any): ScheduleItem {
  return {
    id: dto.id,
    title: dto.title,
    startDateTime: dto.startDateTime,
    endDateTime: dto.endDateTime,
    eventType: dto.eventType, // 3: 공고, 4: 커스텀
    isAllDay: dto.isAllDay ?? false,
    relatedId: dto.relatedId ?? undefined, // 공고 일정일 경우
    companyId: dto.companyId ?? undefined,
    companyName: dto.companyName ?? undefined,
    description: dto.description ?? undefined,
    // 필요시 추가 필드: color, etc.
  };
}
