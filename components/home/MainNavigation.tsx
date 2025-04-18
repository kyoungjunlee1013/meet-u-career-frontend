"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const MainNavigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { label: "채용정보", href: "/personal/jobs" },
    { label: "면접 후기", href: "/personal/reviews" },
    { label: "커뮤니티", href: "/personal/community" },
    { label: "자소서 코칭", href: "/personal/coaching" },
    { label: "일정 관리", href: "/personal/schedule" },
  ];

  return (
    <nav className="bg-[#15274a] text-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4">
        <ul className="flex items-center h-[52px]">
          {navItems.map((item) => (
            <li key={item.href} className="mr-6">
              <Link
                href={item.href}
                className={`text-sm font-medium pb-3 border-b-2 ${
                  isActive(item.href)
                    ? "text-blue-600 border-blue-600 active:text-blue-600"
                    : "text-white border-transparent hover:text-blue-500 active:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
