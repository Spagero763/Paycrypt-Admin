"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"
import { useState, useEffect } from "react"
import { parseUnits } from "viem"
import { useToast } from "@/components/ui/use-toast"

export function AdminControls() {
  const [adminAddress, setAdminAddress] = useState("")
  const [withdrawTokenAddress, setWithdrawTokenAddress] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [newOwnerAddress, setNewOwnerAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const { writeContract, data: hash, isPending: isWritePending, error: writeError } = useWriteContract()
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({ hash })

  const { data: isPaused, isLoading: isLoadingPaused } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "paused",
  })

  useEffect(() => {
    if (hash) {
      toast.info(`Transaction sent: ${hash.slice(0, 6)}...${hash.slice(-4)}`)
    }
  }, [hash])

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Transaction confirmed successfully!")
      setAdminAddress("")
      setWithdrawTokenAddress("")
      setWithdrawAmount("")
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

  const handleAddAdmin = () => {
    if (!adminAddress) {
      toast.error("Please enter an admin address.")
      return
    }
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "addAdmin",
      args: [adminAddress as `0x${string}`],
    })
  }

  const handleRemoveAdmin = () => {
    if (!adminAddress) {
      toast.error("Please enter an admin address.")
      return
    }
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "removeAdmin",
      args: [adminAddress as `0x${string}`],
    })
  }

  const handleEmergencyWithdraw = () => {
    if (!withdrawTokenAddress || !withdrawAmount) {
      toast.error("Please enter token address and amount for emergency withdrawal.")
      return
    }
    try {
      // Assuming 18 decimals for simplicity, adjust if needed for specific tokens
      const amountInWei = parseUnits(withdrawAmount, 18)
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "emergencyWithdrawToken",
        args: [withdrawTokenAddress as `0x${string}`, amountInWei],
      })
    } catch (e: any) {
      toast.error(`Invalid amount: ${e.message}`)
    }
  }

  const handlePauseContract = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "pause",
    })
  }

  const handleUnpauseContract = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "unpause",
    })
  }

  const handleTransferOwnership = async () => {
    if (!newOwnerAddress) {
      toast({
        title: "Error",
        description: "Please enter a new owner address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    // Simulate contract interaction for transferring ownership
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast({
      title: "Success",
      description: `Ownership transferred to ${newOwnerAddress}. (Simulated)`,
    })
    setNewOwnerAddress("")
    setIsLoading(false)
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Management</CardTitle>
          <CardDescription>Add or remove addresses with admin privileges.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="adminAddress">Admin Address</Label>
            <Input
              id="adminAddress"
              placeholder="0x..."
              value={adminAddress}
              onChange={(e) => setAdminAddress(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Button onClick={handleAddAdmin} disabled={isWritePending || isConfirming}>
              Add Admin
            </Button>
            <Button onClick={handleRemoveAdmin} disabled={isWritePending || isConfirming} variant="outline">
              Remove Admin
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Emergency Controls</CardTitle>
          <CardDescription>
            Perform critical operations like emergency withdrawals or pausing the contract.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Emergency Withdraw</h3>
            <div className="grid gap-2">
              <Label htmlFor="withdrawTokenAddress">Token Address</Label>
              <Input
                id="withdrawTokenAddress"
                placeholder="0x..."
                value={withdrawTokenAddress}
                onChange={(e) => setWithdrawTokenAddress(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="withdrawAmount">Amount (in token units)</Label>
              <Input
                id="withdrawAmount"
                type="number"
                placeholder="1000"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
            <Button onClick={handleEmergencyWithdraw} disabled={isWritePending || isConfirming} variant="destructive">
              Emergency Withdraw
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contract Pause Status</h3>
            <p className="text-sm text-muted-foreground">
              Current Status: {isLoadingPaused ? "Loading..." : isPaused ? "Paused" : "Active"}
            </p>
            <div className="flex gap-4">
              <Button
                onClick={handlePauseContract}
                disabled={isWritePending || isConfirming || isPaused}
                variant="outline"
              >
                Pause Contract
              </Button>
              <Button
                onClick={() => handleUnpauseContract()}
                disabled={isWritePending || isConfirming || !isPaused}
                variant="outline"
              >
                Unpause Contract
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-owner">Transfer Ownership</Label>
            <Input
              id="new-owner"
              placeholder="Enter new owner address"
              value={newOwnerAddress}
              onChange={(e) => setNewOwnerAddress(e.target.value)}
            />
            <Button onClick={handleTransferOwnership} disabled={isLoading}>
              {isLoading ? "Transferring..." : "Transfer Ownership"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {(isWritePending || isConfirming) && (
        <p className="text-sm text-muted-foreground">
          {isWritePending ? "Sending transaction..." : "Confirming transaction..."}
        </p>
      )}
    </div>
  )
}
