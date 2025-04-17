"use client"

import { useEffect, useRef } from "react"

export function ApplicationStatusChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = 150
    canvas.width = size
    canvas.height = size

    // Data for the pie chart
    const data = [
      { value: 3, color: "#10B981" }, // Green - 서류 통과
      { value: 2, color: "#3B82F6" }, // Blue - 1차 면접
      { value: 1, color: "#8B5CF6" }, // Purple - 최종 면접
      { value: 4, color: "#EF4444" }, // Red - 불합격
    ]

    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw the pie chart
    let startAngle = 0
    data.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total

      ctx.beginPath()
      ctx.moveTo(size / 2, size / 2)
      ctx.arc(size / 2, size / 2, size / 2 - 10, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      startAngle += sliceAngle
    })

    // Draw the center circle (white)
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 4, 0, 2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()

    // Draw the text in the center
    ctx.font = "bold 24px Arial"
    ctx.fillStyle = "#1F2937"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(total.toString(), size / 2, size / 2 - 5)

    // Draw the "건" text
    ctx.font = "12px Arial"
    ctx.fillStyle = "#6B7280"
    ctx.fillText("건", size / 2, size / 2 + 15)
  }, [])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} width="150" height="150"></canvas>
    </div>
  )
}
