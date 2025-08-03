"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { Button } from "@/components/ui/button"
import { shortenAddress } from "@/lib/utils"

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Connected: {shortenAddress(address!)}</span>
        <Button onClick={() => disconnect()} size="sm" variant="outline">
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={() => connect()} size="sm">
      Connect Wallet
    </Button>
  )
}
