"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <div className="p-4 rounded-md bg-red-50 border border-red-200">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h2>
            <p className="text-sm text-red-600">{this.state.error?.message || "An unexpected error occurred"}</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-sm font-medium rounded-md transition-colors"
            >
              Try again
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
