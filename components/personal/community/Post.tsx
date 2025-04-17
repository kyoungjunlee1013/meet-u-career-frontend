"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Heart, MessageSquare, Share2 } from "lucide-react"
import Image from "next/image"

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
  const likesRef = useRef<HTMLDivElement>(null)
  const commentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLikes && likesRef.current && !likesRef.current.contains(event.target as Node)) {
        setShowLikes(false)
      }
      if (showComments && commentsRef.current && !commentsRef.current.contains(event.target as Node)) {
        setShowComments(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showLikes, showComments])

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

  return (
    <div className="bg-white rounded-md overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#15274a] text-white flex items-center justify-center mr-3">
            <span className="text-sm">{post.author.avatar}</span>
          </div>
          <div>
            <h3 className="font-medium">{post.author.name}</h3>
          </div>
        </div>
        <p className="text-sm mb-4">{post.content}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {post.image && (
        <div className="bg-gray-100 aspect-video relative">
          <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
        </div>
      )}

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

      {showLikes && (
        <div ref={likesRef} className="border-t p-4 bg-gray-50">
          <h4 className="text-sm font-medium mb-3">좋아요 {post.likes}개</h4>
          <div className="space-y-3">
            {post.likers.map((liker) => (
              <div key={liker.id} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#15274a] text-white flex items-center justify-center mr-2">
                  <span className="text-xs">{liker.avatar}</span>
                </div>
                <span className="text-sm">{liker.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showComments && (
        <div ref={commentsRef} className="border-t p-4 bg-gray-50">
          <h4 className="text-sm font-medium mb-3">댓글 {post.comments}개</h4>
          <div className="space-y-4">
            {post.commentsList.map((comment) => (
              <div key={comment.id} className="flex">
                <div className="w-8 h-8 rounded-full bg-[#15274a] text-white flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-xs">{comment.author.avatar}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{comment.author.name}</span>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
            <div className="flex mt-3">
              <div className="w-8 h-8 rounded-full bg-[#15274a] text-white flex items-center justify-center mr-2 flex-shrink-0">
                <span className="text-xs">사</span>
              </div>
              <input
                type="text"
                placeholder="댓글을 입력하세요..."
                className="flex-1 border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
