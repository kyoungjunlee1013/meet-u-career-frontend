import { CheckCircle } from "lucide-react"

type Step = "form" | "verification" | "reset"

interface FindPasswordStepsProps {
  currentStep: Step
}

export const FindPasswordSteps = ({ currentStep }: FindPasswordStepsProps) => {
  const steps = [
    { id: "form", label: "정보 입력" },
    { id: "verification", label: "인증" },
    { id: "reset", label: "비밀번호 재설정" },
  ]

  const getStepStatus = (stepId: string) => {
    if (stepId === "form" && currentStep === "form") return "current"
    if (stepId === "verification" && currentStep === "verification") return "current"
    if (stepId === "reset" && currentStep === "reset") return "current"

    if (
      (stepId === "form" && ["verification", "reset"].includes(currentStep as string)) ||
      (stepId === "verification" && currentStep === "reset")
    ) {
      return "completed"
    }

    return "upcoming"
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative">
            {/* Step connector line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-4 left-[50%] w-[calc(100%-2rem)] h-0.5 -translate-y-1/2 ${
                  getStepStatus(step.id) === "completed" ? "bg-blue-500" : "bg-gray-200"
                }`}
                style={{ left: "50%" }}
              />
            )}

            {/* Step circle */}
            <div
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                getStepStatus(step.id) === "current"
                  ? "border-blue-500 bg-white text-blue-500"
                  : getStepStatus(step.id) === "completed"
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 bg-white text-gray-300"
              }`}
            >
              {getStepStatus(step.id) === "completed" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>

            {/* Step label */}
            <span
              className={`mt-2 text-xs font-medium ${
                getStepStatus(step.id) === "current"
                  ? "text-blue-500"
                  : getStepStatus(step.id) === "completed"
                    ? "text-blue-500"
                    : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
