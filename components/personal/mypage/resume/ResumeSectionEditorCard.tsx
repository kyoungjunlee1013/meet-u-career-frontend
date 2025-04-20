"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Edit2, Plus, Trash2, Upload } from "lucide-react"
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

// EducationSection
function EducationSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  const [list, setList] = useState(content || [])
  const handleChange = (idx: number, key: string, value: string) => {
    const updated = list.map((item: any, i: number) => i === idx ? { ...item, [key]: value } : item)
    setList(updated)
    onContentUpdate(updated)
  }
  const handleAdd = () => {
    const updated = [...list, { organization: '', field: '', degree: '', startDate: '', endDate: '', description: '' }]
    setList(updated)
    onContentUpdate(updated)
  }
  const handleRemove = (idx: number) => {
    const updated = list.filter((_: any, i: number) => i !== idx)
    setList(updated)
    onContentUpdate(updated)
  }
  return (
    <div className="space-y-8">
      {list.map((item: any, idx: number) => (
        <div key={idx} className="bg-gray-50 rounded-lg border p-6 mb-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div>
              <Label htmlFor={`organization-${idx}`}>학교명 <span className="text-red-500">*</span></Label>
              <Input id={`organization-${idx}`} placeholder="학교명을 입력하세요" value={item.organization} onChange={e => handleChange(idx, 'organization', e.target.value)} />
            </div>
            <div>
              <Label htmlFor={`field-${idx}`}>전공</Label>
              <Input id={`field-${idx}`} placeholder="전공을 입력하세요" value={item.field} onChange={e => handleChange(idx, 'field', e.target.value)} />
            </div>
            <div>
              <Label htmlFor={`degree-${idx}`}>학위</Label>
              <Input id={`degree-${idx}`} placeholder="학위를 입력하세요" value={item.degree} onChange={e => handleChange(idx, 'degree', e.target.value)} />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor={`startDate-${idx}`}>입학일</Label>
                <Input id={`startDate-${idx}`} placeholder="연도-월-일" value={item.startDate} onChange={e => handleChange(idx, 'startDate', e.target.value)} type="date" />
              </div>
              <div className="flex-1">
                <Label htmlFor={`endDate-${idx}`}>졸업일</Label>
                <Input id={`endDate-${idx}`} placeholder="연도-월-일" value={item.endDate} onChange={e => handleChange(idx, 'endDate', e.target.value)} type="date" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor={`description-${idx}`}>설명</Label>
            <Textarea id={`description-${idx}`} placeholder="학력 관련 설명을 입력하세요" value={item.description} onChange={e => handleChange(idx, 'description', e.target.value)} rows={3} />
          </div>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="destructive" onClick={() => handleRemove(idx)}>
              삭제
            </Button>
          </div>
        </div>
      ))}
      <Button size="sm" onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-1" /> 학력 추가
      </Button>
    </div>
  )
}

// ExperienceSection
function ExperienceSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  const [list, setList] = useState(content || [])
  const handleChange = (idx: number, key: string, value: string | boolean) => {
    const updated = list.map((item: any, i: number) => i === idx ? { ...item, [key]: value } : item)
    setList(updated)
    onContentUpdate(updated)
  }
  const handleAdd = () => {
    const updated = [...list, { organization: '', department: '', position: '', startDate: '', endDate: '', isCurrentlyWorking: false, description: '' }]
    setList(updated)
    onContentUpdate(updated)
  }
  const handleRemove = (idx: number) => {
    const updated = list.filter((_: any, i: number) => i !== idx)
    setList(updated)
    onContentUpdate(updated)
  }
  return (
    <div className="space-y-8">
      {list.map((item: any, idx: number) => (
        <div key={idx} className="bg-gray-50 rounded-lg border p-6 mb-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div>
              <Label htmlFor={`organization-${idx}`}>회사명 <span className="text-red-500">*</span></Label>
              <Input id={`organization-${idx}`} placeholder="회사명을 입력하세요" value={item.organization} onChange={e => handleChange(idx, 'organization', e.target.value)} />
            </div>
            <div>
              <Label htmlFor={`department-${idx}`}>부서/직무</Label>
              <Input id={`department-${idx}`} placeholder="부서 또는 직무를 입력하세요" value={item.department} onChange={e => handleChange(idx, 'department', e.target.value)} />
            </div>
            <div>
              <Label htmlFor={`position-${idx}`}>직책</Label>
              <div className="flex items-center gap-2">
                <Input id={`position-${idx}`} placeholder="직책을 입력하세요" value={item.position} onChange={e => handleChange(idx, 'position', e.target.value)} />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`current-${idx}`}
                    checked={!!item.isCurrentlyWorking}
                    onChange={e => handleChange(idx, 'isCurrentlyWorking', e.target.checked)}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <Label htmlFor={`current-${idx}`} className="ml-1 text-sm font-normal cursor-pointer">현재 재직중</Label>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor={`startDate-${idx}`}>입사일</Label>
                <Input id={`startDate-${idx}`} placeholder="연도-월-일" value={item.startDate} onChange={e => handleChange(idx, 'startDate', e.target.value)} type="date" />
              </div>
              <div className="flex-1">
                <Label htmlFor={`endDate-${idx}`}>퇴사일</Label>
                <Input id={`endDate-${idx}`} placeholder="연도-월-일" value={item.endDate} onChange={e => handleChange(idx, 'endDate', e.target.value)} type="date" disabled={!!item.isCurrentlyWorking} />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor={`description-${idx}`}>주요 업무 및 성과</Label>
            <Textarea id={`description-${idx}`} placeholder="담당했던 주요 업무와 성과를 입력하세요" value={item.description} onChange={e => handleChange(idx, 'description', e.target.value)} rows={3} />
          </div>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="destructive" onClick={() => handleRemove(idx)}>
              삭제
            </Button>
          </div>
        </div>
      ))}
      <Button size="sm" onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-1" /> 경력 추가
      </Button>
    </div>
  )
}

