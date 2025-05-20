"use client";

import { useEffect, useRef } from "react";

// ✅ props로 데이터를 받도록 수정
interface PieChartData {
  value: number;
  color: string;
}

interface Props {
  data: PieChartData[];
}

export const PieChart = ({ data }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 200;
    canvas.height = 200;

    // ✅ 데이터 총합 계산
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // ✅ 파이 차트 그리기
    let startAngle = 0;
    data.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total;

      ctx.beginPath();
      ctx.fillStyle = item.color;
      ctx.moveTo(100, 100);
      ctx.arc(100, 100, 80, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      startAngle += sliceAngle;
    });

    // ✅ 가운데 흰색 도넛 효과
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.fill();

    // ✅ 중앙 텍스트: 총합
    ctx.fillStyle = "#1F2937";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(total.toString(), 100, 90); // ✅ 고정값 → 총합으로 수정

    ctx.fillStyle = "#6B7280";
    ctx.font = "12px Arial";
    ctx.fillText("건", 100, 110);
  }, [data]);

  return (
    <div className="relative w-[200px] h-[200px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};
