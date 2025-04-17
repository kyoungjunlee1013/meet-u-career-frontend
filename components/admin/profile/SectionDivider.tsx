import type { ReactNode } from "react"

interface SectionDividerProps {
  children: ReactNode
}

export default function SectionDivider({ children }: SectionDividerProps) {
  return <div className="border-t pt-6 space-y-4">{children}</div>
}
