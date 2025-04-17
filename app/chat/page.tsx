import { Suspense } from "react"
import { ChatLayout } from "@/components/chat/ChatLayout"
import { ChatSkeleton } from "@/components/chat/ChatSkeleton"

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatLayout />
    </Suspense>
  )
}
