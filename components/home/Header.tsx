"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"

export const Header = () => {
  const pathname = usePathname()

  return (
    <header className="border-b py-2.5 bg-white sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-blue-600 font-bold text-2xl">
            <Image
              src="/images/logo/logo6.png"
              alt="로고"
              width={120}
              height={35}
              priority
            />
          </Link>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="회사명, 채용공 검색 (예체)"
              className="pl-3 pr-10 py-1 text-sm border rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="absolute right-3">
              <Search className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <Link
            href="/login"
            className={pathname === "/login" ? "border-b-2 border-gray-900 pb-1" : "hover:text-gray-900"}
          >
            로그인
          </Link>
          <Link
            href="/register"
            className={pathname === "/register" ? "border-b-2 border-gray-900 pb-1" : "hover:text-gray-900"}
          >
            회원가입
          </Link>
          <Link
            href="/business/dashboard"
            className={pathname === "/business" ? "border-b-2 border-gray-900 pb-1" : "hover:text-gray-900"}
          >
            기업서비스
          </Link>
        </div>
      </div>
    </header>
  )
}
