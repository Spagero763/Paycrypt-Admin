"use client"

import type React from "react"

import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Lock } from "lucide-react"
import { Loader2 } from "lucide-react" // Loader2 variable is declared here

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected, isConnecting } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.push("/")
    }
  }, [isConnected, isConnecting, router])

  if (isConnecting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Connecting Wallet...</CardTitle>
            <CardDescription>Please wait while we connect to your wallet.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-500">Access Denied</CardTitle>
            <CardDescription>You must connect your wallet to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Lock className="h-16 w-16 text-red-400 mx-auto" />
            <Button asChild className="w-full">
              <Link href="/">Go to Landing Page</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
