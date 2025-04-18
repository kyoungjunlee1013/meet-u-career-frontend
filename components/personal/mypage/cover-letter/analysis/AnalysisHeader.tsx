"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getJobCategories, getJobTitles, getJobPostings } from "./actions"

interface AnalysisHeaderProps {
  title: string;
  onJobCategoryChange: (category: string | null) => void;
  onJobTitleChange: (title: string | null) => void;
}

export const AnalysisHeader = ({
  title,
  onJobCategoryChange,
  onJobTitleChange,
}: AnalysisHeaderProps) => {
  const [jobCategories, setJobCategories] = useState<any[]>([])
  const [jobTitles, setJobTitles] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        setLoading(true)
        const categories = await getJobCategories()
        setJobCategories(categories)
      } catch (error) {
        console.error("Failed to fetch job categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobCategories()
  }, [])

  useEffect(() => {
    const fetchJobTitles = async () => {
      if (!selectedCategory) {
        setJobTitles([])
        return
      }

      try {
        setLoading(true)
        const titles = await getJobTitles(selectedCategory)
        setJobTitles(titles)
      } catch (error) {
        console.error("Failed to fetch job titles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobTitles()
  }, [selectedCategory])


  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setSelectedTitle(null)
    onJobCategoryChange(value)
    onJobTitleChange(null)
  }

  const handleTitleChange = (value: string) => {
    setSelectedTitle(value)
    onJobTitleChange(value)
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">{title} - 직무 적합도 분석</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="job-category" className="block text-sm font-medium text-gray-700 mb-1">
              직무 카테고리 (필수)
            </label>
            <Select value={selectedCategory || ""} onValueChange={handleCategoryChange} disabled={loading}>
              <SelectTrigger id="job-category" className="w-full">
                <SelectValue placeholder="직무 카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                {jobCategories.map((category) => (
                  <SelectItem key={category.jobCode} value={category.jobCode}>
                    {category.jobName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 mb-1">
              세부 직무 (필수)
            </label>
            <Select
              value={selectedTitle || ""}
              onValueChange={handleTitleChange}
              disabled={!selectedCategory || loading}
            >
              <SelectTrigger id="job-title" className="w-full">
                <SelectValue placeholder="세부 직무 선택" />
              </SelectTrigger>
              <SelectContent>
                {jobTitles.map((title) => (
                  <SelectItem key={title.jobCode} value={title.jobCode}>
                    {title.jobName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


        </div>
      </CardContent>
    </Card>
  )
}
