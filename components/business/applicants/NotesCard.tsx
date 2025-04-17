import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const NotesCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>메모</CardTitle>
      </CardHeader>
      <CardContent>
        <textarea
          className="w-full min-h-[150px] p-2 border border-gray-200 rounded-md"
          placeholder="지원자에 대한 메모를 남겨주세요..."
        />
        <Button className="mt-2 w-full">저장</Button>
      </CardContent>
    </Card>
  )
}
