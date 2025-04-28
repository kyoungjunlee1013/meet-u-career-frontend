"use client";

import type React from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "./ResumeEditor";

interface ResumeBasicInfoCardProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function ResumeBasicInfoCard({
  resumeData,
  setResumeData,
}: ResumeBasicInfoCardProps) {
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  // 프로필 이미지 업로드: Presigned URL 제거, 파일만 상태에 저장
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeData((prev) => ({ ...prev, profileImage: file }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <Image
            src={
              resumeData.profileImage &&
              typeof resumeData.profileImage !== "string"
                ? URL.createObjectURL(resumeData.profileImage)
                : (resumeData.profileImage as string) ||
                  "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/profile.png"
            }
            alt="프로필 이미지"
            width={96}
            height={96}
            className="rounded-full object-cover border"
          />
          <input
            ref={profileImageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageChange}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute bottom-0 right-0 w-8 h-8"
            onClick={() => profileImageInputRef.current?.click()}
          >
            <Upload className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 space-y-2">
          <div>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={resumeData.name}
              onChange={(e) =>
                setResumeData({ ...resumeData, name: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              value={resumeData.email}
              onChange={(e) =>
                setResumeData({ ...resumeData, email: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">연락처</Label>
            <Input
              id="phone"
              value={resumeData.phone}
              onChange={(e) =>
                setResumeData({ ...resumeData, phone: e.target.value })
              }
              className="mt-1"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="overview">한 줄 소개</Label>
          <Input
            id="overview"
            value={resumeData.overview}
            onChange={(e) =>
              setResumeData({ ...resumeData, overview: e.target.value })
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="skills">기술 스택 (쉼표로 구분)</Label>
          <Input
            id="skills"
            value={resumeData.skills?.join(",") || ""}
            onChange={(e) =>
              setResumeData({
                ...resumeData,
                skills: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="extraLink1">GitHub</Label>
          <Input
            id="extraLink1"
            value={resumeData.extraLink1 || ""}
            onChange={(e) =>
              setResumeData({ ...resumeData, extraLink1: e.target.value })
            }
            placeholder="GitHub URL"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="extraLink2">포트폴리오/블로그</Label>
          <Input
            id="extraLink2"
            value={resumeData.extraLink2 || ""}
            onChange={(e) =>
              setResumeData({ ...resumeData, extraLink2: e.target.value })
            }
            placeholder="포트폴리오 또는 블로그 URL"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
