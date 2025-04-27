
"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"
import type { Comment } from "./CommentsManagement"

interface CommentDetailModalProps {
    comment: Comment
    onClose: () => void
}

export default function CommentDetailModal({ comment, onClose }: CommentDetailModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEscapeKey)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscapeKey)
        }
    }, [onClose])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-semibold">댓글 상세</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="닫기">
                        <X size={24} />
                    </button>
                </div>
                <div className="overflow-y-auto p-4 flex-grow">
                    <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium">게시글: {comment.postTitle}</h3>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${comment.status === "활성" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {comment.status}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mb-4">
                            <span>작성자: {comment.author}</span>
                            <span>작성일: {comment.createdAt}</span>
                        </div>
                        <div className="flex space-x-4 text-sm text-gray-500 mb-6">
                            <span>좋아요: {comment.likes}</span>
                            <span>답글수: {comment.replies}</span>
                        </div>
                        <div className="border-t pt-4">
                            <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
                        </div>
                    </div>
                </div>
                <div className="border-t p-4 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700">
                        닫기
                    </button>
                </div>
            </div>
        </div>
    )
}
