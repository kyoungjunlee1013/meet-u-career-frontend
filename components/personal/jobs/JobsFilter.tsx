"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, X, Check } from "lucide-react"

// 필터 카테고리 타입
 type FilterCategory = "job" | "career" | "location" | "education"
 // 필터 아이템 타입
 interface FilterItem { id: string; label: string }

 interface JobsFilterProps {
   onApply: (filters: { industry?: string; experienceLevel?: number; educationLevel?: number; locationCode?: string; keyword?: string }) => void
 }

 export const JobsFilter = ({ onApply }: JobsFilterProps) => {
   const [openDropdown, setOpenDropdown] = useState<FilterCategory | null>(null)
   const [keyword, setKeyword] = useState("")
   const [selectedJob, setSelectedJob] = useState<FilterItem[]>([])
   const [career, setCareer] = useState<number | null>(null)
   const [education, setEducation] = useState<FilterItem | null>(null)
   const [locations, setLocations] = useState<FilterItem[]>([])
   const [allLocations, setAllLocations] = useState<FilterItem[]>([])

   const dropdownRefs = {
     job: useRef<HTMLDivElement>(null), career: useRef<HTMLDivElement>(null), location: useRef<HTMLDivElement>(null), education: useRef<HTMLDivElement>(null)
   }

   useEffect(() => {
     const handleClickOutside = (e: MouseEvent) => {
       if (openDropdown) {
         const ref = dropdownRefs[openDropdown].current
         if (ref && !ref.contains(e.target as Node)) setOpenDropdown(null)
       }
     }
     document.addEventListener("mousedown", handleClickOutside)
     return () => document.removeEventListener("mousedown", handleClickOutside)
   }, [openDropdown])

   useEffect(() => {
     fetch("http://localhost:8080/api/locations")
       .then((res) => res.json())
       .then((data) => setAllLocations(data.map((loc: any) => ({ id: loc.locationCode, label: loc.fullLocation }))))
   }, [])

   const applyFilters = () => {
     const filters = {
       industry: selectedJob.map((j) => j.label).join(","),
       experienceLevel: career === null ? undefined : career,
       educationLevel: education ? Number(education.id) : undefined,
       locationCode: locations[0]?.id,
       keyword: keyword || undefined,
     }
     onApply(filters)
   }

   const jobOptions: FilterItem[] = [
     { id: "backend", label: "백엔드" },
     { id: "frontend", label: "프론트엔드" },
     { id: "devops", label: "DevOps" },
   ]

   return (
     <div className="border rounded-md p-4 mb-8">
       <div className="flex flex-wrap gap-4 mb-4">
         {/* 직무 */}
         <div className="relative" ref={dropdownRefs.job}>
           <button
             onClick={() => setOpenDropdown(openDropdown === "job" ? null : "job")}
             className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${openDropdown === "job" ? "border-blue-500" : ""}`}>
             직무<ChevronDown className="w-4 h-4 ml-1" />
           </button>
           {openDropdown === "job" && (
             <div className="absolute top-full mt-1 bg-white border rounded-md shadow-lg z-10 w-64 max-h-60 overflow-y-auto">
               {jobOptions.map((item) => (
                 <label key={item.id} className="flex items-center p-2 cursor-pointer">
                   <input
                     type="checkbox"
                     className="mr-2"
                     checked={selectedJob.some((j) => j.id === item.id)}
                     onChange={() => setSelectedJob((prev) => prev.some((j) => j.id === item.id) ? prev.filter((j) => j.id !== item.id) : [...prev, item])}
                   />
                   {item.label}
                 </label>
               ))}
             </div>
           )}
         </div>

         {/* 경력 */}
         <div className="relative" ref={dropdownRefs.career}>
           <button
             onClick={() => setOpenDropdown(openDropdown === "career" ? null : "career")}
             className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${openDropdown === "career" ? "border-blue-500" : ""}`}>
             경력<ChevronDown className="w-4 h-4 ml-1" />
           </button>
           {openDropdown === "career" && (
             <div className="absolute top-full mt-1 bg-white border rounded-md shadow-lg z-10 w-64 p-4">
               <input
                 type="range"
                 min={0}
                 max={10}
                 value={career ?? 0}
                 onChange={(e) => setCareer(Number(e.target.value))}
                 className="w-full"
               />
               <div className="text-sm mt-2">
                 {career === 0 ? "신입" : career === 10 ? "10년 이상" : `${career}년`}
               </div>
             </div>
           )}
         </div>

         {/* 지역 */}
         <div className="relative" ref={dropdownRefs.location}>
           <button
             onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
             className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${openDropdown === "location" ? "border-blue-500" : ""}`}>
             지역<ChevronDown className="w-4 h-4 ml-1" />
           </button>
           {openDropdown === "location" && (
             <div className="absolute top-full mt-1 bg-white border rounded-md shadow-lg z-10 w-64 max-h-60 overflow-y-auto">
               {allLocations.map((item) => (
                 <label key={item.id} className="flex items-center p-2 cursor-pointer">
                   <input
                     type="checkbox"
                     className="mr-2"
                     checked={locations.some((l) => l.id === item.id)}
                     onChange={() =>
                       setLocations((prev) => (prev.some((l) => l.id === item.id) ? prev.filter((l) => l.id !== item.id) : [...prev, item]))
                     }
                   />
                   {item.label}
                 </label>
               ))}
             </div>
           )}
         </div>

         {/* 학력 */}
         <div className="relative" ref={dropdownRefs.education}>
           <button
             onClick={() => setOpenDropdown(openDropdown === "education" ? null : "education")}
             className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${openDropdown === "education" ? "border-blue-500" : ""}`}>
             학력<ChevronDown className="w-4 h-4 ml-1" />
           </button>
           {openDropdown === "education" && (
             <div className="absolute top-full mt-1 bg-white border rounded-md shadow-lg z-10 w-64">
               {['고졸','전문대졸','대졸','석사','박사','학력무관'].map((label, idx) => (
                 <label key={idx} className="flex items-center p-2 cursor-pointer">
                   <input
                     type="radio"
                     name="edu"
                     className="mr-2"
                     checked={education?.label === label}
                     onChange={() => setEducation({ id: String(idx), label })}
                   />
                   {label}
                 </label>
               ))}
             </div>
           )}
         </div>
       </div>

       {/* 검색어 입력 및 적용 */}
       <div className="relative mb-4">
         <input
           value={keyword}
           onChange={(e) => setKeyword(e.target.value)}
           type="text"
           placeholder="검색어를 입력하세요"
           className="w-full pl-3 pr-10 py-2 border rounded-md focus:ring-blue-500"
         />
         <button
           className="absolute right-3 top-1/2 transform -translate-y-1/2"
           onClick={applyFilters}
         >
           <Search className="w-4 h-4 text-gray-400" />
         </button>
       </div>
       <div className="flex justify-end">
         <button onClick={applyFilters} className="px-4 py-1 bg-blue-500 text-white rounded-md">
           적용
         </button>
       </div>
     </div>
   )
 }
