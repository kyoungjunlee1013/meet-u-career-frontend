// app/font.ts
import localFont from "next/font/local";

export const dotFont = localFont({
    src: [
        {
            path: "./fonts/42dotSans-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/42dotSans-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
  display: "swap", // 폰트 깜빡임(FOUT) 방지
  variable: "--font-dot", // Tailwind 연결할 변수명
  preload: true, // 폰트 미리 불러오기 (성능 최적화)
});
