"use client";

import { useState } from "react";
import { UserProfile } from "./UserProfile";
import { PostFeed } from "./PostFeed";
import { NewsSidebar } from "./NewsSidebar";
import { HashtagFilterModal } from "./HashtagFilterModal";
import { CreatePostModal } from "./CreatePostModal";
import { PopularPosts } from "./PopularPosts";
import { useUserStore } from "@/store/useUserStore";

export const CommunityContent = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] =
    useState<boolean>(false);

  const { userInfo } = useUserStore();

  // 상단 태그 목록: 대표 태그만 #포함해서 노출
  const TAG_NAMES = [
    "면접",
    "이직",
    "연봉",
    "취업",
    "자기소개서",
    "커리어",
    "자격증",
  ];
  const hashtagList = TAG_NAMES.map((name) => `#${name}`);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([
    ...hashtagList,
  ]);

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleOpenCreatePostModal = () => {
    setIsCreatePostModalOpen(true);
  };

  const handleCloseCreatePostModal = () => {
    setIsCreatePostModalOpen(false);
  };

  const handleUpdateHashtags = (hashtags: string[]) => {
    setSelectedHashtags(hashtags);
    setIsFilterModalOpen(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 왼쪽 - UserProfile (고정) */}
        {userInfo && (
          <div className="w-full md:w-64">
            <div className="md:sticky md:top-24">
              <UserProfile />
            </div>
          </div>
        )}

        {/* 가운데 - PostFeed (스크롤됨) */}
        <div className="flex-1 min-h-screen">
          <PostFeed
            selectedHashtags={selectedHashtags}
            onOpenFilterModal={handleOpenFilterModal}
            onOpenCreatePostModal={handleOpenCreatePostModal}
          />
        </div>

        {/* 오른쪽 - NewsSidebar + PopularPosts (고정) */}
        <div className="w-full md:w-64 flex flex-col gap-6">
          <div className="md:sticky md:top-24 flex flex-col gap-6">
            <NewsSidebar selectedTags={selectedHashtags} />
            <PopularPosts />
          </div>
        </div>
      </div>

      {/* 필터 모달 */}
      {isFilterModalOpen && (
        <HashtagFilterModal
          onClose={handleCloseFilterModal}
          selectedHashtags={selectedHashtags}
          onUpdateHashtags={handleUpdateHashtags}
        />
      )}

      {/* 글 작성 모달 */}
      {isCreatePostModalOpen && (
        <CreatePostModal
          onClose={handleCloseCreatePostModal}
          profileImageUrl="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/profile.png"
          userName="User1"
        />
      )}
    </div>
  );
};
