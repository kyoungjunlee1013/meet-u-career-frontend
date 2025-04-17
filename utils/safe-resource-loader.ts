"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface ResourceLoaderOptions {
  fallbackUrl?: string
  timeout?: number
}

export function useSafeResource(url: string, options: ResourceLoaderOptions = {}) {
  const [safeUrl, setSafeUrl] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!url) {
      setIsLoading(false)
      return
    }

    const controller = new AbortController()
    const timeoutId = options.timeout ? setTimeout(() => controller.abort(), options.timeout) : null

    // Check if the resource is accessible
    fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      mode: "no-cors", // This allows us to at least check if the resource exists
    })
      .then(() => {
        setSafeUrl(url)
        setError(null)
      })
      .catch((err) => {
        console.warn(`Resource at ${url} failed to load:`, err)
        setError(err)
        if (options.fallbackUrl) {
          setSafeUrl(options.fallbackUrl)
        } else {
          setSafeUrl(null)
        }
      })
      .finally(() => {
        setIsLoading(false)
        if (timeoutId) clearTimeout(timeoutId)
      })

    return () => {
      controller.abort()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [url, options.fallbackUrl, options.timeout])

  return { safeUrl, error, isLoading }
}

// Helper function to safely load images with fallbacks
export function SafeImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg?height=300&width=400",
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { fallbackSrc?: string }) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
  }, [src])

  return (
    <img
      {...props}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt || "Image"}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setHasError(true)
          setImgSrc(fallbackSrc)
        }
      }}
    />
  )
}
