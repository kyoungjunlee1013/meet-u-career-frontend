"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import TagsTable from "./TagsTable"
import TagModal from "./TagModal"

export interface Tag {
  id: number
  name: string
  status: "활성" | "비활성"
  createdAt: string
  updatedAt: string
}

export default function TagsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tags, setTags] = useState<Tag[]>([
    {
      id: 1,
      name: "이직",
      status: "활성",
      createdAt: "2024. 01. 01. 오전 05:00",
      updatedAt: "2024. 01. 01. 오전 05:00",
    },
    {
      id: 2,
      name: "연봉",
      status: "활성",
      createdAt: "2024. 01. 02. 오전 07:00",
      updatedAt: "2024. 02. 15. 오전 08:30",
    },
    {
      id: 3,
      name: "면접",
      status: "활성",
      createdAt: "2024. 01. 05. 오전 06:15",
      updatedAt: "2024. 01. 05. 오전 06:15",
    },
    {
      id: 4,
      name: "취업준비",
      status: "활성",
      createdAt: "2024. 01. 10. 오전 11:20",
      updatedAt: "2024. 01. 10. 오전 11:20",
    },
    {
      id: 5,
      name: "퇴사",
      status: "비활성",
      createdAt: "2024. 01. 15. 오전 08:45",
      updatedAt: "2024. 02. 11. 오전 01:30",
    },
    {
      id: 6,
      name: "재택근무",
      status: "활성",
      createdAt: "2024. 01. 20. 오전 10:10",
      updatedAt: "2024. 01. 20. 오전 10:10",
    },
    {
      id: 7,
      name: "스타트업",
      status: "활성",
      createdAt: "2024. 01. 26. 오전 12:50",
      updatedAt: "2024. 01. 26. 오전 12:50",
    },
    {
      id: 8,
      name: "대기업",
      status: "활성",
      createdAt: "2024. 02. 01. 오전 06:30",
      updatedAt: "2024. 02. 01. 오전 06:30",
    },
    {
      id: 9,
      name: "채용",
      status: "비활성",
      createdAt: "2024. 02. 05. 오전 07:20",
      updatedAt: "2024. 02. 20. 오전 11:15",
    },
    {
      id: 10,
      name: "개발",
      status: "활성",
      createdAt: "2024. 02. 10. 오전 09:00",
      updatedAt: "2024. 02. 10. 오전 09:00",
    },
  ])
  const [editingTag, setEditingTag] = useState<Tag | null>(null)

  const handleAddTag = (tagData: { name: string; status: "활성" | "비활성" }) => {
    const now = new Date().toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

    const newTag: Tag = {
      id: tags.length > 0 ? Math.max(...tags.map((tag) => tag.id)) + 1 : 1,
      name: tagData.name,
      status: tagData.status,
      createdAt: now,
      updatedAt: now,
    }

    setTags([...tags, newTag])
  }

  const handleEditTag = (tagData: { name: string; status: "활성" | "비활성" }) => {
    if (!editingTag) return

    const now = new Date().toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

    const updatedTags = tags.map((tag) =>
      tag.id === editingTag.id ? { ...tag, name: tagData.name, status: tagData.status, updatedAt: now } : tag,
    )

    setTags(updatedTags)
    setEditingTag(null)
  }

  const openAddModal = () => {
    setEditingTag(null)
    setIsModalOpen(true)
  }

  const openEditModal = (tag: Tag) => {
    setEditingTag(tag)
    setIsModalOpen(true)
  }

  const handleSaveTag = (tagData: { name: string; status: "활성" | "비활성" }) => {
    if (editingTag) {
      handleEditTag(tagData)
    } else {
      handleAddTag(tagData)
    }
  }

  const handleToggleStatus = (tagId: number) => {
    const updatedTags = tags.map((tag) => {
      if (tag.id === tagId) {
        const newStatus = tag.status === "활성" ? "비활성" : "활성"
        return { ...tag, status: newStatus, updatedAt: new Date().toLocaleString("ko-KR") }
      }
      return tag
    })

    setTags(updatedTags)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="태그명 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2.5 w-full sm:w-auto"
          onClick={openAddModal}
        >
          <Plus className="h-5 w-5 mr-1" />새 태그 추가
        </button>
      </div>

      <TagsTable
        tags={tags.filter((tag) => tag.name.includes(searchQuery))}
        onEdit={openEditModal}
        onToggleStatus={handleToggleStatus}
      />

      <TagModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTag}
        editData={editingTag || undefined}
        title={editingTag ? "태그 수정" : "새 태그 추가"}
      />
    </div>
  )
}
