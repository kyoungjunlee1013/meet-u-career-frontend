"use client";

import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import TagsTable from "./TagsTable";
import TagModal from "./TagModal";
import { apiClient } from "@/api/apiClient";
import CommunityPagination from "./CommunityPagination";

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
  const [tags, setTags] = useState<Tag[]>([]);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // 전체 태그 불러오기
  const fetchTags = async () => {
    try {
      const response = await apiClient.get(`/api/admin/community/tags/all`);
      setTags(response.data.data); // 전체 목록 저장
    } catch (error) {
      console.error("태그 목록 불러오기 실패", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const openAddModal = () => {
    setEditingTag(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tag: Tag) => {
    setEditingTag(tag);
    setIsModalOpen(true);
  };

  const handleSaveTag = () => {
    fetchTags(); // 새 태그 추가/수정 후 목록 새로고침
  };

  const handleToggleStatus = async (tagId: number) => {
    try {
      await apiClient.patch(`/api/admin/community/tags/${tagId}/status`);

      // 목록 새로고침
      await fetchTags();
    } catch (error) {
      console.error("태그 상태 토글 실패:", error);
      alert("태그 상태 변경 중 오류가 발생했습니다.");
    }
  };


  // 검색어를 기준으로 필터링
  const filteredTags = tags.filter((tag) => tag.name.includes(searchQuery));

  //  페이지네이션 계산
  const totalPages = Math.ceil(filteredTags.length / itemsPerPage);
  const currentItems = filteredTags.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // 검색할 때 페이지 초기화
            }}
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
        tags={currentItems}
        onEdit={openEditModal}
        onToggleStatus={handleToggleStatus}
      />

      {totalPages > 1 && (
        <CommunityPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <TagModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTag}
        onSuccess={fetchTags}
        editData={
          editingTag
            ? {
              id: editingTag.id,
              name: editingTag.name,
              status: editingTag.status as 0 | 1,
            }
            : undefined
        }
        title={editingTag ? "태그 수정" : "새 태그 추가"}
      />
    </div>
  );
}
