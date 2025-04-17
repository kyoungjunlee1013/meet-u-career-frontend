"use client"

import type React from "react"

import { useState } from "react"
import { Edit2, Plus, Trash2, Upload, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { ResumeSection } from "./ResumeEditor"

interface ResumeSectionEditorCardProps {
  section: ResumeSection
  onContentUpdate: (content: any) => void
}

export function ResumeSectionEditorCard({ section, onContentUpdate }: ResumeSectionEditorCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [sectionTitle, setSectionTitle] = useState(section.title)

  const handleTitleSave = () => {
    setIsEditingTitle(false)
    // In a real app, you would update the section title in the database
  }

  const renderSectionContent = () => {
    switch (section.sectionType) {
      case 0: // Education
        return <EducationSection content={section.content} onContentUpdate={onContentUpdate} />
      case 1: // Experience
        return <ExperienceSection content={section.content} onContentUpdate={onContentUpdate} />
      case 2: // Certifications
        return <CertificationsSection content={section.content} onContentUpdate={onContentUpdate} />
      case 3: // Activities
        return <ActivitiesSection content={section.content} onContentUpdate={onContentUpdate} />
      case 4: // Portfolio
        return <PortfolioSection content={section.content} onContentUpdate={onContentUpdate} />
      case 5: // Cover Letter
        return <CoverLetterSection content={section.content} onContentUpdate={onContentUpdate} />
      case 6: // Custom
        return <CustomSection content={section.content} onContentUpdate={onContentUpdate} />
      default:
        return <div>Unknown section type</div>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {isEditingTitle ? (
          <div className="flex items-center space-x-2 flex-1">
            <Input
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="max-w-xs"
              autoFocus
            />
            <Button size="sm" onClick={handleTitleSave}>
              저장
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditingTitle(false)}>
              취소
            </Button>
          </div>
        ) : (
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            {section.title}
            <button
              onClick={() => setIsEditingTitle(true)}
              className="ml-2 text-gray-400 hover:text-gray-600"
              aria-label="Edit section title"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </h3>
        )}
      </div>

      <div className="p-6">{renderSectionContent()}</div>
    </div>
  )
}

// Education Section
function EducationSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  const [educations, setEducations] = useState<any[]>(content || [])

  const handleAddEducation = () => {
    const newEducation = {
      id: `edu-${Date.now()}`,
      school: "",
      major: "",
      degree: "",
      startDate: "",
      endDate: "",
      isAttending: false,
      description: "",
    }

    setEducations([...educations, newEducation])
    onContentUpdate([...educations, newEducation])
  }

  const handleUpdateEducation = (index: number, field: string, value: any) => {
    const updatedEducations = [...educations]
    updatedEducations[index] = { ...updatedEducations[index], [field]: value }
    setEducations(updatedEducations)
    onContentUpdate(updatedEducations)
  }

  const handleRemoveEducation = (index: number) => {
    const updatedEducations = educations.filter((_, i) => i !== index)
    setEducations(updatedEducations)
    onContentUpdate(updatedEducations)
  }

  return (
    <div className="space-y-6">
      {educations.map((education, index) => (
        <div key={education.id} className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium">학력 정보 #{index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveEducation(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor={`school-${index}`}>
                학교 <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`school-${index}`}
                value={education.school}
                onChange={(e) => handleUpdateEducation(index, "school", e.target.value)}
                placeholder="학교명을 입력하세요"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`major-${index}`}>전공</Label>
              <Input
                id={`major-${index}`}
                value={education.major}
                onChange={(e) => handleUpdateEducation(index, "major", e.target.value)}
                placeholder="전공을 입력하세요"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor={`degree-${index}`}>학위</Label>
              <Select value={education.degree} onValueChange={(value) => handleUpdateEducation(index, "degree", value)}>
                <SelectTrigger id={`degree-${index}`} className="mt-1">
                  <SelectValue placeholder="학위를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="고등학교">고등학교</SelectItem>
                  <SelectItem value="전문학사">전문학사</SelectItem>
                  <SelectItem value="학사">학사</SelectItem>
                  <SelectItem value="석사">석사</SelectItem>
                  <SelectItem value="박사">박사</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`startDate-${index}`}>
                  시작일 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`startDate-${index}`}
                  type="month"
                  value={education.startDate}
                  onChange={(e) => handleUpdateEducation(index, "startDate", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${index}`}>종료일</Label>
                <Input
                  id={`endDate-${index}`}
                  type="month"
                  value={education.endDate}
                  onChange={(e) => handleUpdateEducation(index, "endDate", e.target.value)}
                  disabled={education.isAttending}
                  className={`mt-1 ${education.isAttending ? "bg-gray-100" : ""}`}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                id={`isAttending-${index}`}
                checked={education.isAttending}
                onCheckedChange={(checked) => handleUpdateEducation(index, "isAttending", checked)}
              />
              <Label htmlFor={`isAttending-${index}`}>현재 재학 중</Label>
            </div>
          </div>

          <div>
            <Label htmlFor={`description-${index}`}>설명</Label>
            <Textarea
              id={`description-${index}`}
              value={education.description}
              onChange={(e) => handleUpdateEducation(index, "description", e.target.value)}
              placeholder="추가 정보를 입력하세요 (학점, 수강 과목 등)"
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={handleAddEducation}
      >
        <Plus className="h-4 w-4 mr-2" />
        학력 추가
      </Button>
    </div>
  )
}

// Experience Section
function ExperienceSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  const [experiences, setExperiences] = useState<any[]>(content || [])

  const handleAddExperience = () => {
    const newExperience = {
      id: `exp-${Date.now()}`,
      company: "",
      department: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrentlyWorking: false,
      description: "",
    }

    setExperiences([...experiences, newExperience])
    onContentUpdate([...experiences, newExperience])
  }

  const handleUpdateExperience = (index: number, field: string, value: any) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value }
    setExperiences(updatedExperiences)
    onContentUpdate(updatedExperiences)
  }

  const handleRemoveExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(updatedExperiences)
    onContentUpdate(updatedExperiences)
  }

  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => (
        <div key={experience.id} className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium">경력 정보 #{index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveExperience(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor={`company-${index}`}>
                회사명 <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`company-${index}`}
                value={experience.company}
                onChange={(e) => handleUpdateExperience(index, "company", e.target.value)}
                placeholder="회사명을 입력하세요"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`department-${index}`}>부서</Label>
              <Input
                id={`department-${index}`}
                value={experience.department}
                onChange={(e) => handleUpdateExperience(index, "department", e.target.value)}
                placeholder="부서를 입력하세요"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor={`position-${index}`}>
                직책 <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`position-${index}`}
                value={experience.position}
                onChange={(e) => handleUpdateExperience(index, "position", e.target.value)}
                placeholder="직책을 입력하세요"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`startDate-${index}`}>
                  시작일 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`startDate-${index}`}
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => handleUpdateExperience(index, "startDate", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${index}`}>종료일</Label>
                <Input
                  id={`endDate-${index}`}
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => handleUpdateExperience(index, "endDate", e.target.value)}
                  disabled={experience.isCurrentlyWorking}
                  className={`mt-1 ${experience.isCurrentlyWorking ? "bg-gray-100" : ""}`}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                id={`isCurrentlyWorking-${index}`}
                checked={experience.isCurrentlyWorking}
                onCheckedChange={(checked) => handleUpdateExperience(index, "isCurrentlyWorking", checked)}
              />
              <Label htmlFor={`isCurrentlyWorking-${index}`}>현재 재직 중</Label>
            </div>
          </div>

          <div>
            <Label htmlFor={`description-${index}`}>업무 설명</Label>
            <Textarea
              id={`description-${index}`}
              value={experience.description}
              onChange={(e) => handleUpdateExperience(index, "description", e.target.value)}
              placeholder="담당 업무, 성과 등을 입력하세요"
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={handleAddExperience}
      >
        <Plus className="h-4 w-4 mr-2" />
        경력 추가
      </Button>
    </div>
  )
}

