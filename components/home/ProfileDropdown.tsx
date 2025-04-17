"use client"

import Link from "next/link"
import { User, LogOut } from "lucide-react"

const ProfileDropdown = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
      <ul>
        <li>
          <Link
            href="/personal/profile"
            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            <User className="h-4 w-4 text-gray-500" />
            <span>마이페이지</span>
          </Link>
        </li>
        <li className="border-t">
          <button
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left"
            onClick={() => console.log("로그아웃")}
          >
            <LogOut className="h-4 w-4 text-gray-500" />
            <span>로그아웃</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ProfileDropdown
