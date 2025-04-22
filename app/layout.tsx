import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meet U',
  description: '구직자와 기업을 이어주는 구인구직 플랫폼',
  generator: 'v0.dev',
  icons: {
    icon: '/images/favicon/favicon_3.png'
  },
}

import { Toaster } from "@/components/ui/toaster";

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://js.tosspayments.com/v1" strategy="beforeInteractive" />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
