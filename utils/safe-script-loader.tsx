"use client"

import { useEffect, useState } from "react"

interface ScriptStatus {
  loaded: boolean
  error: boolean
}

export function useScript(src: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>({
    loaded: false,
    error: false,
  })

  useEffect(() => {
    // Prevent running on server
    if (typeof window === "undefined") {
      return
    }

    // Check if script already exists
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement

    if (!script) {
      // Create script
      script = document.createElement("script")
      script.src = src
      script.async = true
      script.setAttribute("data-status", "loading")
      document.body.appendChild(script)

      // Store status in attribute on script
      // This can be read by other instances of this hook
      const setAttributeFromEvent = (event: Event) => {
        script.setAttribute("data-status", event.type === "load" ? "loaded" : "error")
      }

      script.addEventListener("load", setAttributeFromEvent)
      script.addEventListener("error", setAttributeFromEvent)
    } else {
      // Grab existing script status from attribute and set to state
      setStatus({
        loaded: script.getAttribute("data-status") === "loaded",
        error: script.getAttribute("data-status") === "error",
      })
    }

    // Script event handler to update status in state
    // Note: Even if the script already exists we still need to add
    // event handlers to update the state for *this* hook instance
    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === "load" ? { loaded: true, error: false } : { loaded: false, error: true })
    }

    // Add event listeners
    script.addEventListener("load", setStateFromEvent)
    script.addEventListener("error", setStateFromEvent)

    // Remove event listeners on cleanup
    return () => {
      if (script) {
        script.removeEventListener("load", setStateFromEvent)
        script.removeEventListener("error", setStateFromEvent)
      }
    }
  }, [src]) // Only re-run effect if script src changes

  return status
}

// Component to safely load a script
export function SafeScript({
  src,
  onLoad,
  onError,
}: {
  src: string
  onLoad?: () => void
  onError?: () => void
}) {
  const { loaded, error } = useScript(src)

  useEffect(() => {
    if (loaded && onLoad) onLoad()
    if (error && onError) onError()
  }, [loaded, error, onLoad, onError])

  return null
}
