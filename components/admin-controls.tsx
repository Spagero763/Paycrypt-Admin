"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Shield, ShieldOff, AlertTriangle, UserPlus, UserMinus } from "lucide-react"
import { parseUnits } from "viem"

export function AdminControls() {
  const [adminAddress, setAdminAddress] = useState("")
  const [withdrawTokenAddress, setWithdrawTokenAddress] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const { toast } = useToast()

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const { data: isPaused } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "paused",
  })

  const addAdmin = () => {
    if (!adminAddress) {
      toast({
        title: "Error",
        description: "Please enter an admin address",
        variant: "destructive",
      })
      return
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "addAdmin",
      args: [adminAddress as `0x${string}`],
    })
  }

  const removeAdmin = () => {
    if (!adminAddress) {
      toast({
        title: "Error",
        description: "Please enter an admin address",
        variant: "destructive",
      })
      return
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "removeAdmin",
      args: [adminAddress as `0x${string}`],
    })
  }

  const pauseContract = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "pause",
    })
  }

  const unpauseContract = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "unpause",
    })
  }

  const emergencyWithdraw = () => {
    if (!withdrawTokenAddress || !withdrawAmount) {
      toast({
        title: "Error",
        description: "Please enter token address and amount",
        variant: "destructive",
      })
      return
    }

    const amountInWei = parseUnits(withdrawAmount, 18)

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "emergencyWithdrawToken",
      args: [withdrawTokenAddress as `0x${string}`, amountInWei],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Administration</h1>
        <p className="text-muted-foreground">
          Emergency controls, team member management, and critical system operations for Paycrypt.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Admin Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="adminAddress">Admin Address</Label>
              <Input
                id="adminAddress"
                placeholder="0x..."
                value={adminAddress}
                onChange={(e) => setAdminAddress(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Button onClick={addAdmin} disabled={isPending || isConfirming} className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Admin
              </Button>
              <Button
                onClick={removeAdmin}
                disabled={isPending || isConfirming}
                variant="destructive"
                className="w-full"
              >
                <UserMinus className="mr-2 h-4 w-4" />
                Remove Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Contract Status:</span>
              <span className={`text-sm ${isPaused ? "text-red-600" : "text-green-600"}`}>
                {isPaused ? "Paused" : "Active"}
              </span>
            </div>
            <div className="grid gap-2">
              <Button
                onClick={pauseContract}
                disabled={isPending || isConfirming || isPaused}
                variant="destructive"
                className="w-full"
              >
                <ShieldOff className="mr-2 h-4 w-4" />
                Pause Contract
              </Button>
              <Button onClick={unpauseContract} disabled={isPending || isConfirming || !isPaused} className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Unpause Contract
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
              Emergency Withdraw
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="withdrawTokenAddress">Token Address</Label>
                <Input
                  id="withdrawTokenAddress"
                  placeholder="0x..."
                  value={withdrawTokenAddress}
                  onChange={(e) => setWithdrawTokenAddress(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="withdrawAmount">Amount</Label>
                <Input
                  id="withdrawAmount"
                  placeholder="1000"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={emergencyWithdraw}
              disabled={isPending || isConfirming}
              variant="destructive"
              className="w-full"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Emergency Withdraw
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
