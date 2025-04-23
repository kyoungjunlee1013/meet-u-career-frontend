"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronRight, Plus, FileText } from "lucide-react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobId: string;
    jobTitle: string;
    companyName: string;
}

export const ApplicationModal = ({
    isOpen,
    onClose,
    jobId,
    jobTitle,
    companyName,
}: ApplicationModalProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [resumes, setResumes] = useState<any[]>([]); // 이력서 목록
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedResume, setSelectedResume] = useState<any | null>(null); // 선택된 이력서
    const [files, setFiles] = useState<File[]>([]); // 첨부된 파일

    const modalRef = useRef<HTMLDivElement>(null);

    // 이력서 목록 호출
    const fetchResumes = async () => {
        if (loading) return; // 로딩 중이면 중복 호출 방지
        setLoading(true);
        try {
            const token = sessionStorage.getItem("accessToken");
            const headers = token && useUserStore.getState().isLocalhost ? { "Authorization": `Bearer ${token}` } : {};

            const response = await axios.get("/api/personal/resume/list", { headers });

            setResumes(response.data.data); // 가져온 이력서 리스트 저장
        } catch (err) {
            console.error("이력서 로딩 실패", err);
            setError("이력서를 가져오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 모달 열기 시 이력서 목록 호출
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            fetchResumes(); // 모달 열리면 이력서 목록 호출
            // Add event listener to detect clicks outside the modal
            const handleClickOutside = (event: MouseEvent) => {
                if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                    onClose();
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]); // 의존성 배열에서 onClose를 제거하여 무한 호출을 방지

    // 파일 선택 핸들러
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            setFiles(Array.from(selectedFiles)); // 선택된 파일 목록을 상태에 저장
        }
    };

    // 입사지원 버튼 클릭 시 호출되는 함수
    const handleApply = async () => {
        if (!selectedResume) {
            alert("이력서를 선택해주세요.");
            return;
        }

        try {
            await axios.post("/api/personal/resume/apply", { jobId, resumeId: selectedResume.id });
            alert("입사지원이 완료되었습니다.");
            onClose(); // 모달 닫기
        } catch (err) {
            console.error("입사지원 실패", err);
            alert("입사지원에 실패했습니다.");
        }
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <div
            className="fixed bottom-0 right-0 z-50 m-4"
            style={{
                pointerEvents: isOpen ? "auto" : "none",
            }}
        >
            <div
                ref={modalRef}
                className="relative w-full max-w-md rounded-lg bg-white shadow-lg transition-all duration-300 ease-in-out"
                style={{
                    transform: isOpen ? "translateY(0)" : "translateY(100%)",
                    opacity: isOpen ? 1 : 0,
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-4">
                    <div>
                        <p className="text-sm text-gray-700">{companyName}</p>
                        <h3 className="mt-1 text-xl font-medium text-blue-500">{jobTitle}</h3>
                    </div>
                    <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        <X className="h-5 w-4" />
                    </button>
                </div>

                <div className="mx-4 h-px bg-gray-200" />

                {/* Application Form */}
                <div className="p-4">
                    {/* 이력서 선택 */}
                    <div className="mb-4 overflow-hidden rounded-lg bg-gray-50">
                        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                            <span className="text-sm font-medium text-gray-700">선택된 이력서</span>
                            <button
                                className="flex items-center text-sm text-gray-600 hover:text-blue-500"
                                onClick={() => setSelectedResume(null)} // 이력서 변경 클릭 시 선택된 이력서 초기화
                            >
                                이력서 변경
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </button>
                        </div>
                        <div className="p-4">
                            {loading ? (
                                <p className="text-center text-sm text-gray-500">이력서를 로딩 중...</p>
                            ) : error ? (
                                <p className="text-center text-sm text-red-500">{error}</p>
                            ) : (
                                resumes.length === 0 ? (
                                    <div className="text-center text-sm text-gray-500">이력서가 없습니다.</div>
                                ) : (
                                    resumes.map((resume) => (
                                        <div
                                            key={resume.id}
                                            className={`mb-4 text-sm text-gray-800 cursor-pointer ${selectedResume?.id === resume.id ? "bg-blue-100" : ""}`}
                                            onClick={() => setSelectedResume(resume)} // 이력서 선택
                                        >
                                            <p className="font-medium">{resume.title}</p>
                                            <p className="text-xs">{resume.overview}</p>
                                        </div>
                                    ))
                                )
                            )}
                        </div>
                    </div>

                    {/* 첨부파일 */}
                    <div className="mb-4 overflow-hidden rounded-lg bg-gray-50">
                        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                            <span className="text-sm font-medium text-gray-700">첨부파일 {files.length}건</span>
                            {/* 파일 추가 버튼 */}
                            <label htmlFor="file-input" className="flex items-center text-sm text-gray-600 hover:text-blue-500 cursor-pointer">
                                파일추가
                                <Plus className="ml-1 h-4 w-4" />
                            </label>
                        </div>
                        <div className="flex h-32 items-center justify-center p-4">
                            {files.length === 0 ? (
                                <p className="text-sm text-gray-500">첨부된 파일이 없습니다.</p>
                            ) : (
                                <div className="space-y-2">
                                    {files.map((file, index) => (
                                        <p key={index} className="text-sm text-gray-800">
                                            {file.name}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 실제 파일 선택 input (숨겨놓고 버튼 클릭 시 활성화) */}
                        <input
                            type="file"
                            id="file-input"
                            className="hidden"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Apply Button */}
                <button
                    className="w-full bg-[#ff6b6b] py-4 text-center text-base font-medium text-white hover:bg-[#ff5252]"
                    onClick={handleApply} // 입사지원 클릭 시
                >
                    입사지원
                </button>
            </div>
        </div>
    );
};
