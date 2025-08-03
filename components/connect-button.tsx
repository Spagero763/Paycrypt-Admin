"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function ConnectButton() {
  const { address, isConnected, isConnecting } = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (error) {
      toast.error("Wallet Connection Error", {
        description: error.message || "There was an issue connecting to your wallet. Please try again.",
      })
    }
  }, [error])

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="truncate max-w-[150px] bg-transparent">
            {address}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => disconnect()}>Disconnect</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Button onClick={() => setIsModalOpen(true)} disabled={isConnecting}>
        {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Connect Wallet
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => {
                connect({ connector })
                setIsModalOpen(false) // Close modal after attempting connection
              }}
              variant="outline"
              disabled={isConnecting}
            >
              {isConnecting && connector.id === status.connector?.id ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {connector.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
