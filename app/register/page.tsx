"use client"

import { useState } from "react"
import { RegisterHeader } from "@/components/register/RegisterHeader"
import { RegisterTabs } from "@/components/register/RegisterTabs"
import { RegisterForm } from "@/components/register/RegisterForm"

export default function RegisterPage() {
  const [showDetailForm, setShowDetailForm] = useState(false)

  const handleCreateIdClick = () => {
    setShowDetailForm(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <RegisterHeader />
      <main className="flex-1 flex flex-col">
        {showDetailForm ? <RegisterForm /> : <RegisterTabs onCreateIdClick={handleCreateIdClick} />}
      </main>
    </div>
  )
}
