"use client"

import { useEffect, useRef } from "react"

export const PieChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 200
    canvas.height = 200

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
      ctx.fillStyle = item.color
      ctx.moveTo(100, 100)
      ctx.arc(100, 100, 80, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      startAngle += sliceAngle
    })

    // Draw a white circle in the middle for donut effect
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.arc(100, 100, 50, 0, 2 * Math.PI)
    ctx.fill()

    // Add text in the center
    ctx.fillStyle = "#1F2937"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("10", 100, 90)

    ctx.fillStyle = "#6B7280"
    ctx.font = "12px Arial"
    ctx.fillText("건", 100, 110)
  }, [])

  return (
    <div className="relative w-[200px] h-[200px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}
