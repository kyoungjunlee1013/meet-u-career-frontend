"use client"

import { Plus } from "lucide-react"
import { useState } from "react"
import AdminsStats from "./AdminsStats"
import AdminsSearch from "./AdminsSearch"
import AdminsTable from "./AdminsTable"
import AdminModal, { type AdminData } from "./AdminModal"

export default function AdminsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState<AdminData | undefined>(undefined)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [admins, setAdmins] = useState<AdminData[]>([
    {
      id: 1,
      name: "김관리",
      email: "admin1@saramin.co.kr",
      phone: "010-1234-5678",
      department: "시스템관리",
      position: "팀장",
      level: 1,
    },
    {
      id: 2,
      name: "이부장",
      email: "admin2@saramin.co.kr",
      phone: "010-2345-6789",
      department: "회원관리",
      position: "부장",
      level: 1,
    },
    {
      id: 3,
      name: "박차장",
      email: "admin3@saramin.co.kr",
      phone: "010-3456-7890",
      department: "기업검수",
      position: "차장",
      level: 2,
    },
    {
      id: 4,
      name: "최대리",
      email: "admin4@saramin.co.kr",
      phone: "010-4567-8901",
      department: "공고관리",
      position: "대리",
      level: 2,
    },
    {
      id: 5,
      name: "정사원",
      email: "admin5@saramin.co.kr",
      phone: "010-5678-9012",
      department: "고객지원",
      position: "사원",
      level: 2,
    },
  ])

  const handleOpenAddModal = () => {
    setCurrentAdmin(undefined)
    setModalMode("add")
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (admin: AdminData) => {
    setCurrentAdmin(admin)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSaveAdmin = (adminData: AdminData) => {
    if (modalMode === "add") {
      // Add new admin
      const newAdmin = {
        ...adminData,
        id: Math.max(0, ...admins.map((a) => a.id || 0)) + 1,
        level: 2, // Default to level 2 for new admins
      }
      setAdmins([...admins, newAdmin])
    } else {
      // Update existing admin
      setAdmins(admins.map((admin) => (admin.id === currentAdmin?.id ? { ...admin, ...adminData } : admin)))
    }
    setIsModalOpen(false)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">관리자 계정 관리</h1>
        <p className="text-gray-600">관리자 계정을 관리하고 권한을 설정합니다.</p>
      </div>

      <AdminsStats
        level1Count={admins.filter((a) => a.level === 1).length}
        level2Count={admins.filter((a) => a.level === 2).length}
      />

      <div className="bg-white rounded-lg shadow mt-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <AdminsSearch />

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            <span>관리자 추가</span>
          </button>
        </div>

        <AdminsTable admins={admins} onEdit={handleOpenEditModal} />
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAdmin}
        initialData={currentAdmin}
        mode={modalMode}
      />
    </div>
  )
}
