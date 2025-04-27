"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useState } from "react"

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchKeyword.trim() !== "") {
        router.push(`/personal/jobs?keyword=${encodeURIComponent(searchKeyword.trim())}`);
      }
    }
  };

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
          <div className="relative flex items-center w-80">
            <Search className="absolute left-4 w-5 h-5 text-blue-500" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-12 pr-4 py-2 w-full text-sm font-semibold border border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
