"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ResumeSection } from "./ResumeEditor";

interface ResumeSectionAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (section: ResumeSection) => void;
}

export function ResumeSectionAddModal({
  isOpen,
  onClose,
  onAdd,
}: ResumeSectionAddModalProps) {
  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState("project");
  const [fields, setFields] = useState<string[]>([
    "name",
    "organization",
    "startDate",
    "endDate",
    "description",
  ]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newSection: ResumeSection = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      sectionType: 6, // Custom section
      isActive: true,
      content: {
        template,
        fields,
        text: "",
      },
    };

    onAdd(newSection);
  };

  const handleTemplateChange = (value: string) => {
    setTemplate(value);

    // Set default fields based on template
    switch (value) {
      case "project":
        setFields([
          "name",
          "role",
          "startDate",
          "endDate",
          "description",
          "technologies",
        ]);
        break;
      case "research":
        setFields([
          "title",
          "institution",
          "date",
          "description",
          "publication",
        ]);
        break;
      case "publication":
        setFields(["title", "publisher", "date", "description", "link"]);
        break;
      case "custom":
        setFields(["description"]);
        break;
      default:
        setFields([
          "name",
          "organization",
          "startDate",
          "endDate",
          "description",
        ]);
    }
  };

  const handleFieldToggle = (field: string) => {
    setFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">새 항목 추가</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="section-title">
                항목 제목 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="section-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="항목 제목을 입력하세요"
                className="mt-1"
                autoFocus
              />
            </div>

            <div>
              <Label htmlFor="section-template">템플릿 선택</Label>
              <Select value={template} onValueChange={handleTemplateChange}>
                <SelectTrigger id="section-template" className="mt-1">
                  <SelectValue placeholder="템플릿을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project">프로젝트</SelectItem>
                  <SelectItem value="research">연구</SelectItem>
                  <SelectItem value="publication">출판/논문</SelectItem>
                  <SelectItem value="custom">사용자 정의</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>포함 필드</Label>
              <div className="mt-2 space-y-2">
                {getAvailableFields(template).map((field) => (
                  <div
                    key={field.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`field-${field.value}`}
                      checked={fields.includes(field.value)}
                      onCheckedChange={() => handleFieldToggle(field.value)}
                    />
                    <Label
                      htmlFor={`field-${field.value}`}
                      className="cursor-pointer"
                    >
                      {field.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t p-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={!title.trim()}
            >
              추가
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function getAvailableFields(template: string) {
  const commonFields = [
    { value: "name", label: "이름/제목" },
    { value: "description", label: "설명" },
  ];

  switch (template) {
    case "project":
      return [
        ...commonFields,
        { value: "role", label: "역할" },
        { value: "startDate", label: "시작일" },
        { value: "endDate", label: "종료일" },
        { value: "technologies", label: "사용 기술" },
        { value: "link", label: "프로젝트 링크" },
      ];
    case "research":
      return [
        ...commonFields,
        { value: "institution", label: "기관" },
        { value: "date", label: "날짜" },
        { value: "publication", label: "출판 정보" },
        { value: "link", label: "연구 링크" },
      ];
    case "publication":
      return [
        ...commonFields,
        { value: "publisher", label: "출판사/저널" },
        { value: "date", label: "출판일" },
        { value: "authors", label: "저자" },
        { value: "link", label: "출판물 링크" },
      ];
    case "custom":
      return [
        { value: "description", label: "설명" },
        { value: "customField1", label: "사용자 정의 필드 1" },
        { value: "customField2", label: "사용자 정의 필드 2" },
        { value: "customField3", label: "사용자 정의 필드 3" },
      ];
    default:
      return commonFields;
  }
}
