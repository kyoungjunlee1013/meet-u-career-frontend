"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Calendar, Building, CheckSquare } from "lucide-react"

import { ScheduleEventType, ScheduleItem } from "./Calendar";
import { useToast } from "@/hooks/use-toast";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (schedule: ScheduleItem) => void;
  schedule?: ScheduleItem;
  isEditing?: boolean;
  onDelete?: (id: string) => void;
}

export const ScheduleModal = ({ isOpen, onClose, onSave, schedule, isEditing = false, onDelete }: ScheduleModalProps & { onDelete?: (id: string) => void }) => {
  const { toast, dismiss } = useToast();
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState<ScheduleEventType>(ScheduleEventType.PERSONAL_EVENT);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (schedule) {
      setTitle(schedule.title || "");
      setEventType(schedule.eventType);
      setStartDateTime(schedule.startDateTime || new Date().toISOString().split("T")[0]);
      setEndDateTime(schedule.endDateTime || new Date().toISOString().split("T")[0]);
      setIsAllDay(schedule.isAllDay || false);
      setDescription(schedule.description || "");
      setCompany(schedule.company || null);
    } else {
      setTitle("");
      setEventType(ScheduleEventType.PERSONAL_EVENT);
      const today = new Date().toISOString().split("T")[0];
      setStartDateTime(today);
      setEndDateTime(today);
      setIsAllDay(false);
      setDescription("");
      setCompany(null);
    }
  }, [schedule, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 일정 유형은 무조건 PERSONAL_EVENT로 고정
    let fixedStart = startDateTime;
    let fixedEnd = endDateTime;
    if (isAllDay) {
      // 날짜만 입력된 경우(YYYY-MM-DD), 시간 자동 세팅
      const startDate = startDateTime.slice(0, 10);
      const endDate = endDateTime.slice(0, 10);
      fixedStart = `${startDate}T00:00:00`;
      fixedEnd = `${endDate}T23:59:59`;
    }
    onSave({
      id: schedule?.id || Date.now().toString(),
      eventType: ScheduleEventType.PERSONAL_EVENT,
      title,
      description,
      relatedId: schedule?.relatedId,
      company,
      startDateTime: fixedStart,
      endDateTime: fixedEnd,
      isAllDay,
      updatedAt: new Date().toISOString(),
    });
    onClose();
  }

  if (!isOpen) return null

  console.log('[ScheduleModal 렌더] onDelete:', typeof onDelete, onDelete, 'schedule?.id:', schedule?.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">{isEditing ? "일정 수정" : "일정 추가"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 일정 유형(상세보기: 전체, 작성/수정: 개인 일정만 활성) */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">일정 유형</label>
            <div className="flex gap-3">
              {[
                { type: ScheduleEventType.APPLICATION_DEADLINE, label: "지원 마감" },
                { type: ScheduleEventType.BOOKMARK_DEADLINE, label: "스크랩 마감" },
                { type: ScheduleEventType.COMPANY_EVENT, label: "기업 행사" },
                { type: ScheduleEventType.PERSONAL_EVENT, label: "개인 일정" },
              ].map(({ type, label }) => (
                <label key={type} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="eventType"
                    checked={eventType === type}
                    disabled={isEditing ? type !== ScheduleEventType.PERSONAL_EVENT : true}
                    readOnly
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>


          <div className="mb-5">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              일정 제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="일정 제목을 입력하세요"
              required
              disabled={eventType !== ScheduleEventType.PERSONAL_EVENT}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="startDateTime" className="block text-sm font-medium text-gray-700 mb-2">
              시작 날짜 및 시간
            </label>
            <input
              type="datetime-local"
              id="startDateTime"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              disabled={isAllDay || eventType !== ScheduleEventType.PERSONAL_EVENT}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="endDateTime" className="block text-sm font-medium text-gray-700 mb-2">
              종료 날짜 및 시간
            </label>
            <input
              type="datetime-local"
              id="endDateTime"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              disabled={isAllDay || eventType !== ScheduleEventType.PERSONAL_EVENT}
            />
          </div>

          <div className="mb-5 flex items-center gap-2">
            <input
              type="checkbox"
              id="isAllDay"
              checked={isAllDay}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsAllDay(checked);
                if (checked) {
                  // 종일 일정 체크 시, 시간 자동 세팅
                  const startDate = startDateTime.slice(0, 10);
                  const endDate = endDateTime.slice(0, 10);
                  setStartDateTime(`${startDate}T00:00`);
                  setEndDateTime(`${endDate}T23:59`);
                } else {
                  // 해제 시, 시간 입력 복원(00:00)
                  const startDate = startDateTime.slice(0, 10);
                  const endDate = endDateTime.slice(0, 10);
                  setStartDateTime(`${startDate}T00:00`);
                  setEndDateTime(`${endDate}T00:00`);
                }
              }}
              disabled={eventType !== ScheduleEventType.PERSONAL_EVENT}
            />
            <label htmlFor="isAllDay" className="text-sm">종일 일정</label>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              설명 (선택사항)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 h-24 resize-none"
              placeholder="일정에 대한 추가 설명을 입력하세요"
              disabled={eventType !== ScheduleEventType.PERSONAL_EVENT}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            {(eventType === ScheduleEventType.PERSONAL_EVENT) && (
              <>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  {isEditing ? "수정하기" : "추가하기"}
                </button>
                {isEditing && schedule?.id && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => {
  console.log('[삭제하기 버튼] 클릭됨', schedule?.id, typeof onDelete);
  const t = toast({
    title: "정말 삭제하시겠습니까?",
    description: "삭제된 일정은 복구할 수 없습니다.",
    action: (
      <button
        className="ml-4 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        onClick={() => {
          console.log('[삭제 확인] 클릭', schedule?.id, typeof onDelete);
          if (onDelete && schedule?.id) {
            onDelete(schedule.id);
          } else {
            console.log('[삭제 실패] onDelete 또는 id 없음', onDelete, schedule?.id);
          }
          toast({ title: "일정이 삭제되었습니다." });
          if (typeof t?.id !== 'undefined') dismiss(t.id);
          onClose();
        }}
      >
        삭제 확인
      </button>
    ),
  });
}}
                  >
                    삭제하기
                  </button>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
