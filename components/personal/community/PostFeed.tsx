"use client"

import { useState } from "react"
import { Post } from "./Post"
import { PostFilters } from "./PostFilters"
import { CreatePostInput } from "./CreatePostInput"

interface PostFeedProps {
  selectedHashtags: string[]
  onOpenFilterModal: () => void
  onOpenCreatePostModal: () => void
}

export const PostFeed = ({ selectedHashtags, onOpenFilterModal, onOpenCreatePostModal }: PostFeedProps) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "사람인",
        avatar: "사람",
      },
      content: "나누고 싶은 생각을 공유해보세요!",
      image: "/placeholder.svg?height=400&width=600",
      likes: 42,
      comments: 1,
      tags: ["개발", "직장생활"],
      likers: [
        { id: 1, name: "김개발", avatar: "김" },
        { id: 2, name: "이디자인", avatar: "이" },
        { id: 3, name: "박마케팅", avatar: "박" },
      ],
      commentsList: [
        { id: 1, author: { name: "김개발", avatar: "김" }, content: "좋은 글이네요!", timestamp: "2시간 전" },
      ],
    },
    {
      id: 2,
      author: {
        name: "개발왕",
        avatar: "개발",
      },
      content: "오늘 면접 봤었습니다!",
      image: null,
      likes: 15,
      comments: 3,
      tags: ["개발", "직장생활"],
      likers: [
        { id: 1, name: "김개발", avatar: "김" },
        { id: 2, name: "이디자인", avatar: "이" },
      ],
      commentsList: [
        { id: 1, author: { name: "김개발", avatar: "김" }, content: "어떻게 되셨나요?", timestamp: "1시간 전" },
        { id: 2, author: { name: "이디자인", avatar: "이" }, content: "화이팅입니다!", timestamp: "30분 전" },
      ],
    },
  ])

  return (
    <div className="space-y-4">
      <PostFilters selectedHashtags={selectedHashtags} onOpenFilterModal={onOpenFilterModal} />
      <CreatePostInput onOpenCreatePostModal={onOpenCreatePostModal} />

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
