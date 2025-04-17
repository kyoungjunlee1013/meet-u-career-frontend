"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface SaveButtonProps {
  onClick: () => Promise<void>
  isEditMode?: boolean
}

export function SaveButton({ onClick, isEditMode = false }: SaveButtonProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (showConfetti) {
      // Create confetti effect
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ["#4285F4", "#34A853", "#FBBC05", "#EA4335"],
        })

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ["#4285F4", "#34A853", "#FBBC05", "#EA4335"],
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()

      // Reset after animation
      setTimeout(() => {
        setShowConfetti(false)
        setIsComplete(false)
      }, 3000)
    }
  }, [showConfetti])

  const handleClick = async () => {
    setIsSaving(true)
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 50)

    try {
      await onClick()

      // Complete the progress
      clearInterval(interval)
      setProgress(100)

      // Show completion state
      setTimeout(() => {
        setIsComplete(true)
        setShowConfetti(true)
      }, 300)

      // Reset after delay
      setTimeout(() => {
        setIsSaving(false)
      }, 3000)
    } catch (error) {
      clearInterval(interval)
      setIsSaving(false)
      setProgress(0)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isSaving}
      className="bg-blue-600 hover:bg-blue-700 shadow-lg px-6 py-6 rounded-full"
    >
      <div className="relative flex items-center">
        {isSaving && !isComplete && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {isSaving && !isComplete && <span>{progress}%</span>}

        {isComplete && <Check className="mr-2 h-5 w-5" />}

        {!isSaving && !isComplete && <span>{isEditMode ? "수정 완료" : "저장하기"}</span>}

        {isComplete && <span>저장 완료!</span>}
      </div>
    </Button>
  )
}
