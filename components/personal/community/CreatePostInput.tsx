"use client"

interface CreatePostInputProps {
  onOpenCreatePostModal: () => void
}

export const CreatePostInput = ({ onOpenCreatePostModal }: CreatePostInputProps) => {
  return (
    <div className="bg-white rounded-md p-4 mb-4">
      <div
        className="border rounded-md p-3 text-gray-500 text-sm cursor-pointer hover:bg-gray-50"
        onClick={onOpenCreatePostModal}
      >
        나누고 싶은 생각을 공유해보세요!
      </div>
    </div>
  )
}
