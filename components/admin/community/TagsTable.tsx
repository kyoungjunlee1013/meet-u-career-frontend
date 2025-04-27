"use client";

import { Edit, Power } from "lucide-react";
import type { Tag } from "./TagsManagement";

interface TagsTableProps {
  tags: Tag[];
  onEdit: (tag: Tag) => void;
  onToggleStatus: (tagId: number) => void;
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

export default function TagsTable({
  tags,
  onEdit,
  onToggleStatus,
}: TagsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-4 py-3">
              ID
            </th>
            <th scope="col" className="px-4 py-3">
              태그명
            </th>
            <th scope="col" className="px-4 py-3">
              상태
            </th>
            <th scope="col" className="px-4 py-3">
              생성일
            </th>
            <th scope="col" className="px-4 py-3">
              수정일
            </th>
            <th scope="col" className="px-4 py-3">
              작업
            </th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-4">{tag.id}</td>
              <td className="px-4 py-4">{tag.name}</td>
              <td className="px-4 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tag.status === 0
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {tag.status === 0 ? "활성" : "비활성화"}
                </span>
              </td>
              <td className="px-4 py-4">{formatDateTime(tag.createdAt)}</td>
              <td className="px-4 py-4">{formatDateTime(tag.updatedAt)}</td>
              <td className="px-4 py-4">
                <div className="flex space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-gray-700"
                    onClick={() => onEdit(tag)}
                    aria-label={`${tag.name} 태그 수정`}
                  >
                    <Edit size={16} className="mr-1" />
                    수정
                  </button>
                  {tag.status === 0 ? (
                    <button
                      className="px-2 py-1 bg-red-100 hover:bg-red-200 rounded-md flex items-center text-red-700"
                      onClick={() => onToggleStatus(tag.id)}
                      aria-label={`${tag.name} 태그 비활성화`}
                    >
                      <Power size={16} className="mr-1" />
                      비활성화
                    </button>
                  ) : (
                    <button
                      className="px-2 py-1 bg-green-100 hover:bg-green-200 rounded-md flex items-center text-green-700"
                      onClick={() => onToggleStatus(tag.id)}
                      aria-label={`${tag.name} 태그 활성화`}
                    >
                      <Power size={16} className="mr-1" />
                      활성화
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
