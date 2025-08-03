"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function UserManagement() {
  const [userAddress, setUserAddress] = useState("")

  const { writeContract, data: hash, isPending: isWritePending, error: writeError } = useWriteContract()
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (hash) {
      toast.info(`Transaction sent: ${hash.slice(0, 6)}...${hash.slice(-4)}`)
    }
  }, [hash])

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Transaction confirmed successfully!")
      setUserAddress("") // Clear input on success
    }
  }, [isConfirmed])

  useEffect(() => {
    if (writeError) {
      toast.error(`Write error: ${writeError.shortMessage || writeError.message}`)
    }
    if (confirmError) {
      toast.error(`Confirmation error: ${confirmError.shortMessage || confirmError.message}`)
    }
  }, [writeError, confirmError])

  const handleAddToBlacklist = () => {
    if (!userAddress) {
      toast.error("Please enter a user address.")
      return
    }
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "addToBlacklist",
      args: [userAddress as `0x${string}`],
    })
  }

  const handleRemoveFromBlacklist = () => {
    if (!userAddress) {
      toast.error("Please enter a user address.")
      return
    }
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "removeFromBlacklist",
      args: [userAddress as `0x${string}`],
    })
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>User Blacklist Management</CardTitle>
          <CardDescription>Add or remove user addresses from the contract blacklist.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="userAddress">User Address</Label>
            <Input
              id="userAddress"
              placeholder="0x..."
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Button onClick={handleAddToBlacklist} disabled={isWritePending || isConfirming}>
              Add to Blacklist
            </Button>
            <Button onClick={handleRemoveFromBlacklist} disabled={isWritePending || isConfirming} variant="outline">
              Remove from Blacklist
            </Button>
          </div>
          {(isWritePending || isConfirming) && (
            <p className="text-sm text-muted-foreground">
              {isWritePending ? "Sending transaction..." : "Confirming transaction..."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
