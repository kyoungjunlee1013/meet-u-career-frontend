import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterSection } from "./FilterSection"
import { SalarySlider } from "./SalarySlider"
import { Checkbox } from "@/components/ui/checkbox"

export const TalentsFilter = () => {
  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 className="font-medium">필터</h3>
        <X className="h-4 w-4 text-gray-500 cursor-pointer" />
      </div>

      <div className="divide-y divide-gray-200">
        <FilterSection title="지역" defaultOpen>
          <div className="px-3 pb-3">
            <select className="w-full p-2 text-sm border border-gray-300 rounded-md">
              <option>지역 선택</option>
              <option>서울</option>
              <option>경기</option>
              <option>인천</option>
            </select>
          </div>
        </FilterSection>

        <FilterSection title="경력" defaultOpen>
          <div className="px-3 pb-3 space-y-2">
            <div className="flex items-center">
              <Checkbox id="exp-0" className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="exp-0" className="ml-2 text-sm">
                0-2년
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox id="exp-3" className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="exp-3" className="ml-2 text-sm">
                3-5년
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox id="exp-5" className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="exp-5" className="ml-2 text-sm">
                5년 이상
              </label>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="학력">
          <div className="px-3 pb-3">
            <select className="w-full p-2 text-sm border border-gray-300 rounded-md">
              <option>학력 선택</option>
              <option>고졸</option>
              <option>대졸</option>
              <option>석사</option>
              <option>박사</option>
            </select>
          </div>
        </FilterSection>

        <FilterSection title="고용 형태">
          <div className="px-3 pb-3 space-y-2">
            <div className="flex items-center">
              <Checkbox id="type-1" className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="type-1" className="ml-2 text-sm">
                정규직
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox id="type-2" className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="type-2" className="ml-2 text-sm">
                비정규직
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox id="type-3" className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="type-3" className="ml-2 text-sm">
                계약직
              </label>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="희망 연봉">
          <div className="px-3 pb-3">
            <SalarySlider />
          </div>
        </FilterSection>

        <FilterSection title="지원일자">
          <div className="px-3 pb-3">
            <select className="w-full p-2 text-sm border border-gray-300 rounded-md">
              <option>기간 선택</option>
              <option>최근 1주일</option>
              <option>최근 1개월</option>
              <option>최근 3개월</option>
            </select>
          </div>
        </FilterSection>
      </div>

      <div className="p-3 border-t border-gray-200 flex gap-2">
        <Button variant="outline" className="text-sm h-8 flex-1">
          필터 초기화
        </Button>
        <Button className="text-sm h-8 flex-1 bg-blue-500 hover:bg-blue-600">필터 적용</Button>
      </div>
    </div>
  )
}
