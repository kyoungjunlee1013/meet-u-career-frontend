"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import type { ResumeData } from "./ResumeEditor"

interface ResumeBasicInfoCardProps {
  resumeData: ResumeData
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>
}

export function ResumeBasicInfoCard({ resumeData, setResumeData }: ResumeBasicInfoCardProps) {
  const [skillInput, setSkillInput] = useState("")
  const [linkInput, setLinkInput] = useState("")

  const handleAddSkill = () => {
    if (skillInput.trim() && !resumeData.skills?.includes(skillInput.trim())) {
      setResumeData({
        ...resumeData,
        skills: [...(resumeData.skills || []), skillInput.trim()],
      })
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills?.filter((s) => s !== skill),
    })
  }

  const handleAddLink = () => {
    if (linkInput.trim() && !resumeData.externalLinks?.includes(linkInput.trim())) {
      setResumeData({
        ...resumeData,
        externalLinks: [...(resumeData.externalLinks || []), linkInput.trim()],
      })
      setLinkInput("")
    }
  }

  const handleRemoveLink = (link: string) => {
    setResumeData({
      ...resumeData,
      externalLinks: resumeData.externalLinks?.filter((l) => l !== link),
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeData({
        ...resumeData,
        resumeFileKey: "file-key-" + Date.now(), // In a real app, this would be a server-generated key
        resumeFileName: file.name,
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile image */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-md overflow-hidden bg-gray-200 mb-2">
            <Image
              src={resumeData.profileImage || "/vibrant-street-market.png"}
              alt="Profile"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <label className="block w-full">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setResumeData({ ...resumeData, profileImage: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <Button type="button" variant="outline" className="w-full mt-2">프로필 사진 변경</Button>
          </label>
        </div>

        {/* Middle column - Basic info */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <Label htmlFor="resumeTitle">
              이력서 제목 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="resumeTitle"
              value={resumeData.title}
              onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
              placeholder="이력서 제목을 입력하세요"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                value="홍길동"
                readOnly
                className="mt-1 bg-gray-100 cursor-not-allowed"
                aria-disabled="true"
              />
            </div>
            <div>
              <Label htmlFor="contact">연락처</Label>
              <Input
                id="contact"
                value="010-1234-5678"
                readOnly
                className="mt-1 bg-gray-100 cursor-not-allowed"
                aria-disabled="true"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="resumeStatus"
                checked={resumeData.status === 2}
                onCheckedChange={(checked) => setResumeData({ ...resumeData, status: checked ? 2 : 1 })}
              />
              <Label htmlFor="resumeStatus">공개 설정</Label>
            </div>
            <span className="text-sm text-gray-500">{resumeData.status === 2 ? "공개" : "비공개"}</span>
          </div>

          {/* Conditional fields based on resumeType */}
          {resumeData.resumeType === 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">거주 지역</Label>
                  <Input
                    id="location"
                    value={resumeData.location || ""}
                    onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                    placeholder="예: 서울시 강남구"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="desiredPosition">희망 직무</Label>
                  <Input
                    id="desiredPosition"
                    value={resumeData.desiredPosition || ""}
                    onChange={(e) => setResumeData({ ...resumeData, desiredPosition: e.target.value })}
                    placeholder="예: 백엔드 개발자"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="desiredSalary">희망 연봉</Label>
                <Input
                  id="desiredSalary"
                  value={resumeData.desiredSalary || ""}
                  onChange={(e) => setResumeData({ ...resumeData, desiredSalary: e.target.value })}
                  placeholder="예: 5000만원"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="skills">보유 기술</Label>
                <div className="flex mt-1">
                  <Input
                    id="skills"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="기술을 입력하고 추가 버튼을 클릭하세요"
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddSkill()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddSkill} className="ml-2 bg-blue-600 hover:bg-blue-700">
                    추가
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {resumeData.skills?.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                        aria-label={`Remove ${skill}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="externalLinks">외부 링크</Label>
                <div className="flex mt-1">
                  <Input
                    id="externalLinks"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    placeholder="GitHub, 블로그 등의 URL을 입력하세요"
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddLink()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddLink} className="ml-2 bg-blue-600 hover:bg-blue-700">
                    추가
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {resumeData.externalLinks?.map((link) => (
                    <div
                      key={link}
                      className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                        {link}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(link)}
                        className="ml-1 text-gray-600 hover:text-gray-800"
                        aria-label={`Remove ${link}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {resumeData.resumeType === 1 && (
            <div>
              <Label htmlFor="resumeFile">이력서 파일 업로드</Label>
              <div className="mt-1">
                {resumeData.resumeFileName ? (
                  <div className="flex items-center p-3 border border-gray-300 rounded-md">
                    <span className="flex-1 truncate">{resumeData.resumeFileName}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setResumeData({ ...resumeData, resumeFileKey: undefined, resumeFileName: undefined })
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <label
                      htmlFor="resumeFile"
                      className="flex items-center justify-center w-full p-3 border border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <Upload className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-600">파일 선택 (PDF, DOCX, HWP)</span>
                      <input
                        id="resumeFile"
                        type="file"
                        accept=".pdf,.docx,.hwp"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {resumeData.resumeType === 2 && (
            <div>
              <Label htmlFor="resumeUrl">이력서 URL</Label>
              <Input
                id="resumeUrl"
                value={resumeData.resumeUrl || ""}
                onChange={(e) => setResumeData({ ...resumeData, resumeUrl: e.target.value })}
                placeholder="예: https://resume.com/myresume"
                className="mt-1"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
