"use client"

import { Eye, Trash2 } from "lucide-react"
import type { Comment } from "./CommentsManagement"

interface CommentsTableProps {
    comments: Comment[]
    onViewComment: (comment: Comment) => void
    onDeleteComment: (commentId: number) => void
}

export default function CommentsTable({ comments, onViewComment, onDeleteComment }: CommentsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-4 py-3">
                            게시글
                        </th>
                        <th scope="col" className="px-4 py-3">
                            작성자
                        </th>
                        <th scope="col" className="px-4 py-3">
                            댓글 내용
                        </th>
                        <th scope="col" className="px-4 py-3">
                            상태
                        </th>
                        <th scope="col" className="px-4 py-3">
                            좋아요
                        </th>
                        <th scope="col" className="px-4 py-3">
                            답글수
                        </th>
                        <th scope="col" className="px-4 py-3">
                            작성일
                        </th>
                        <th scope="col" className="px-4 py-3">
                            작업
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {comments.length === 0 ? (
                        <tr className="bg-white border-b">
                            <td colSpan={9} className="px-4 py-4 text-center">
                                댓글이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        comments.map((comment) => (
                            <tr key={comment.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-4">{comment.id}</td>
                                <td className="px-4 py-4">
                                    <div className="max-w-xs truncate">{comment.postTitle}</div>
                                </td>
                                <td className="px-4 py-4">{comment.author}</td>
                                <td className="px-4 py-4">
                                    <div className="max-w-xs truncate">{comment.content}</div>
                                </td>
                                <td className="px-4 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${comment.status === "활성" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {comment.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4">{comment.likes}</td>
                                <td className="px-4 py-4">{comment.replies}</td>
                                <td className="px-4 py-4">{comment.createdAt}</td>
                                <td className="px-4 py-4">
                                    <div className="flex space-x-2">
                                        <button
                                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-gray-700"
                                            onClick={() => onViewComment(comment)}
                                            aria-label={`댓글 보기`}
                                        >
                                            <Eye size={16} className="mr-1" />
                                            보기
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-red-100 hover:bg-red-200 rounded-md flex items-center text-red-700"
                                            onClick={() => onDeleteComment(comment.id)}
                                            aria-label={`댓글 삭제`}
                                        >
                                            <Trash2 size={16} className="mr-1" />
                                            삭제
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
