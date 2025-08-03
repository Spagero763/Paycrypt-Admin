"use client"

import { useState, useEffect } from "react"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function UserManagement() {
  const [userAddress, setUserAddress] = useState("")

  const { writeContract: addToBlacklist, data: hashAddBlacklist, isPending: isAddingToBlacklist } = useWriteContract()
  const {
    writeContract: removeFromBlacklist,
    data: hashRemoveBlacklist,
    isPending: isRemovingFromBlacklist,
  } = useWriteContract()

  const { isLoading: isLoadingAddBlacklistTx, isSuccess: isAddBlacklistConfirmed } = useWaitForTransactionReceipt({
    hash: hashAddBlacklist,
  })
  const { isLoading: isLoadingRemoveBlacklistTx, isSuccess: isRemoveBlacklistConfirmed } = useWaitForTransactionReceipt(
    {
      hash: hashRemoveBlacklist,
    },
  )

  const handleAddToBlacklist = () => {
    if (!userAddress) {
      toast.error("Please enter a user address.")
      return
    }
    addToBlacklist({
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
    removeFromBlacklist({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "removeFromBlacklist",
      args: [userAddress as `0x${string}`],
    })
  }

  useEffect(() => {
    if (isAddBlacklistConfirmed) {
      toast.success("User added to blacklist!", { description: `Tx Hash: ${hashAddBlacklist}` })
      setUserAddress("")
    }
    if (isRemoveBlacklistConfirmed) {
      toast.success("User removed from blacklist!", { description: `Tx Hash: ${hashRemoveBlacklist}` })
      setUserAddress("")
    }
  }, [isAddBlacklistConfirmed, isRemoveBlacklistConfirmed, hashAddBlacklist, hashRemoveBlacklist])

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage user blacklist status.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add to Blacklist */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Add User to Blacklist</h3>
          <Label htmlFor="blacklistAddress">User Address</Label>
          <Input
            id="blacklistAddress"
            placeholder="0x..."
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
          />
          <Button
            onClick={handleAddToBlacklist}
            disabled={isAddingToBlacklist || isLoadingAddBlacklistTx}
            className="w-full"
          >
            {isAddingToBlacklist || isLoadingAddBlacklistTx ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Add to Blacklist
          </Button>
        </div>

        <Separator />

        {/* Remove from Blacklist */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Remove User from Blacklist</h3>
          <Label htmlFor="removeBlacklistAddress">User Address</Label>
          <Input
            id="removeBlacklistAddress"
            placeholder="0x..."
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
          />
          <Button
            onClick={handleRemoveFromBlacklist}
            disabled={isRemovingFromBlacklist || isLoadingRemoveBlacklistTx}
            className="w-full"
          >
            {isRemovingFromBlacklist || isLoadingRemoveBlacklistTx ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Remove from Blacklist
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
