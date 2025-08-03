"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Wallet, ChevronDown, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function ConnectButton() {
  const { address, isConnected, connector } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (error) {
      console.error("Wallet connection error:", error)
      toast.error(`Connection failed: ${error.message}`)
    }
  }, [error])

  if (!mounted) {
    return (
      <Button disabled>
        <Wallet className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => disconnect()}>
          <Wallet className="mr-2 h-4 w-4" />
          {address.slice(0, 6)}...{address.slice(-4)}
        </Button>
        {connector && <span className="text-xs text-muted-foreground">via {connector.name}</span>}
      </div>
    )
  }

  const availableConnectors = connectors.filter(
    (connector) => connector.type !== "injected" || typeof window !== "undefined",
  )

  const handleConnect = async (connector: any) => {
    try {
      await connect({ connector })
    } catch (err) {
      console.error("Connection error:", err)
      toast.error("Failed to connect wallet. Please try again.")
    }
  }

  if (availableConnectors.length === 1) {
    return (
      <Button onClick={() => handleConnect(availableConnectors[0])} disabled={isPending} className="min-w-[140px]">
        <Wallet className="mr-2 h-4 w-4" />
        {isPending ? "Connecting..." : "Connect Wallet"}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isPending} className="min-w-[140px]">
          <Wallet className="mr-2 h-4 w-4" />
          {isPending ? "Connecting..." : "Connect Wallet"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {availableConnectors.map((connector) => (
          <DropdownMenuItem
            key={connector.uid}
            onClick={() => handleConnect(connector)}
            className="cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center">
              <Wallet className="mr-2 h-4 w-4" />
              {connector.name}
            </div>
            {connector.type === "injected" && <span className="text-xs text-muted-foreground">Browser</span>}
          </DropdownMenuItem>
        ))}
        {!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID && (
          <DropdownMenuItem disabled className="text-muted-foreground">
            <AlertCircle className="mr-2 h-4 w-4" />
            WalletConnect unavailable
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
