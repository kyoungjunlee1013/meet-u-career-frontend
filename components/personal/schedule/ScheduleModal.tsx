"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Calendar, Building, CheckSquare } from "lucide-react"

import { ScheduleEventType, ScheduleItem } from "./Calendar";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (schedule: ScheduleItem) => void;
  schedule?: ScheduleItem;
  isEditing?: boolean;
}

export const ScheduleModal = ({ isOpen, onClose, onSave, schedule, isEditing = false }: ScheduleModalProps) => {
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
    onSave({
      id: schedule?.id || Date.now().toString(),
      eventType,
      title,
      description,
      relatedId: schedule?.relatedId,
      company,
      startDateTime,
      endDateTime,
      isAllDay,
      updatedAt: new Date().toISOString(),
    });
    onClose();
  }

  if (!isOpen) return null

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
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">일정 유형</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="scheduleType"
                  value={ScheduleEventType.APPLICATION_DEADLINE}
                  checked={eventType === ScheduleEventType.APPLICATION_DEADLINE}
                  onChange={() => setEventType(ScheduleEventType.APPLICATION_DEADLINE)}
                  className="sr-only"
                />
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    eventType === ScheduleEventType.APPLICATION_DEADLINE ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="text-sm">채용 지원 일정</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="scheduleType"
                  value={ScheduleEventType.BOOKMARK_DEADLINE}
                  checked={eventType === ScheduleEventType.BOOKMARK_DEADLINE}
                  onChange={() => setEventType(ScheduleEventType.BOOKMARK_DEADLINE)}
                  className="sr-only"
                />
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    eventType === ScheduleEventType.BOOKMARK_DEADLINE ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Building className="h-4 w-4" />
                </div>
                <span className="text-sm">관심 공고 마감일</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="scheduleType"
                  value={ScheduleEventType.PERSONAL_EVENT}
                  checked={eventType === ScheduleEventType.PERSONAL_EVENT}
                  onChange={() => setEventType(ScheduleEventType.PERSONAL_EVENT)}
                  className="sr-only"
                />
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    eventType === ScheduleEventType.PERSONAL_EVENT ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <CheckSquare className="h-4 w-4" />
                </div>
                <span className="text-sm">개인 일정</span>
              </label>
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
            />
          </div>

          <div className="mb-5 flex items-center gap-2">
            <input
              type="checkbox"
              id="isAllDay"
              checked={isAllDay}
              onChange={(e) => setIsAllDay(e.target.checked)}
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
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {isEditing ? "수정하기" : "추가하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
