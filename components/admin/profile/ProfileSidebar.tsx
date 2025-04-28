import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

export default function ProfileSidebar() {
  const { userInfo } = useUserStore();

  return (
    <Card>
      <CardContent className="pt-6 flex flex-col items-center">
        <div className="relative mb-4 group">
          <Avatar className="h-32 w-32">
            <AvatarImage
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=128&width=128"
              alt="Profile"
            />
            <AvatarFallback className="text-3xl">김관</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Button variant="ghost" size="icon" className="text-white">
              <Camera className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <h3 className="text-xl font-semibold">{userInfo?.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{userInfo?.role}</p>
      </CardContent>
    </Card>
  );
}