// Certifications Section
function CertificationsSection({
  content,
  onContentUpdate,
}: { content: any; onContentUpdate: (content: any) => void }) {
  const [certifications, setCertifications] = useState<any[]>(content || [])

  const handleAddCertification = () => {
    const newCertification = {
      id: `cert-${Date.now()}`,
      name: "",
      organization: "",
      acquisitionDate: "",
      field: "",
      description: "",
    }

    setCertifications([...certifications, newCertification])
    onContentUpdate([...certifications, newCertification])
  }

  const handleUpdateCertification = (index: number, field: string, value: any) => {
    const updatedCertifications = [...certifications]
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value }
    setCertifications(updatedCertifications)
    onContentUpdate(updatedCertifications)
  }

  const handleRemoveCertification = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index)
    setCertifications(updatedCertifications)
    onContentUpdate(updatedCertifications)
  }

  return (
    <div className="space-y-6">
      {certifications.map((certification, index) => (
        <div key={certification.id} className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium">자격증 정보 #{index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveCertification(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor={`name-${index}`}>
                자격증명 <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`name-${index}`}
                value={certification.name}
                onChange={(e) => handleUpdateCertification(index, "name", e.target.value)}
                placeholder="자격증명을 입력하세요"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`organization-${index}`}>발급 기관</Label>
              <Input
                id={`organization-${index}`}
                value={certification.organization}
                onChange={(e) => handleUpdateCertification(index, "organization", e.target.value)}
                placeholder="발급 기관을 입력하세요"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor={`acquisitionDate-${index}`}>취득일</Label>
              <Input
                id={`acquisitionDate-${index}`}
                type="date"
                value={certification.acquisitionDate}
                onChange={(e) => handleUpdateCertification(index, "acquisitionDate", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`field-${index}`}>분야</Label>
              <Input
                id={`field-${index}`}
                value={certification.field}
                onChange={(e) => handleUpdateCertification(index, "field", e.target.value)}
                placeholder="분야를 입력하세요"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor={`description-${index}`}>설명</Label>
            <Textarea
              id={`description-${index}`}
              value={certification.description}
              onChange={(e) => handleUpdateCertification(index, "description", e.target.value)}
              placeholder="자격증에 대한 추가 정보를 입력하세요"
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={handleAddCertification}
      >
        <Plus className="h-4 w-4 mr-2" />
        자격증 추가
      </Button>
    </div>
  )
}

// Activities Section
function ActivitiesSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  const [activities, setActivities] = useState<any[]>(content || [])

  const handleAddActivity = () => {
    const newActivity = {
      id: `act-${Date.now()}`,
      name: "",
      organization: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    }

    setActivities([...activities, newActivity])
    onContentUpdate([...activities, newActivity])
  }

  const handleUpdateActivity = (index: number, field: string, value: any) => {
    const updatedActivities = [...activities]
    updatedActivities[index] = { ...updatedActivities[index], [field]: value }
    setActivities(updatedActivities)
    onContentUpdate(updatedActivities)
  }

  const handleRemoveActivity = (index: number) => {
    const updatedActivities = activities.filter((_, i) => i !== index)
    setActivities(updatedActivities)
    onContentUpdate(updatedActivities)
  }

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div key={activity.id} className="p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium">활동/경험 정보 #{index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveActivity(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor={`name-${index}`}>
                활동명 <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`name-${index}`}
                value={activity.name}
                onChange={(e) => handleUpdateActivity(index, "name", e.target.value)}
                placeholder="활동명을 입력하세요"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`organization-${index}`}>기관/단체</Label>
              <Input
                id={`organization-${index}`}
                value={activity.organization}
                onChange={(e) => handleUpdateActivity(index, "organization", e.target.value)}
                placeholder="기관/단체를 입력하세요"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor={`field-${index}`}>분야</Label>
              <Input
                id={`field-${index}`}
                value={activity.field}
                onChange={(e) => handleUpdateActivity(index, "field", e.target.value)}
                placeholder="분야를 입력하세요"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`startDate-${index}`}>시작일</Label>
              <Input
                id={`startDate-${index}`}
                type="date"
                value={activity.startDate}
                onChange={(e) => handleUpdateActivity(index, "startDate", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`endDate-${index}`}>종료일</Label>
              <Input
                id={`endDate-${index}`}
                type="date"
                value={activity.endDate}
                onChange={(e) => handleUpdateActivity(index, "endDate", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor={`description-${index}`}>설명</Label>
            <Textarea
              id={`description-${index}`}
              value={activity.description}
              onChange={(e) => handleUpdateActivity(index, "description", e.target.value)}
              placeholder="활동 내용, 성과 등을 입력하세요"
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={handleAddActivity}
      >
        <Plus className="h-4 w-4 mr-2" />
        활동/경험 추가
      </Button>
    </div>
  )
}

// Portfolio Section
function PortfolioSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  const [portfolioItems, setPortfolioItems] = useState<any[]>(content || [])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newItems = Array.from(files).map((file) => ({
        id: `portfolio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        fileName: file.name,
        fileKey: `file-key-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // In a real app, this would be a server-generated key
        fileSize: file.size,
        fileType: file.type,
        uploadDate: new Date().toISOString(),
      }))

      const updatedItems = [...portfolioItems, ...newItems]
      setPortfolioItems(updatedItems)
      onContentUpdate(updatedItems)
    }
  }

  const handleRemoveItem = (id: string) => {
    const updatedItems = portfolioItems.filter((item) => item.id !== id)
    setPortfolioItems(updatedItems)
    onContentUpdate(updatedItems)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-6">
      <div className="border border-dashed border-gray-300 rounded-md p-6">
        <div className="text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">포트폴리오 파일 업로드</h4>
          <p className="text-sm text-gray-500 mb-4">PDF, PPT, DOCX, ZIP 등의 파일을 업로드하세요. (최대 10MB)</p>
          <label className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
            파일 선택
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.ppt,.pptx,.doc,.docx,.zip,.jpg,.jpeg,.png"
            />
          </label>
        </div>
      </div>

      {portfolioItems.length > 0 && (
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h4 className="font-medium">업로드된 파일 ({portfolioItems.length})</h4>
          </div>
          <ul className="divide-y divide-gray-200">
            {portfolioItems.map((item) => (
              <li key={item.id} className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded mr-3">
                    <Download className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.fileName}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(item.fileSize)} • {new Date(item.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Cover Letter Section
function CoverLetterSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(
    content || {
      selectedCoverLetterId: null,
      selectedCoverLetterTitle: null,
    },
  )

  // Mock cover letters for demonstration
  const coverLetters = [
    { id: "cl1", title: "백엔드 개발자 자기소개서", updatedAt: "2025-04-10" },
    { id: "cl2", title: "신입 개발자 자기소개서", updatedAt: "2025-04-05" },
    { id: "cl3", title: "경력직 지원 자기소개서", updatedAt: "2025-03-28" },
  ]

  const handleSelectCoverLetter = (id: string, title: string) => {
    const updated = {
      selectedCoverLetterId: id,
      selectedCoverLetterTitle: title,
    }
    setSelectedCoverLetter(updated)
    onContentUpdate(updated)
  }

  return (
    <div className="space-y-6">
      {coverLetters.length > 0 ? (
        <>
          <div className="mb-4">
            <Label htmlFor="coverLetter">자기소개서 선택</Label>
            <Select
              value={selectedCoverLetter.selectedCoverLetterId || ""}
              onValueChange={(value) => {
                const selected = coverLetters.find((cl) => cl.id === value)
                if (selected) {
                  handleSelectCoverLetter(selected.id, selected.title)
                }
              }}
            >
              <SelectTrigger id="coverLetter" className="mt-1">
                <SelectValue placeholder="자기소개서를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {coverLetters.map((cl) => (
                  <SelectItem key={cl.id} value={cl.id}>
                    {cl.title} ({cl.updatedAt})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCoverLetter.selectedCoverLetterId && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">선택된 자기소개서</h4>
              <p className="text-gray-700">{selectedCoverLetter.selectedCoverLetterTitle}</p>
              <p className="text-sm text-gray-500 mt-1">
                최종 수정일: {coverLetters.find((cl) => cl.id === selectedCoverLetter.selectedCoverLetterId)?.updatedAt}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">작성된 자기소개서가 없습니다.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a href="/personal/mypage/cover-letter/create">작성하러 가기</a>
          </Button>
        </div>
      )}
    </div>
  )
}

// Custom Section
function CustomSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  // For simplicity, we'll just use a textarea for custom sections
  const [customContent, setCustomContent] = useState(content?.text || "")

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomContent(e.target.value)
    onContentUpdate({ text: e.target.value })
  }

  return (
    <div>
      <Label htmlFor="customContent">내용</Label>
      <Textarea
        id="customContent"
        value={customContent}
        onChange={handleContentChange}
        placeholder="내용을 입력하세요"
        className="mt-1"
        rows={6}
      />
    </div>
  )
}