// CertificationsSection
function CertificationsSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  const [list, setList] = useState(content || [])
  const handleChange = (idx: number, key: string, value: string) => {
    const updated = list.map((item: any, i: number) => i === idx ? { ...item, [key]: value } : item)
    setList(updated)
    onContentUpdate(updated)
  }
  const handleAdd = () => {
    const updated = [...list, { name: '', organization: '', date: '', description: '' }]
    setList(updated)
    onContentUpdate(updated)
  }
  const handleRemove = (idx: number) => {
    const updated = list.filter((_: any, i: number) => i !== idx)
    setList(updated)
    onContentUpdate(updated)
  }
  return (
    <div className="space-y-8">
      {list.map((item: any, idx: number) => (
        <div key={idx} className="bg-gray-50 rounded-lg border p-6 mb-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div>
              <Label htmlFor={`name-${idx}`}>자격증명 <span className="text-red-500">*</span></Label>
              <Input id={`name-${idx}`} placeholder="자격증명을 입력하세요" value={item.name} onChange={e => handleChange(idx, 'name', e.target.value)} />
            </div>
            <div>
              <Label htmlFor={`organization-${idx}`}>발급기관</Label>
              <Input id={`organization-${idx}`} placeholder="발급기관을 입력하세요" value={item.organization} onChange={e => handleChange(idx, 'organization', e.target.value)} />
            </div>
            <div>
              <Label htmlFor={`date-${idx}`}>취득일</Label>
              <Input id={`date-${idx}`} placeholder="연도-월-일" value={item.date} onChange={e => handleChange(idx, 'date', e.target.value)} type="date" />
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor={`description-${idx}`}>설명</Label>
            <Textarea id={`description-${idx}`} placeholder="자격증 관련 설명을 입력하세요" value={item.description} onChange={e => handleChange(idx, 'description', e.target.value)} rows={3} />
          </div>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="destructive" onClick={() => handleRemove(idx)}>
              삭제
            </Button>
          </div>
        </div>
      ))}
      <Button size="sm" onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-1" /> 자격증 추가
      </Button>
    </div>
  )
}

// ActivitiesSection
function ActivitiesSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  const [list, setList] = useState(content || [])
  const handleChange = (idx: number, key: string, value: string) => {
    const updated = list.map((item: any, i: number) => i === idx ? { ...item, [key]: value } : item)
    setList(updated)
    onContentUpdate(updated)
  }
  const handleAdd = () => {
    const updated = [...list, { name: '', organization: '', startDate: '', endDate: '', description: '' }]
    setList(updated)
    onContentUpdate(updated)
  }
  const handleRemove = (idx: number) => {
    const updated = list.filter((_: any, i: number) => i !== idx)
    setList(updated)
    onContentUpdate(updated)
  }
  return (
    <div className="space-y-8">
      {list.map((item: any, idx: number) => (
        <div key={idx} className="bg-gray-50 rounded-lg border p-6 mb-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div>
              <Label htmlFor={`name-${idx}`}>활동명 <span className="text-red-500">*</span></Label>
              <Input id={`name-${idx}`} placeholder="활동명을 입력하세요" value={item.name} onChange={e => handleChange(idx, 'name', e.target.value)} />
            </div>
            <div>
              <Label htmlFor={`organization-${idx}`}>기관/단체명</Label>
              <Input id={`organization-${idx}`} placeholder="기관/단체명을 입력하세요" value={item.organization} onChange={e => handleChange(idx, 'organization', e.target.value)} />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor={`startDate-${idx}`}>시작일</Label>
                <Input id={`startDate-${idx}`} placeholder="연도-월-일" value={item.startDate} onChange={e => handleChange(idx, 'startDate', e.target.value)} type="date" />
              </div>
              <div className="flex-1">
                <Label htmlFor={`endDate-${idx}`}>종료일</Label>
                <Input id={`endDate-${idx}`} placeholder="연도-월-일" value={item.endDate} onChange={e => handleChange(idx, 'endDate', e.target.value)} type="date" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor={`description-${idx}`}>설명</Label>
            <Textarea id={`description-${idx}`} placeholder="활동/경험 관련 설명을 입력하세요" value={item.description} onChange={e => handleChange(idx, 'description', e.target.value)} rows={3} />
          </div>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="destructive" onClick={() => handleRemove(idx)}>
              삭제
            </Button>
          </div>
        </div>
      ))}
      <Button size="sm" onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-1" /> 활동 추가
      </Button>
    </div>
  )
}

