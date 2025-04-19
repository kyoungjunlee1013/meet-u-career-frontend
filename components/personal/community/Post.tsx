"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Heart, MessageSquare, Share2, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { CreatePostModal } from "./CreatePostModal"

interface Author {
  name: string
  avatar: string
}

interface Comment {
  id: number
  author: Author
  content: string
  timestamp: string
}

interface Liker {
  id: number
  name: string
  avatar: string
}

interface PostProps {
  post: {
    id: number
    author: Author
    content: string
    image: string | null
    imageKey: string | null
    likes: number
    comments: number
    tags: string[]
    likers: Liker[]
    commentsList: Comment[]
  }
}

export const Post = ({ post }: PostProps) => {
  const [showLikes, setShowLikes] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const likesRef = useRef<HTMLDivElement>(null)
  const commentsRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (likesRef.current && !likesRef.current.contains(event.target as Node)) {
        setShowLikes(false)
      }
      if (commentsRef.current && !commentsRef.current.contains(event.target as Node)) {
        setShowComments(false)
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleLikes = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowLikes(!showLikes)
    if (showComments) setShowComments(false)
  }

  const toggleComments = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowComments(!showComments)
    if (showLikes) setShowLikes(false)
  }

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  const handleEdit = () => {
    setIsEditModalOpen(true)
    setShowMenu(false)
  }

  const handleDelete = async () => {
    setShowMenu(false)
    if (confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await axios.post(`http://localhost:8080/api/personal/community/posts/delete/${post.id}`, {
          accountId: 1, // 임시
        });

        alert("게시글이 삭제되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error("게시글 삭제 실패", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  }

  return (
    <div className="bg-white rounded-md overflow-hidden mb-4 relative">
      <div className="p-4">
        {/* 작성자 프로필 + 이름 + ⋯ 메뉴버튼 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={post.author.avatar || "/default_profile.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <h3 className="font-medium">{post.author.name}</h3>
            </div>
          </div>

          {/* ⋯ 메뉴 버튼 */}
          <div className="relative">
            <button onClick={toggleMenu}>
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </button>

            {/* 수정/삭제 메뉴 */}
            {showMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-md z-10 flex flex-col text-sm"
              >
                <button
                  onClick={handleEdit}
                  className="px-3 py-2 hover:bg-gray-100 text-left"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-2 hover:bg-gray-100 text-left text-red-500"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 글 내용 */}
        <p className="text-sm mb-4">{post.content}</p>

        {/* 해시태그 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-500">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 게시글 이미지 */}
      {post.image && (
        <div className="bg-gray-100 aspect-video relative">
          <Image src={post.image} alt="Post image" fill className="object-cover" />
        </div>
      )}

      {/* 좋아요/댓글/공유 버튼 */}
      <div className="p-4 flex items-center">
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700" onClick={toggleLikes}>
          <Heart className="h-5 w-5" />
          <span className="text-sm">{post.likes}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 ml-4" onClick={toggleComments}>
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm">{post.comments}</span>
        </button>
        <button className="ml-auto text-gray-500 hover:text-gray-700">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* 수정 모달 띄우기 */}
      {isEditModalOpen && (
        <CreatePostModal
          onClose={() => setIsEditModalOpen(false)}
          profileImageUrl={post.author.avatar}
          userName={post.author.name}
          initialContent={post.content}
          initialTag={post.tags?.[0]?.replace("#", "") ?? null}
          initialImageUrl={post.image ?? undefined}
          initialImageKey={post.imageKey ?? undefined}
          isEditMode={true}
          postId={post.id}
        />
      )}
    </div>
  )
}
