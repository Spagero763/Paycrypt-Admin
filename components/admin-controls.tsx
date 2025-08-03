"use client"

import React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "@/hooks/use-toast"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"

export function AdminControls() {
  const [newOwnerAddress, setNewOwnerAddress] = useState("")
  const [pausedState, setPausedState] = useState(false)

  // Read current owner
  const { data: owner, refetch: refetchOwner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "owner",
  })

  // Read paused state
  const { data: isPaused, refetch: refetchIsPaused } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "paused",
  })

  // Write contract for transferring ownership
  const { writeContract: writeTransferOwnership, data: transferOwnershipHash } = useWriteContract()
  const { isLoading: isTransferringOwnership, isSuccess: isTransferOwnershipConfirmed } = useWaitForTransactionReceipt({
    hash: transferOwnershipHash,
  })

  // Write contract for pausing/unpausing
  const { writeContract: writePause, data: pauseHash } = useWriteContract()
  const { isLoading: isPausing, isSuccess: isPauseConfirmed } = useWaitForTransactionReceipt({
    hash: pauseHash,
  })

  const handleTransferOwnership = () => {
    if (!newOwnerAddress || newOwnerAddress.length !== 42) {
      toast({
        title: "Error",
        description: "Please enter a valid new owner address.",
        variant: "destructive",
      })
      return
    }
    writeTransferOwnership({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "transferOwnership",
      args: [newOwnerAddress as `0x${string}`],
    })
  }

  const handleTogglePause = () => {
    writePause({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: isPaused ? "unpause" : "pause",
    })
  }

  React.useEffect(() => {
    if (isTransferOwnershipConfirmed) {
      toast({
        title: "Ownership Transferred",
        description: `Ownership transferred to ${newOwnerAddress}. Transaction hash: ${transferOwnershipHash}`,
      })
      setNewOwnerAddress("")
      refetchOwner()
    }
  }, [isTransferOwnershipConfirmed, transferOwnershipHash, newOwnerAddress, refetchOwner])

  React.useEffect(() => {
    if (isPauseConfirmed) {
      toast({
        title: isPaused ? "Contract Unpaused" : "Contract Paused",
        description: `Contract state changed. Transaction hash: ${pauseHash}`,
      })
      refetchIsPaused()
    }
  }, [isPauseConfirmed, pauseHash, isPaused, refetchIsPaused])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Admin Controls</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label>Current Owner</Label>
          <p className="text-lg font-semibold">{owner || "Loading..."}</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="newOwnerAddress">Transfer Ownership</Label>
          <Input
            id="newOwnerAddress"
            placeholder="New owner address (0x...)"
            value={newOwnerAddress}
            onChange={(e) => setNewOwnerAddress(e.target.value)}
          />
          <Button onClick={handleTransferOwnership} disabled={isTransferringOwnership}>
            {isTransferringOwnership ? "Transferring..." : "Transfer Ownership"}
          </Button>
        </div>

        <div className="grid gap-2">
          <Label>Contract State</Label>
          <p className="text-lg font-semibold">{isPaused ? "Paused" : "Active"}</p>
          <Button onClick={handleTogglePause} disabled={isPausing}>
            {isPausing ? "Updating..." : isPaused ? "Unpause Contract" : "Pause Contract"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
