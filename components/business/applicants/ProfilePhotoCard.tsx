import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const ProfilePhotoCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>프로필 사진</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {/* You can replace this with an actual Image or Avatar component */}
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">프로필</span>
        </div>
      </CardContent>
    </Card>
  )
}
