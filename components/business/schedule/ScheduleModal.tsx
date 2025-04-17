"use client"

import type React from "react"

import { X, Calendar, Clock } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import type { ScheduleEvent } from "./BusinessSchedule"

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  event?: ScheduleEvent | null
  onSave?: (event: Partial<ScheduleEvent>) => void
}

export const ScheduleModal = ({ isOpen, onClose, event, onSave }: ScheduleModalProps) => {
  const [formData, setFormData] = useState({
    type: "recruitment",
    company: "",
    title: "",
    location: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  })

  const modalRef = useRef<HTMLDivElement>(null)

  // Handle clicking outside of the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Initialize form data if an event is provided
  useEffect(() => {
    if (event) {
      setFormData({
        type: event.type,
        company: event.company || "",
        title: event.title,
        location: event.location || "",
        description: event.description || "",
        date: event.date ? formatDate(event.date) : "",
        startTime: event.startTime || "",
        endTime: event.endTime || "",
      })
    } else {
      // Reset form for new event
      setFormData({
        type: "recruitment",
        company: "",
        title: "",
        location: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
      })
    }
  }, [event, isOpen])

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSave) {
      onSave(formData)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-lg relative max-h-[90vh] overflow-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-medium">
            {event ? (event.type === "personal" ? "개인 일정" : "일정 상세") : "일정 추가"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Schedule Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              일정 유형 <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!!event}
            >
              <option value="recruitment">전형 일정</option>
              <option value="deadline">마감 일정</option>
              <option value="personal">개인 일정</option>
            </select>
          </div>

          {/* Job Posting (only for non-personal schedules) */}
          {formData.type !== "personal" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                채용 공고 <span className="text-red-500">*</span>
              </label>
              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!!event}
              >
                <option value="">채용 공고 선택</option>
                <option value="카카오">카카오 UX 디자이너</option>
                <option value="네이버">네이버 백엔드 개발자</option>
                <option value="네고">네고 창업</option>
              </select>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="일정 제목을 입력하세요"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly={!!event && event.type !== "personal"}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">장소</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="장소를 입력하세요 (선택사항)"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly={!!event && event.type !== "personal"}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="일정에 대한 설명을 입력하세요"
              rows={4}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              readOnly={!!event && event.type !== "personal"}
            ></textarea>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              날짜 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                readOnly={!!event && event.type !== "personal"}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
            </div>
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                시작 시간 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  readOnly={!!event && event.type !== "personal"}
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                종료 시간 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  readOnly={!!event && event.type !== "personal"}
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {event && event.type !== "personal" ? "닫기" : "취소"}
            </button>
            {(!event || event.type === "personal") && (
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                저장
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
