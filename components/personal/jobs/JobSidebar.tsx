// "use client";

// import { ClipboardList, Building, Mouse, ChevronUp } from "lucide-react";
// import { RefObject } from "react";

// interface JobSidebarProps {
//   scrollToSection: {
//     postRef: RefObject<HTMLDivElement | null>;
//     applyRef: RefObject<HTMLDivElement | null>;
//     companyRef: RefObject<HTMLDivElement | null>;
//   };
// }

// export const JobSidebar = ({ scrollToSection }: JobSidebarProps) => {
//   const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="flex flex-col items-center gap-6 sticky top-6">
//       <button
//         onClick={() => scrollTo(scrollToSection.postRef)}
//         className="w-12 h-12 flex flex-col items-center justify-center text-blue-600 hover:text-blue-700"
//       >
//         <ClipboardList className="h-5 w-5 mb-1" />
//         <span className="text-xs">채용공고</span>
//       </button>

//       <button
//         onClick={() => scrollTo(scrollToSection.applyRef)}
//         className="w-12 h-12 flex flex-col items-center justify-center text-gray-600 hover:text-gray-700"
//       >
//         <div className="flex items-center justify-center h-5 w-5 mb-1">
//           <span className="text-sm">i</span>
//         </div>
//         <Mouse className="h-5 w-5 mb-1" />
//         <span className="text-xs">접수방법</span>
//       </button>

//       <button
//         onClick={() => scrollTo(scrollToSection.companyRef)}
//         className="w-12 h-12 flex flex-col items-center justify-center text-gray-600 hover:text-gray-700"
//       >
//         <Building className="h-5 w-5 mb-1" />
//         <span className="text-xs">기업정보</span>
//       </button>

//       <button
//         onClick={scrollToTop}
//         className="w-12 h-12 flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
//       >
//         <ChevronUp className="h-5 w-5 mb-1" />
//         <span className="text-xs">Top</span>
//       </button>
//     </div>
//   );
// };

"use client";

import { ChevronUp, ClipboardList, FileText, Home } from "lucide-react";
import Link from "next/link";

interface JobSidebarProps {
  scrollToSection: {
    postRef: React.RefObject<HTMLDivElement>;
    applyRef: React.RefObject<HTMLDivElement>;
    companyRef: React.RefObject<HTMLDivElement>;
  };
}

export const JobSidebar = ({ scrollToSection }: JobSidebarProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center gap-6 sticky top-6">
      {/* 채용공고로 이동 */}
      <button onClick={() => scrollToRef(scrollToSection.postRef)}>
        <Home className="h-5 w-5 mb-1 text-blue-600" />
        <span className="text-xs">Post</span>
      </button>

      {/* 접수방법으로 이동 */}
      <button onClick={() => scrollToRef(scrollToSection.applyRef)}>
        <ClipboardList className="h-5 w-5 mb-1 text-gray-500" />
        <span className="text-xs">Apply</span>
      </button>

      {/* 기업정보로 이동 */}
      <button onClick={() => scrollToRef(scrollToSection.companyRef)}>
        <FileText className="h-5 w-5 mb-1 text-gray-600" />
        <span className="text-xs">Company</span>
      </button>

      {/* 최상단 이동 */}
      <button
        onClick={scrollToTop}
        className="text-gray-500 hover:text-gray-700"
      >
        <ChevronUp className="h-5 w-5 mb-1" />
        <span className="text-xs">Top</span>
      </button>
    </div>
  );
};
