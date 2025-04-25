"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { apiClient } from "@/api/apiClient";

interface TagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tagData: { name: string; status: 0 | 1 }) => void;
  editData?: { id: number; name: string; status: 0 | 1 };
  title?: string;
  onSuccess?: () => void;
}

export default function TagModal({
  isOpen,
  onClose,
  onSave,
  editData,
  title = "새 태그 추가",
  onSuccess,
}: TagModalProps) {
  const [tagName, setTagName] = useState("");
  const [status, setStatus] = useState<0 | 1>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setTagName(editData.name);
        setStatus(editData.status);
      } else {
        setTagName("");
        setStatus(0);
      }
    }
  }, [isOpen, editData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    if (!tagName.trim()) {
      alert("태그명을 입력해 주세요.");
      return;
    }

    try {
      let response;

      if (title === "태그 수정" && editData) {
        // 태그 수정
        response = await apiClient.put("/api/admin/community/tags", {
          id: editData.id,
          name: tagName,
          status: status,
        });
      } else {
        // 태그 등록
        response = await apiClient.post("/api/admin/community/tags", {
          name: tagName,
          status: status,
        });
      }

      console.log("Res, ", response);

      if (response.data.msg === "success") {
        alert("태그가 성공적으로 저장되었습니다.");
        onSuccess?.();
      }

      onClose();
    } catch (error) {
      console.error("태그 저장 실패:", error);
      alert("태그 저장 중 오류가 발생했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4"
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-900"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="닫기"
            >
              <X size={20} />
            </button>
          </div>

          <div>
            <div className="mb-4">
              <label
                htmlFor="tagName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                태그명
              </label>
              <input
                type="text"
                id="tagName"
                autoComplete="off"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="태그명을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상태
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    id="active"
                    type="radio"
                    name="status"
                    checked={status === 0}
                    onChange={() => setStatus(0)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="active"
                    className="ml-2 text-sm text-gray-700"
                  >
                    활성
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="inactive"
                    type="radio"
                    name="status"
                    checked={status === 1}
                    onChange={() => setStatus(1)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="inactive"
                    className="ml-2 text-sm text-gray-700"
                  >
                    비활성
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
