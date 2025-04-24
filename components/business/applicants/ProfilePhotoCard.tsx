"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ProfilePhotoCardProps } from "@/types/applicants";
import Image from "next/image";

export const ProfilePhotoCard = ({
  profileImageUrl,
}: ProfilePhotoCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>프로필 사진</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {profileImageUrl ? (
          <div className="relative w-32 h-32 rounded-full overflow-hidden border">
            <Image
              src={profileImageUrl}
              alt="프로필 사진"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
            이미지 없음
          </div>
        )}
      </CardContent>
    </Card>
  );
};
