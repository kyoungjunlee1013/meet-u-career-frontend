"use client"

import type React from "react"

import dynamic from "next/dynamic"
import { Suspense, type ComponentType, type ReactNode } from "react"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"

interface SafeDynamicImportOptions {
  ssr?: boolean
  loading?: ComponentType | (() => ReactNode)
  errorFallback?: ReactNode
}

export function safeDynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: SafeDynamicImportOptions = {},
) {
  const { ssr = false, loading: LoadingComponent, errorFallback } = options

  // Create the dynamic component with error handling
  const DynamicComponent = dynamic(importFn, {
    ssr,
    loading: LoadingComponent,
  })

  // Return a wrapped version that includes error boundary and suspense
  return function SafeDynamicComponent(props: React.ComponentProps<T>) {
    return (
      <ErrorBoundary fallback={errorFallback}>
        <Suspense fallback={LoadingComponent ? <LoadingComponent /> : null}>
          <DynamicComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    )
  }
}
