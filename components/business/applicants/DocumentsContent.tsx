import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"

export const DocumentsContent = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>첨부 서류</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
            <div>
              <p className="font-medium">이력서.pdf</p>
              <p className="text-sm text-gray-500">2.3MB</p>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
            <div>
              <p className="font-medium">포트폴리오.pdf</p>
              <p className="text-sm text-gray-500">5.7MB</p>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
