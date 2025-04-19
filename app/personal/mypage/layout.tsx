import { SidebarProvider } from "@/components/personal/mypage/SidebarProvider"

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}
