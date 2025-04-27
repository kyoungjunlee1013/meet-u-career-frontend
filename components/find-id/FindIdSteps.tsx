import { CheckCircle } from "lucide-react"

interface FindIdStepsProps {
  currentStep: "form" | "result"
}

export default function FindIdSteps({ currentStep }: FindIdStepsProps) {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === "form" ? "bg-blue-600 text-white" : "bg-green-500 text-white"
          }`}
        >
          {currentStep === "result" ? <CheckCircle className="w-5 h-5" /> : <span>1</span>}
        </div>
        <div className="text-sm ml-2 font-medium">이메일 입력</div>
      </div>

      <div className={`w-12 h-1 mx-2 ${currentStep === "result" ? "bg-green-500" : "bg-gray-300"}`} />

      <div className="flex items-center">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === "result" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"
          }`}
        >
          {currentStep === "result" ? <CheckCircle className="w-5 h-5" /> : <span>2</span>}
        </div>
        <div className={`text-sm ml-2 font-medium ${currentStep === "result" ? "text-gray-900" : "text-gray-500"}`}>
          결과 보기
        </div>
      </div>
    </div>
  )
}
