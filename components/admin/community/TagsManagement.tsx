"use client";

import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import TagsTable from "./TagsTable";
import TagModal from "./TagModal";
import { apiClient } from "@/api/apiClient";

export interface Tag {
  id: number;
  name: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export default function TagsManagement() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([
    {
      id: 1,
      name: "",
      status: 0,
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const handleAddTag = (tagData: { name: string; status: 0 | 1 }) => {
    const now = new Date().toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newTag: Tag = {
      id: tags.length > 0 ? Math.max(...tags.map((tag) => tag.id)) + 1 : 1,
      name: tagData.name,
      status: tagData.status,
      createdAt: now,
      updatedAt: now,
    };

    setTags([...tags, newTag]);
  };

  const handleEditTag = (tagData: { name: string; status: 0 | 1 }) => {
    if (!editingTag) return;

    const now = new Date().toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const updatedTags = tags.map((tag) =>
      tag.id === editingTag.id
        ? { ...tag, name: tagData.name, status: tagData.status, updatedAt: now }
        : tag
    );

    setTags(updatedTags);
    setEditingTag(null);
  };

  const openAddModal = () => {
    setEditingTag(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tag: Tag) => {
    setEditingTag(tag);
    setIsModalOpen(true);
  };

  const handleSaveTag = (tagData: { name: string; status: 0 | 1 }) => {
    if (editingTag) {
      handleEditTag(tagData);
    } else {
      handleAddTag(tagData);
    }
  };

  const handleToggleStatus = (tagId: number) => {
    const updatedTags = tags.map((tag) => {
      if (tag.id === tagId) {
        const newStatus = tag.status === 0 ? 1 : 0;
        return {
          ...tag,
          status: newStatus,
          updatedAt: new Date().toLocaleString("ko-KR"),
        };
      }
      return tag;
    });

    setTags(updatedTags);
  };

  const fetchTags = async () => {
    const response = await apiClient.post(`/api/admin/community/tags/search`, {
      status: 0,
      page: 0,
      size: 10,
      sortBy: "createdAt",
      direction: "DESC",
    });
    setTags(response.data.data.content);
  };

  useEffect(() => {
    fetchTags();
  }, []);

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
        onSuccess={fetchTags}
        editData={editingTag || undefined}
        title={editingTag ? "태그 수정" : "새 태그 추가"}
      />
    </div>
  );
}
