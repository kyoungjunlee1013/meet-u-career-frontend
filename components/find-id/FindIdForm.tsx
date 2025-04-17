"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FindIdFormProps {
  onSubmit: (email: string) => void
}

export default function FindIdForm({ onSubmit }: FindIdFormProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError(null)
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSubmit(email)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter your registered email"
            disabled={isLoading}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <Button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Find My ID"}
      </Button>

      <div className="text-center text-sm text-gray-500 mt-4">
        <p>
          Remember your ID?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
        <p className="mt-1">
          <a href="/find-password" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </p>
      </div>
    </form>
  )
}
