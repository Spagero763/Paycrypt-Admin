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
    if (isDisconnected || !isConnected) {
      toast({
        title: "Wallet Disconnected",
        description: "Please connect your wallet to access the dashboard.",
        variant: "destructive",
      })
      router.replace("/") // Hard redirect to landing page to prevent back nav bypass
    }
  }, [isDisconnected, isConnected, router])

  if (!isConnected) return null

  return <WalletErrorBoundaryWrapper>{children}</WalletErrorBoundaryWrapper>
}
