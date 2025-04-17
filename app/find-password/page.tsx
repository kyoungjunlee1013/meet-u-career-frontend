import type { Metadata } from "next"
import { FindPasswordContent } from "@/components/find-password/FindPasswordContent"

export const metadata: Metadata = {
  title: "Find Password | MeetU",
  description: "Recover your password for your MeetU account",
}

export default function FindPasswordPage() {
  return <FindPasswordContent />
}