// PortfolioSection 파일 업로드 방식
function PortfolioSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  const [fileList, setFileList] = useState(content || [])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    }))
    const updated = [...fileList, ...newFiles]
    setFileList(updated)
    onContentUpdate(updated)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }
  const handleRemove = (idx: number) => {
    const updated = fileList.filter((_: any, i: number) => i !== idx)
    setFileList(updated)
    onContentUpdate(updated)
  }
  return (
    <div>
      <Label className="block mb-2">포트폴리오 파일 추가</Label>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*,application/zip,application/x-zip-compressed"
      />
      <Button
        type="button"
        className="mb-4 bg-blue-600 hover:bg-blue-700"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-4 h-4 mr-1" /> 파일 선택
      </Button>
      <div className="space-y-4">
        {fileList.length === 0 && (
          <div className="text-gray-500">등록된 포트폴리오 파일이 없습니다.</div>
        )}
        {fileList.map((file: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between bg-gray-50 rounded border p-4">
            <div>
              <div className="font-medium text-gray-900">{file.name}</div>
              <div className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB • {file.type}</div>
              {file.url && file.type.startsWith("image/") && (
                <img src={file.url} alt={file.name} className="mt-2 max-h-32 rounded border" />
              )}
            </div>
            <Button size="sm" variant="destructive" onClick={() => handleRemove(idx)}>
              삭제
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

// CustomSection (빈 컴포넌트)
function CustomSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) { return null }

// CoverLetterSection: API 연동 버전
function CoverLetterSection({ content, onContentUpdate }: { content: any; onContentUpdate: (content: any) => void }) {
  const [coverLetters, setCoverLetters] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch("/api/personal/coverletter/list")
      .then(res => {
        if (!res.ok) throw new Error("자기소개서 목록을 불러오지 못했습니다.")
        return res.json()
      })
      .then(data => {
        setCoverLetters(data.data || [])
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])
  const selected = content?.selectedCoverLetterId
    ? coverLetters.find((cl: any) => String(cl.id) === String(content.selectedCoverLetterId))
    : null
  return (
    <div>
      <Label htmlFor="coverLetter">자기소개서 선택</Label>
      {loading ? (
        <div className="text-gray-500 mt-2">불러오는 중...</div>
      ) : error ? (
        <div className="text-red-500 mt-2">{error}</div>
      ) : (
        <Select
          value={content?.selectedCoverLetterId || ""}
          onValueChange={(value) => {
            const selected = coverLetters.find((cl: any) => String(cl.id) === String(value))
            if (selected) {
              onContentUpdate({
                selectedCoverLetterId: selected.id,
                selectedCoverLetterTitle: selected.title,
              })
            }
          }}
        >
          <SelectTrigger id="coverLetter" className="mt-1">
            <SelectValue placeholder="자기소개서를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {coverLetters.length === 0 ? (
              <div className="text-gray-500 px-4 py-2">등록된 자기소개서가 없습니다.</div>
            ) : coverLetters.map((cl: any) => (
              <SelectItem key={cl.id} value={String(cl.id)}>
                {cl.title} {cl.updatedAt ? `(${cl.updatedAt})` : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {selected && (
        <div className="bg-gray-50 p-4 rounded-md mt-4">
          <h4 className="font-medium mb-2">선택된 자기소개서</h4>
          <p className="text-gray-700">{selected.title}</p>
          {selected.updatedAt && <p className="text-sm text-gray-500 mt-1">최종 수정일: {selected.updatedAt}</p>}
        </div>
      )}
    </div>
  )
}
