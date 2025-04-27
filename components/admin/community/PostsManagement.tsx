"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import PostsTable from "./PostsTable"
import PostDetailModal from "./PostDetailModal"
import CommunityPagination from "./CommunityPagination"
import { apiClient } from "@/api/apiClient"

export interface Post {
  id: number
  title: string
  author: string
  content: string
  status: "활성" | "비활성"
  views: number
  likes: number
  comments: number
  createdAt: string
}

export default function PostsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 전체 게시글 불러오기
  const fetchPosts = async () => {
    try {
      const response = await apiClient.get(`/api/admin/community/posts/all`)
      const rawPosts = response.data.data

      const mappedPosts: Post[] = rawPosts.map((post: any) => ({
        id: post.id,
        title: post.title ?? "제목 없음",
        author: post.accountName ?? "작성자 없음",
        content: post.content,
        status: post.status === 0 ? "활성" : "비활성",
        views: post.views ?? 0,
        likes: post.likes ?? 0,
        comments: post.comments ?? 0,
        createdAt: formatDate(post.createdAt),
      }))

      setPosts(mappedPosts)
    } catch (error) {
      console.error("게시글 불러오기 실패:", error)
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
    fetchPosts()
  }, [])

  const handleViewPost = (post: Post) => {
    setSelectedPost(post)
    setIsDetailModalOpen(true)
  }

  const handleDeletePost = async (postId: number) => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return

    try {
      await apiClient.post(`/api/admin/community/posts/delete`, { postId })
      await fetchPosts()
      alert("게시글이 삭제되었습니다.")
    } catch (error) {
      console.error("게시글 삭제 실패:", error)
      alert("게시글 삭제 중 오류가 발생했습니다.")
    }
  }

  // 검색어 필터링
  const filteredPosts = posts.filter(
    (post) =>
      post.title.includes(searchQuery) ||
      post.author.includes(searchQuery) ||
      post.content.includes(searchQuery),
  )

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const currentItems = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
            placeholder="게시글 검색"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
      </div>

      <PostsTable posts={currentItems} onViewPost={handleViewPost} onDeletePost={handleDeletePost} />

      {totalPages > 1 && (
        <CommunityPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {isDetailModalOpen && selectedPost && (
        <PostDetailModal post={selectedPost} onClose={() => setIsDetailModalOpen(false)} />
      )}
    </div>
  )
}
