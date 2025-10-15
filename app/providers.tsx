"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider, useAccount } from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { config } from "@/lib/wagmi"
import { WalletErrorBoundaryWrapper } from "@/components/wallet-error-boundary"

function AuthCookieSync() {
  const { isConnected, isDisconnected } = useAccount()

  React.useEffect(() => {
    if (isConnected) {
      document.cookie = "auth=1; path=/; samesite=lax"
    } else if (isDisconnected) {
      document.cookie = `auth=; path=/; expires=${new Date(0).toUTCString()}; samesite=lax`
    }
  }, [isConnected, isDisconnected])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AuthCookieSync />
          <WalletErrorBoundaryWrapper>{children}</WalletErrorBoundaryWrapper>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
