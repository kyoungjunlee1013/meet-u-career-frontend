"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, X, Check } from "lucide-react"
import { join } from "path"

type FilterCategory = "job" | "career" | "location" | "education"
type FilterItem = { id: string; label: string }

interface Location {
  locationCode: string
  province: string
  city: string | null
  fullLocation: string
}

interface JobsFilterProps {
  onApply: (filters: {
    industry?: string
    experienceLevel?: number
    educationLevel?: number
    locationCode?: string
    keyword?: string
  }) => void
}

export const JobsFilter = ({ onApply }: JobsFilterProps) => {
  const [openDropdown, setOpenDropdown] = useState<FilterCategory | null>(null)
  const [keyword, setKeyword] = useState("")
  const [career, setCareer] = useState<number | null>(null)
  const [education, setEducation] = useState<FilterItem | null>(null)
  const [selectedJobs, setSelectedJobs] = useState<FilterItem[]>([])
  const [locations, setLocations] = useState<FilterItem[]>([])
  const [allLocations, setAllLocations] = useState<Location[]>([])
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null)

  const dropdownRefs = {
    job: useRef<HTMLDivElement>(null),
    career: useRef<HTMLDivElement>(null),
    location: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown) {
        const ref = dropdownRefs[openDropdown].current
        if (ref && !ref.contains(e.target as Node)) {
          setOpenDropdown(null)
          setExpandedProvince(null)
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openDropdown])

  useEffect(() => {
    fetch("http://localhost:8080/api/locations")
      .then((res) => res.json())
      .then((data) => setAllLocations(data))
  }, [])

  const provinces = Array.from(
    new Set(allLocations.map((l) => l.province))
  ).map((p) => ({ id: p, label: p }))

  const applyFilters = () => {
    const filters = {
      industry: selectedJobs.map((j) => j.label).join(","),
      experienceLevel: career ?? undefined,
      educationLevel: education ? Number(education.id) : undefined,
      locationCode: locations.map(l => l.id).join(","),
      keyword: keyword || undefined,
    }
    console.log("선택된 지역:", filters);
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
            className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${openDropdown === "job" ? "border-blue-500" : ""}`}
          >
            직무 <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          {openDropdown === "job" && (
            <div className="absolute top-full mt-1 w-80 bg-white border rounded-md shadow-lg z-10">
              <div className="p-4 max-h-60 overflow-y-auto">
                {jobOptions.map((item) => (
                  <label key={item.id} className="flex items-center py-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedJobs.some((j) => j.id === item.id)}
                      onChange={() =>
                        setSelectedJobs((prev) =>
                          prev.some((j) => j.id === item.id)
                            ? prev.filter((j) => j.id !== item.id)
                            : [...prev, item]
                        )
                      }
                    />
                    {item.label}
                  </label>
                ))}
              </div>
              <div className="border-t px-4 py-2 flex justify-between">
                <button className="text-sm text-gray-500" onClick={() => setSelectedJobs([])}>
                  초기화
                </button>
                <button className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm" onClick={() => setOpenDropdown(null)}>
                  적용
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 경력 */}
        <div className="relative" ref={dropdownRefs.career}>
          <button
            onClick={() => setOpenDropdown(openDropdown === "career" ? null : "career")}
            className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${openDropdown === "career" ? "border-blue-500" : ""}`}
          >
            경력 <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          {openDropdown === "career" && (
            <div className="absolute top-full mt-1 w-80 bg-white border rounded-md shadow-lg z-10">
              <div className="p-4">
                <div className="flex justify-between mb-2 text-sm">
                  <span>신입</span>
                  <span>{career === 10 ? "10년 이상" : `${career ?? 0}년`}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={career ?? 0}
                  onChange={(e) => setCareer(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="border-t px-4 py-2 flex justify-between">
                <button className="text-sm text-gray-500" onClick={() => setCareer(null)}>
                  초기화
                </button>
                <button className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm" onClick={() => setOpenDropdown(null)}>
                  적용
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 지역 */}
        <div className="relative" ref={dropdownRefs.location}>
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "location" ? null : "location")
            }
            className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${
              openDropdown === "location" ? "border-blue-500" : ""
            }`}
          >
            지역 <ChevronDown className="w-4 h-4 ml-1" />
          </button>

          {openDropdown === "location" && (
            <div className="absolute top-full mt-1 w-80 bg-white border rounded-md shadow-lg z-10">
              <div className="p-4 max-h-60 overflow-y-auto">
                {provinces.map((province) => {
                  const isExpanded = expandedProvince === province.label
                  const relatedCities = allLocations
                    .filter((l) => l.province === province.label && l.city)
                    .map((l) => ({ id: l.locationCode, label: l.fullLocation }))

                  const provinceItem = allLocations.find(
                    (l) => l.province === province.label && l.city === null
                  )
                  const provinceId = provinceItem?.locationCode

                  return (
                    <div key={province.id} className="mb-1">
                      <div className="flex items-center justify-between w-full">
                        <button
                          type="button"
                          className="text-sm font-medium py-1.5 text-left"
                          onClick={() => {
                            const isNowExpanded = expandedProvince === province.label
                            setExpandedProvince(isNowExpanded ? null : province.label)

                            // province 클릭 시 전체 지역 선택
                            if (
                              provinceItem &&
                              !locations.some((l) => l.id === provinceItem.locationCode)
                            ) {
                              setLocations((prev) => [
                                ...prev,
                                {
                                  id: provinceItem.locationCode,
                                  label: provinceItem.fullLocation,
                                },
                              ])
                            }
                          }}
                        >
                          {province.label}
                        </button>
                        {provinceId && (
                          <input
                            type="checkbox"
                            className="ml-2"
                            checked={locations.some((l) => l.id === provinceId)}
                            onChange={() =>
                              setLocations((prev) =>
                                prev.some((l) => l.id === provinceId)
                                  ? prev.filter((l) => l.id !== provinceId)
                                  : [...prev, { id: provinceId, label: province.label }]
                              )
                            }
                          />
                        )}
                      </div>

                      {isExpanded &&
                        relatedCities.map((item) => (
                          <label key={item.id} className="flex items-center ml-3 py-1 cursor-pointer">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={locations.some((l) => l.id === item.id)}
                              onChange={() =>
                                setLocations((prev) =>
                                  prev.some((l) => l.id === item.id)
                                    ? prev.filter((l) => l.id !== item.id)
                                    : [...prev, item]
                                )
                              }
                            />
                            <span className="text-sm">{item.label}</span>
                          </label>
                        ))}
                    </div>
                  )
                })}
              </div>

              {/* 초기화 / 적용 버튼 */}
              <div className="border-t px-4 py-2 flex justify-between">
                <button
                  className="text-sm text-gray-500"
                  onClick={() => {
                    setLocations([])
                    setExpandedProvince(null)
                  }}
                >
                  초기화
                </button>
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm"
                  onClick={() => {
                    applyFilters()          
                    setOpenDropdown(null)
                  }}
                >
                  적용
                </button>
              </div>
            </div>
          )}
        </div>
        {/* 학력 */}
        <div className="relative" ref={dropdownRefs.education}>
          <button
            onClick={() => setOpenDropdown(openDropdown === "education" ? null : "education")}
            className={`flex items-center justify-between w-32 px-3 py-1.5 border rounded-md bg-white ${openDropdown === "education" ? "border-blue-500" : ""}`}
          >
            학력 <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          {openDropdown === "education" && (
            <div className="absolute top-full mt-1 w-80 bg-white border rounded-md shadow-lg z-10">
              <div className="p-4 max-h-60 overflow-y-auto">
                {["고졸", "전문대졸", "대졸", "석사", "박사", "학력무관"].map((label, idx) => (
                  <label key={idx} className="flex items-center py-2 cursor-pointer">
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
              <div className="border-t px-4 py-2 flex justify-between">
                <button className="text-sm text-gray-500" onClick={() => setEducation(null)}>
                  초기화
                </button>
                <button className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm" onClick={() => setOpenDropdown(null)}>
                  적용
                </button>
              </div>
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

      {/* 선택된 필터 출력 */}
      {(selectedJobs.length > 0 || locations.length > 0 || education || career !== null) && (
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {selectedJobs.map((item) => (
            <div key={item.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-xs">{item.label}</span>
              <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() =>
                setSelectedJobs((prev) => prev.filter((j) => j.id !== item.id))}>
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {locations.map((item) => (
            <div key={item.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-xs">{item.label}</span>
              <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() =>
                setLocations((prev) => prev.filter((l) => l.id !== item.id))}>
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {education && (
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-xs">{education.label}</span>
              <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => setEducation(null)}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {career !== null && (
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-xs">{career === 10 ? "10년 이상" : `${career}년`}</span>
              <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => setCareer(null)}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <button className="ml-auto text-xs text-gray-500 hover:text-gray-700" onClick={() => {
            setSelectedJobs([])
            setLocations([])
            setEducation(null)
            setCareer(null)
            setKeyword("")
          }}>
            전체 초기화
          </button>
        </div>
      )}
    </div>
  )
}
