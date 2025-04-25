"use client"

import { Eye, Trash2 } from "lucide-react"
import type { Post } from "./PostsManagement"

interface PostsTableProps {
    posts: Post[]
    onViewPost: (post: Post) => void
    onDeletePost: (postId: number) => void
}

export default function PostsTable({ posts, onViewPost, onDeletePost }: PostsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-4 py-3">
                            제목
                        </th>
                        <th scope="col" className="px-4 py-3">
                            작성자
                        </th>
                        <th scope="col" className="px-4 py-3">
                            상태
                        </th>
                        <th scope="col" className="px-4 py-3">
                            조회수
                        </th>
                        <th scope="col" className="px-4 py-3">
                            좋아요
                        </th>
                        <th scope="col" className="px-4 py-3">
                            댓글수
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
                    {posts.length === 0 ? (
                        <tr className="bg-white border-b">
                            <td colSpan={9} className="px-4 py-4 text-center">
                                게시글이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        posts.map((post) => (
                            <tr key={post.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-4">{post.id}</td>
                                <td className="px-4 py-4">
                                    <div className="max-w-xs truncate">{post.title}</div>
                                </td>
                                <td className="px-4 py-4">{post.author}</td>
                                <td className="px-4 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === "활성" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {post.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4">{post.views.toLocaleString()}</td>
                                <td className="px-4 py-4">{post.likes.toLocaleString()}</td>
                                <td className="px-4 py-4">{post.comments.toLocaleString()}</td>
                                <td className="px-4 py-4">{post.createdAt}</td>
                                <td className="px-4 py-4">
                                    <div className="flex space-x-2">
                                        <button
                                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-gray-700"
                                            onClick={() => onViewPost(post)}
                                            aria-label={`${post.title} 게시글 보기`}
                                        >
                                            <Eye size={16} className="mr-1" />
                                            보기
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-red-100 hover:bg-red-200 rounded-md flex items-center text-red-700"
                                            onClick={() => onDeletePost(post.id)}
                                            aria-label={`${post.title} 게시글 삭제`}
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
