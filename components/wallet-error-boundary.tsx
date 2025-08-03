"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { AlertCircle } from "lucide-react"

interface WalletErrorBoundaryProps {
  children: React.ReactNode
}

export function WalletErrorBoundary({ children }: WalletErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error && event.error.message.includes("No injected provider")) {
        setHasError(true)
        setError(event.error)
        event.preventDefault() // Prevent default browser error handling
      }
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center justify-center gap-2">
              <AlertCircle className="h-6 w-6" />
              Wallet Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              It looks like there's an issue with your wallet connection or provider.
            </p>
            {error && <p className="text-sm text-gray-500 dark:text-gray-400">Error: {error.message}</p>}
            <p className="text-gray-700 dark:text-gray-300">
              Please ensure you have a wallet extension (like MetaMask) installed and enabled.
            </p>
            <Button onClick={() => window.location.reload()}>Reload Page</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
