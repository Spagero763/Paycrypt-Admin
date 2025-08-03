"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { UserX, UserCheck } from "lucide-react"

export function UserManagement() {
  const [userAddress, setUserAddress] = useState("")
  const { toast } = useToast()

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const addToBlacklist = () => {
    if (!userAddress) {
      toast({
        title: "Error",
        description: "Please enter a user address",
        variant: "destructive",
      })
      return
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "addToBlacklist",
      args: [userAddress as `0x${string}`],
    })
  }

  const removeFromBlacklist = () => {
    if (!userAddress) {
      toast({
        title: "Error",
        description: "Please enter a user address",
        variant: "destructive",
      })
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Access Management</h1>
        <p className="text-muted-foreground">
          Manage user access controls and blacklist settings for the Paycrypt payment system.
        </p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Blacklist Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="userAddress">User Address</Label>
            <Input
              id="userAddress"
              placeholder="0x..."
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Button
              onClick={addToBlacklist}
              disabled={isPending || isConfirming}
              variant="destructive"
              className="w-full"
            >
              <UserX className="mr-2 h-4 w-4" />
              Add to Blacklist
            </Button>
            <Button onClick={removeFromBlacklist} disabled={isPending || isConfirming} className="w-full">
              <UserCheck className="mr-2 h-4 w-4" />
              Remove from Blacklist
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
