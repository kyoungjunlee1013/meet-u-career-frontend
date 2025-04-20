"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { X, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { JobAutoComplete } from "./JobAutoComplete";
import type { ResumeData } from "./ResumeEditor";

interface ResumeBasicInfoCardProps {
  resumeData: ResumeData
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>
}

export function ResumeBasicInfoCard({ resumeData, setResumeData }: ResumeBasicInfoCardProps) {
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const [locationOptions, setLocationOptions] = useState<{ value: number, label: string }[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  useEffect(() => {
    setLoadingLocations(true);
    fetch("/api/locations/provinces")
      .then(res => res.json())
      .then(data => {
        // value를 number로 변환
        setLocationOptions((data.data || []).map((item: any) => ({ value: item.id, label: item.label })));
      })
      .finally(() => setLoadingLocations(false));
  }, []);
  const jobOptions = [
    { id: 1, name: "백엔드 개발자" },
    { id: 2, name: "프론트엔드 개발자" },
    { id: 3, name: "데이터 엔지니어" },
  ];


  // 프로필 이미지 업로드
  // Store the File object directly so FormData can upload it to the backend
const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setResumeData({ ...resumeData, profileImage: file });
  }
};

// 프로필 이미지 File 객체 미리보기 URL 관리
const [previewProfileImageUrl, setPreviewProfileImageUrl] = useState<string | null>(null);
useEffect(() => {
  if (resumeData.profileImage instanceof File) {
    const url = URL.createObjectURL(resumeData.profileImage);
    setPreviewProfileImageUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  } else {
    setPreviewProfileImageUrl(null);
  }
}, [resumeData.profileImage]);

  // ...기존 skill/link 추가/삭제 함수 유지...

  const [skillInput, setSkillInput] = useState("")
  // 보유 기술 추가/삭제
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
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <div className="grid grid-cols-1 md:[grid-template-columns:minmax(140px,180px)_1fr] gap-8 md:items-start">
        {/* 프로필 사진 */}
        <div className="flex flex-col items-center gap-3">
          {/* 프로필 사진 */}
          <div className="w-full min-w-[120px] max-w-[180px] aspect-[3/4] rounded-md border overflow-hidden bg-gray-100 flex items-center justify-center relative">
            {/* 프로필 이미지 미리보기 (string or File) */}
            {resumeData.profileImage ? (
              <>
                <img
                  src={
                    typeof resumeData.profileImage === "string"
                      ? resumeData.profileImage
                      : previewProfileImageUrl || undefined
                  }
                  alt="프로필 사진"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  aria-label="사진 삭제"
                  tabIndex={0}
                  className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1 shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
                  onClick={() => {
                    setResumeData({ ...resumeData, profileImage: undefined });
                    if (profileImageInputRef.current) profileImageInputRef.current.value = "";
                  }}
                >
                  <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
                </button>
              </>
            ) : (
              <span className="text-gray-400 flex flex-col items-center text-sm">
                <svg xmlns='http://www.w3.org/2000/svg' className='mx-auto mb-2' width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4a4 4 0 110 8 4 4 0 010-8zm0 12a8 8 0 018 8H4a8 8 0 018-8z' /></svg>
                3x4 사진
              </span>
            )}
          </div>
          {/* 사진 업로드 */}
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageChange}
            ref={profileImageInputRef}
          />
          <label
            htmlFor="profileImageInput"
            className="w-full min-w-[120px] max-w-[180px] flex items-center justify-center gap-2 px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50 cursor-pointer transition"
          >
            <Upload className="w-4 h-4" /> 사진 업로드
          </label>

        </div>
        {/* 입력란 전체 (오른쪽) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:mt-0 mt-8">
            <div className="col-span-2">
              <Label htmlFor="resumeTitle">이력서 제목 <span className="text-red-500">*</span></Label>
              <Input id="resumeTitle" value={resumeData.title} onChange={e => setResumeData({ ...resumeData, title: e.target.value })} placeholder="새 이력서" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="name">이름</Label>
              <Input id="name" value={resumeData.name} disabled placeholder="홍길동" className="mt-1 bg-gray-50 text-gray-900 placeholder-gray-400 cursor-not-allowed" />
            </div>
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input id="email" value={resumeData.email} disabled placeholder="hong@example.com" className="mt-1 bg-gray-50 text-gray-900 placeholder-gray-400 cursor-not-allowed" />
            </div>
            <div>
              <Label htmlFor="phone">연락처</Label>
              <Input id="phone" value={resumeData.phone} disabled placeholder="010-1234-5678" className="mt-1 bg-gray-50 text-gray-900 placeholder-gray-400 cursor-not-allowed" />
            </div>
            <div className="mt-1 w-full">
              <Label htmlFor="locationId">거주 지역</Label>
              <select
                id="locationId"
                className="mt-1 w-full border rounded px-2 py-2"
                value={resumeData.locationId ?? ''}
                onChange={e => {
                  const value = e.target.value === '' ? undefined : Number(e.target.value);
                  setResumeData({ ...resumeData, locationId: value });
                }}
                disabled={loadingLocations}
              >
                <option value="" disabled hidden>선택하세요</option>
                {locationOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="desiredPosition">희망 직무 <span className="text-red-500">*</span></Label>
              {/* 자동완성 컴포넌트 적용 */}
              <JobAutoComplete
                value={typeof resumeData.desiredJobCategoryId === 'number' && resumeData.desiredPosition ? { label: resumeData.desiredPosition, value: resumeData.desiredJobCategoryId } : null}
                onChange={opt => {
                  if (opt && typeof opt.value === 'number') {
                    setResumeData({ ...resumeData, desiredPosition: opt.label, desiredJobCategoryId: opt.value });
                  } else {
                    setResumeData({ ...resumeData, desiredPosition: '', desiredJobCategoryId: undefined });
                  }
                }}
              />
            </div>
            {/* 이력서 공개 설정 */}
            <div>
              <Label>이력서 공개 설정</Label>
              <Button
                type="button"
                variant={resumeData.status === 2 ? "outline" : "ghost"}
                className={`flex items-center gap-2 border-green-500 w-full justify-center ${resumeData.status === 2 ? 'bg-green-50 text-green-700 border' : 'text-gray-400 border'} px-4 py-2 rounded-full shadow-none`}
                onClick={() => setResumeData({ ...resumeData, status: resumeData.status === 2 ? 1 : 2 })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                {resumeData.status === 2 ? '공개' : '비공개'}
              </Button>
            </div>
          </div>
        
        <div className="mt-8 md:col-span-2">
          <Label htmlFor="overview">간단 소개</Label>
          <textarea
            id="overview"
            value={resumeData.overview}
            onChange={e => setResumeData({ ...resumeData, overview: e.target.value })}
            placeholder="간단한 자기소개를 작성하세요 (2-3줄 권장)"
            className="mt-1 w-full min-h-[60px] border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        {/* 보유 기술 */}
        <div className="mt-8 md:col-span-2">
          <Label>보유 기술</Label>
          <div className="flex gap-2 mt-1">
            <Input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleAddSkill(); }} placeholder="기술을 입력하고 Enter 또는 추가 버튼을 누르세요" />
            <Button
              type="button"
              onClick={handleAddSkill}
              className="rounded-full bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center p-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {resumeData.skills?.map(skill => (
              <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 rounded flex items-center gap-1 text-sm border border-blue-100">
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(skill)}><X className="w-3 h-3 text-blue-400" /></button>
              </span>
            ))}
          </div>
        </div>
        {/* 외부 링크 */}
        <div className="mt-8 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="extraLink1" className="flex items-center gap-2">
              {/* GitHub 아이콘 (Lucide) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.11-1.48-1.11-1.48-.91-.64.07-.63.07-.63 1.01.07 1.54 1.05 1.54 1.05.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.41 9.41 0 0112 6.84c.85.004 1.71.11 2.51.32 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" /></svg>
              GitHub
            </Label>
            <Input id="extraLink1" value={resumeData.extraLink1 || ""} onChange={e => setResumeData({ ...resumeData, extraLink1: e.target.value })} placeholder="GitHub URL" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="extraLink2" className="flex items-center gap-2">
              {/* Globe(웹/블로그) 아이콘 (Lucide) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>
              포트폴리오/블로그
            </Label>
            <Input id="extraLink2" value={resumeData.extraLink2 || ""} onChange={e => setResumeData({ ...resumeData, extraLink2: e.target.value })} placeholder="포트폴리오 또는 블로그 URL" className="mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
