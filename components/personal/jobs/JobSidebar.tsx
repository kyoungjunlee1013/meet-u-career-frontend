"use client";

import { ChevronUp, ClipboardList, Mouse, Building } from "lucide-react";
import { useState, useEffect } from "react";

interface JobSidebarProps {
  scrollToSection: {
    postRef: React.RefObject<HTMLDivElement | null>;
    applyRef: React.RefObject<HTMLDivElement | null>;
    companyRef: React.RefObject<HTMLDivElement | null>;
  };
}

export const JobSidebar = ({ scrollToSection }: JobSidebarProps) => {
  const [activeSection, setActiveSection] = useState<"post" | "apply" | "company">("post");
  // 초기에 'post'로 세팅함

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offsetTop = rect.top + scrollTop;

      const headerHeight = 110;
      window.scrollTo({
        top: offsetTop - headerHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const postTop = scrollToSection.postRef.current?.offsetTop ?? 0;
      const applyTop = scrollToSection.applyRef.current?.offsetTop ?? 0;
      const companyTop = scrollToSection.companyRef.current?.offsetTop ?? 0;
      const scrollY = window.scrollY + 200; // 오프셋 조정

      const bottomThreshold = 100; // 마지막 100px 이내로 내려오면 무조건 company로 처리

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - bottomThreshold) {
        setActiveSection("company");
      } else if (scrollY >= companyTop) {
        setActiveSection("company");
      } else if (scrollY >= applyTop) {
        setActiveSection("apply");
      } else {
        setActiveSection("post");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 로드시에도 실행
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollToSection]);

  return (
    <div className="flex flex-col items-center gap-0 sticky top-[140px]">
      {/* Post 버튼 */}
      <button
        onClick={() => scrollToRef(scrollToSection.postRef)}
        className={`w-20 h-20 flex flex-col items-center justify-center text-sm border border-gray-200 relative ${activeSection === "post" ? "bg-gray-50" : ""
          }`}
      >
        {activeSection === "post" && (
          <div className="absolute left-0 top-0 h-full w-[4px] bg-[#1842a3]" />
        )}
        <ClipboardList className="h-5 w-5 mb-1" />
        채용공고
      </button>

      {/* Apply 버튼 */}
      <button
        onClick={() => scrollToRef(scrollToSection.applyRef)}
        className={`w-20 h-20 flex flex-col items-center justify-center text-sm border-x border-b border-gray-200 relative ${activeSection === "apply" ? "bg-gray-50" : ""
          }`}
      >
        {activeSection === "apply" && (
          <div className="absolute left-0 top-0 h-full w-[4px] bg-[#1842a3]" />
        )}
        <Mouse className="h-5 w-5 mb-1" />
        접수방법
      </button>

      {/* Company 버튼 */}
      <button
        onClick={() => scrollToRef(scrollToSection.companyRef)}
        className={`w-20 h-20 flex flex-col items-center justify-center text-sm border-x border-b border-gray-200 relative ${activeSection === "company" ? "bg-gray-50" : ""
          }`}
      >
        {activeSection === "company" && (
          <div className="absolute left-0 top-0 h-full w-[4px] bg-[#1842a3]" />
        )}
        <Building className="h-5 w-5 mb-1" />
        기업정보
      </button>

      {/* 구분선 */}
      <div className="w-full border-t my-3"></div>

      {/* Top */}
      <button
        onClick={scrollToTop}
        className="w-20 h-20 flex flex-col items-center justify-center text-sm text-gray-500 hover:text-gray-700"
      >
        <ChevronUp className="h-5 w-5 mb-1" />
        Top
      </button>
    </div>
  );
};
