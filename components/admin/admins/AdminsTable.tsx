"use client"

import type { AdminData } from "./AdminModal"

interface AdminsTableProps {
  admins: AdminData[]
  onEdit: (admin: AdminData) => void
}

export default function AdminsTable({ admins, onEdit }: AdminsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase border-b">
          <tr>
            <th scope="col" className="px-4 py-3">
              이름
            </th>
            <th scope="col" className="px-4 py-3">
              이메일
            </th>
            <th scope="col" className="px-4 py-3">
              부서
            </th>
            <th scope="col" className="px-4 py-3">
              직급
            </th>
            <th scope="col" className="px-4 py-3">
              레벨
            </th>
            <th scope="col" className="px-4 py-3">
              등록일
            </th>
            <th scope="col" className="px-4 py-3">
              최근 로그인
            </th>
            <th scope="col" className="px-4 py-3">
              작업
            </th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-4 flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mr-2">
                  {admin.name.charAt(0)}
                </div>
                {admin.name}
              </td>
              <td className="px-4 py-4">{admin.email}</td>
              <td className="px-4 py-4">{admin.department}</td>
              <td className="px-4 py-4">{admin.position}</td>
              <td className="px-4 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    admin.level === 1 ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  레벨 {admin.level}
                </span>
              </td>
              <td className="px-4 py-4">
                {admin.id === 1 && "2023. 01. 15. 오후 06:00"}
                {admin.id === 2 && "2023. 02. 20. 오후 07:15"}
                {admin.id === 3 && "2023. 03. 10. 오후 08:30"}
                {admin.id === 4 && "2023. 04. 05. 오후 11:45"}
                {admin.id === 5 && "2023. 05. 15. 오후 05:30"}
                {admin.id && admin.id > 5 && "2023. 06. 15. 오후 12:00"}
              </td>
              <td className="px-4 py-4">
                {admin.id === 1 && "2023. 06. 10. 오후 11:30"}
                {admin.id === 2 && "2023. 06. 10. 오전 01:45"}
                {admin.id === 3 && "2023. 06. 08. 오후 10:20"}
                {admin.id === 4 && "2023. 06. 07. 오후 06:10"}
                {admin.id === 5 && "2023. 06. 07. 오전 02:30"}
                {admin.id && admin.id > 5 && "2023. 06. 15. 오후 12:00"}
              </td>
              <td className="px-4 py-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(admin)}
                    className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    수정
                  </button>
                  {admin.level === 2 && (
                    <button className="px-2 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors">
                      삭제
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
