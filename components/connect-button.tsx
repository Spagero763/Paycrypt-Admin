"use client"

import { useConnect, useDisconnect, useAccount } from "wagmi"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Wallet, ChevronDown, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export function ConnectButton() {
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Wallet className="mr-2 h-4 w-4" />
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              disconnect()
              toast.success("Wallet disconnected")
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const availableConnectors = connectors.filter(
    (connector) => connector.id !== "injected" || typeof window !== "undefined",
  )

  if (availableConnectors.length === 1) {
    const connector = availableConnectors[0]
    return (
      <Button
        onClick={() => {
          try {
            connect({ connector })
          } catch (error) {
            console.error("Connection error:", error)
            toast.error("Failed to connect wallet")
          }
        }}
        disabled={isPending}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isPending ? "Connecting..." : "Connect Wallet"}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isPending}>
          <Wallet className="mr-2 h-4 w-4" />
          {isPending ? "Connecting..." : "Connect Wallet"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableConnectors.map((connector) => (
          <DropdownMenuItem
            key={connector.id}
            onClick={() => {
              try {
                connect({ connector })
              } catch (error) {
                console.error("Connection error:", error)
                toast.error(`Failed to connect with ${connector.name}`)
              }
            }}
            disabled={isPending}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {connector.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
