"use client"

import type React from "react"

import { useAccount } from "wagmi"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { WalletErrorBoundaryWrapper } from "@/components/wallet-error-boundary"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isConnected, isDisconnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (isDisconnected) {
      toast({
        title: "Wallet Disconnected",
        description: "Please connect your wallet to access the dashboard.",
        variant: "destructive",
      })
      router.push("/") // Redirect to landing page
    }
  }, [isDisconnected, router])

  if (!isConnected) {
    // Optionally show a loading state or a message while redirecting
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Connecting to wallet or redirecting...</p>
      </div>
    )
  }

  return <WalletErrorBoundaryWrapper>{children}</WalletErrorBoundaryWrapper>
}
