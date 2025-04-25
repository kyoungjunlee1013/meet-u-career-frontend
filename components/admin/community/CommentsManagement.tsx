"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import CommentsTable from "./CommentsTable"
import CommentDetailModal from "./CommentDetailModal"
import CommunityPagination from "./CommunityPagination"
import { apiClient } from "@/api/apiClient"

export interface Comment {
  id: number
  postTitle: string
  author: string
  content: string
  status: 0 | 1
  likes: number
  replies: number
  createdAt: string
}

export default function CommentsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [comments, setComments] = useState<Comment[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 전체 댓글 불러오기
  const fetchComments = async () => {
    try {
      const response = await apiClient.get(`/api/admin/community/comments/all`)
      const rawComments = response.data.data

      const mappedComments: Comment[] = rawComments.map((comment: any) => ({
        id: comment.id,
        postTitle: comment.postTitle ?? "게시글 없음",
        author: comment.accountName ?? "알 수 없음",
        content: comment.content,
        status: comment.status === 0 ? "활성" : "비활성",
        likes: comment.likeCount ?? 0,
        replies: comment.replyCount ?? 0,
        createdAt: formatDate(comment.createdAt),
      }))

      setComments(mappedComments)
    } catch (error) {
      console.error("댓글 불러오기 실패:", error)
    }
  }

  // 날짜 포맷 변환
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleViewComment = (comment: Comment) => {
    setSelectedComment(comment)
    setIsDetailModalOpen(true)
  }

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) return

    try {
      await apiClient.post(`/api/admin/community/comments/delete`, { commentId })
      await fetchComments()
      alert("댓글이 삭제되었습니다.")
    } catch (error) {
      console.error("댓글 삭제 실패:", error)
      alert("댓글 삭제 중 오류가 발생했습니다.")
    }
  }

  // 검색어 필터링
  const filteredComments = comments.filter(
    (comment) =>
      comment.content.includes(searchQuery) ||
      comment.author.includes(searchQuery) ||
      comment.postTitle.includes(searchQuery),
  )

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredComments.length / itemsPerPage)
  const currentItems = filteredComments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="댓글 검색"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
      </div>

      <CommentsTable comments={currentItems} onViewComment={handleViewComment} onDeleteComment={handleDeleteComment} />

      {totalPages > 1 && (
        <CommunityPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {isDetailModalOpen && selectedComment && (
        <CommentDetailModal comment={selectedComment} onClose={() => setIsDetailModalOpen(false)} />
      )}
    </div>
  )
}
