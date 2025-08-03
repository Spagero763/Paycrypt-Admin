"use client"

import type React from "react"

import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ConnectButton } from "./connect-button"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      // Optionally redirect to a landing page or show a message
      // router.push('/');
    }
  }, [isConnected, router])

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Wallet Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">Please connect your wallet to access the dashboard.</p>
            <ConnectButton />
            <Button variant="link" onClick={() => router.push("/")}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
