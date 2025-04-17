"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, X, Check } from "lucide-react"

// Define types for our filter data
type FilterCategory = "job" | "career" | "location" | "education"
type FilterItem = {
  id: string
  label: string
  selected?: boolean
}

export const JobsFilter = () => {
  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<FilterCategory | null>(null)

  // State for career range slider
  const [careerRange, setCareerRange] = useState<[number, number]>([0, 10])

  // State for selected filters
  const [selectedFilters, setSelectedFilters] = useState<{
    job: FilterItem[]
    career: string | null
    location: FilterItem[]
    education: FilterItem | null
  }>({
    job: [],
    career: null,
    location: [],
    education: null,
  })

  // Refs for dropdown containers
  const dropdownRefs = {
    job: useRef<HTMLDivElement>(null),
    career: useRef<HTMLDivElement>(null),
    location: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
  }

  // Sample data for filters
  const filterData = {
    job: [
      { id: "dev", label: "개발" },
      { id: "design", label: "디자인" },
      { id: "marketing", label: "마케팅" },
      { id: "sales", label: "영업" },
      { id: "management", label: "경영·비즈니스" },
      { id: "hr", label: "인사" },
      { id: "finance", label: "금융" },
      { id: "service", label: "서비스" },
    ],
    location: [
      { id: "seoul", label: "서울" },
      { id: "gyeonggi", label: "경기" },
      { id: "incheon", label: "인천" },
      { id: "busan", label: "부산" },
      { id: "daegu", label: "대구" },
      { id: "daejeon", label: "대전" },
      { id: "gwangju", label: "광주" },
      { id: "ulsan", label: "울산" },
    ],
    education: [
      { id: "high", label: "고졸" },
      { id: "college", label: "전문대졸" },
      { id: "bachelor", label: "대졸" },
      { id: "master", label: "석사" },
      { id: "phd", label: "박사" },
      { id: "any", label: "학력무관" },
    ],
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const currentRef = dropdownRefs[openDropdown]
        if (currentRef.current && !currentRef.current.contains(event.target as Node)) {
          setOpenDropdown(null)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdown])

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown: FilterCategory) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  // Handle job filter selection
  const toggleJobFilter = (item: FilterItem) => {
    setSelectedFilters((prev) => {
      const isSelected = prev.job.some((filter) => filter.id === item.id)

      if (isSelected) {
        return {
          ...prev,
          job: prev.job.filter((filter) => filter.id !== item.id),
        }
      } else {
        return {
          ...prev,
          job: [...prev.job, item],
        }
      }
    })
  }

  // Handle location filter selection
  const toggleLocationFilter = (item: FilterItem) => {
    setSelectedFilters((prev) => {
      const isSelected = prev.location.some((filter) => filter.id === item.id)

      if (isSelected) {
        return {
          ...prev,
          location: prev.location.filter((filter) => filter.id !== item.id),
        }
      } else {
        return {
          ...prev,
          location: [...prev.location, item],
        }
      }
    })
  }

  // Handle education filter selection
  const selectEducationFilter = (item: FilterItem) => {
    setSelectedFilters((prev) => ({
      ...prev,
      education: item,
    }))
  }

  // Handle career range selection
  const handleCareerRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setCareerRange([0, value])

    // Update career filter text
    if (value === 0) {
      setSelectedFilters((prev) => ({
        ...prev,
        career: null,
      }))
    } else if (value === 10) {
      setSelectedFilters((prev) => ({
        ...prev,
        career: "10년 이상",
      }))
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        career: `${value}년`,
      }))
    }
  }

  // Reset specific filter
  const resetFilter = (category: FilterCategory) => {
    if (category === "job") {
      setSelectedFilters((prev) => ({ ...prev, job: [] }))
    } else if (category === "career") {
      setCareerRange([0, 10])
      setSelectedFilters((prev) => ({ ...prev, career: null }))
    } else if (category === "location") {
      setSelectedFilters((prev) => ({ ...prev, location: [] }))
    } else if (category === "education") {
      setSelectedFilters((prev) => ({ ...prev, education: null }))
    }
  }

  // Reset all filters
  const resetAllFilters = () => {
    setSelectedFilters({
      job: [],
      career: null,
      location: [],
      education: null,
    })
    setCareerRange([0, 10])
  }

  // Remove a specific filter tag
  const removeFilterTag = (category: FilterCategory, id?: string) => {
    if (category === "job" && id) {
      setSelectedFilters((prev) => ({
        ...prev,
        job: prev.job.filter((item) => item.id !== id),
      }))
    } else if (category === "career") {
      setSelectedFilters((prev) => ({ ...prev, career: null }))
      setCareerRange([0, 10])
    } else if (category === "location" && id) {
      setSelectedFilters((prev) => ({
        ...prev,
        location: prev.location.filter((item) => item.id !== id),
      }))
    } else if (category === "education") {
      setSelectedFilters((prev) => ({ ...prev, education: null }))
    }
  }

  // Check if any filters are selected
  const hasActiveFilters = () => {
    return (
      selectedFilters.job.length > 0 ||
      selectedFilters.career !== null ||
      selectedFilters.location.length > 0 ||
      selectedFilters.education !== null
    )
  }

  return (
    <div className="border rounded-md p-4 mb-8">
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Job Filter */}
        <div className="relative" ref={dropdownRefs.job}>
          <button
            className={`flex items-center justify-between w-32 px-3 py-1.5 text-sm border rounded-md bg-white ${openDropdown === "job" ? "border-blue-500" : ""}`}
            onClick={() => toggleDropdown("job")}
          >
            <span>직무</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {openDropdown === "job" && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-white border rounded-md shadow-lg z-10">
              <div className="p-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="직무 검색"
                    className="w-full pl-8 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div className="max-h-60 overflow-y-auto mb-4">
                  {filterData.job.map((item) => (
                    <div key={item.id} className="flex items-center py-2">
                      <label className="flex items-center cursor-pointer w-full">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selectedFilters.job.some((filter) => filter.id === item.id)}
                          onChange={() => toggleJobFilter(item)}
                        />
                        <div
                          className={`w-5 h-5 border rounded mr-2 flex items-center justify-center ${selectedFilters.job.some((filter) => filter.id === item.id) ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
                        >
                          {selectedFilters.job.some((filter) => filter.id === item.id) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm">{item.label}</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <button className="text-sm text-gray-500" onClick={() => resetFilter("job")}>
                    초기화
                  </button>
                </div>
              </div>

              <div className="border-t p-3 flex justify-end">
                <button
                  className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                  onClick={() => setOpenDropdown(null)}
                >
                  적용
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Career Filter */}
        <div className="relative" ref={dropdownRefs.career}>
          <button
            className={`flex items-center justify-between w-32 px-3 py-1.5 text-sm border rounded-md bg-white ${openDropdown === "career" ? "border-blue-500" : ""}`}
            onClick={() => toggleDropdown("career")}
          >
            <span>경력</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {openDropdown === "career" && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-white border rounded-md shadow-lg z-10">
              <div className="p-4">
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">신입</span>
                    <span className="text-sm">{careerRange[1] === 10 ? "10년 이상" : `${careerRange[1]}년`}</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={careerRange[1]}
                    onChange={handleCareerRangeChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex justify-between">
                  <button className="text-sm text-gray-500" onClick={() => resetFilter("career")}>
                    초기화
                  </button>
                </div>
              </div>

              <div className="border-t p-3 flex justify-end">
                <button
                  className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                  onClick={() => setOpenDropdown(null)}
                >
                  적용
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Location Filter */}
        <div className="relative" ref={dropdownRefs.location}>
          <button
            className={`flex items-center justify-between w-32 px-3 py-1.5 text-sm border rounded-md bg-white ${openDropdown === "location" ? "border-blue-500" : ""}`}
            onClick={() => toggleDropdown("location")}
          >
            <span>지역</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {openDropdown === "location" && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-white border rounded-md shadow-lg z-10">
              <div className="p-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="지역 검색"
                    className="w-full pl-8 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div className="max-h-60 overflow-y-auto mb-4">
                  {filterData.location.map((item) => (
                    <div key={item.id} className="flex items-center py-2">
                      <label className="flex items-center cursor-pointer w-full">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selectedFilters.location.some((filter) => filter.id === item.id)}
                          onChange={() => toggleLocationFilter(item)}
                        />
                        <div
                          className={`w-5 h-5 border rounded mr-2 flex items-center justify-center ${selectedFilters.location.some((filter) => filter.id === item.id) ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
                        >
                          {selectedFilters.location.some((filter) => filter.id === item.id) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm">{item.label}</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <button className="text-sm text-gray-500" onClick={() => resetFilter("location")}>
                    초기화
                  </button>
                </div>
              </div>

              <div className="border-t p-3 flex justify-end">
                <button
                  className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                  onClick={() => setOpenDropdown(null)}
                >
                  적용
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Education Filter */}
        <div className="relative" ref={dropdownRefs.education}>
          <button
            className={`flex items-center justify-between w-32 px-3 py-1.5 text-sm border rounded-md bg-white ${openDropdown === "education" ? "border-blue-500" : ""}`}
            onClick={() => toggleDropdown("education")}
          >
            <span>학력</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {openDropdown === "education" && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-white border rounded-md shadow-lg z-10">
              <div className="p-4">
                <div className="max-h-60 overflow-y-auto mb-4">
                  {filterData.education.map((item) => (
                    <div key={item.id} className="flex items-center py-2">
                      <label className="flex items-center cursor-pointer w-full">
                        <input
                          type="radio"
                          className="sr-only"
                          checked={selectedFilters.education?.id === item.id}
                          onChange={() => selectEducationFilter(item)}
                        />
                        <div
                          className={`w-5 h-5 border rounded-full mr-2 flex items-center justify-center ${selectedFilters.education?.id === item.id ? "border-blue-500" : "border-gray-300"}`}
                        >
                          {selectedFilters.education?.id === item.id && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm">{item.label}</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <button className="text-sm text-gray-500" onClick={() => resetFilter("education")}>
                    초기화
                  </button>
                </div>
              </div>

              <div className="border-t p-3 flex justify-end">
                <button
                  className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                  onClick={() => setOpenDropdown(null)}
                >
                  적용
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full pl-3 pr-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Search className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Selected Filters */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {selectedFilters.job.map((item) => (
            <div key={item.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-xs">{item.label}</span>
              <button
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => removeFilterTag("job", item.id)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {selectedFilters.career && (
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-xs">{selectedFilters.career}</span>
              <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => removeFilterTag("career")}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {selectedFilters.location.map((item) => (
            <div key={item.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-xs">{item.label}</span>
              <button
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => removeFilterTag("location", item.id)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {selectedFilters.education && (
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-xs">{selectedFilters.education.label}</span>
              <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => removeFilterTag("education")}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <button className="ml-auto text-xs text-gray-500 hover:text-gray-700" onClick={resetAllFilters}>
            초기화
          </button>
        </div>
      )}
    </div>
  )
}
