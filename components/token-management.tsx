"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { parseUnits } from "viem"

export function TokenManagement() {
  const [tokenAddress, setTokenAddress] = useState("")
  const [tokenName, setTokenName] = useState("")
  const [tokenDecimals, setTokenDecimals] = useState("18")
  const [tokenLimit, setTokenLimit] = useState("")
  const [tokenStatus, setTokenStatus] = useState(true)
  const { toast } = useToast()

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const addSupportedToken = () => {
    if (!tokenAddress || !tokenName || !tokenDecimals) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "addSupportedToken",
      args: [tokenAddress as `0x${string}`, tokenName, Number.parseInt(tokenDecimals)],
    })
  }

  const setTokenStatusFn = () => {
    if (!tokenAddress) {
      toast({
        title: "Error",
        description: "Please enter a token address",
        variant: "destructive",
      })
      return
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "setTokenStatus",
      args: [tokenAddress as `0x${string}`, tokenStatus],
    })
  }

  const updateOrderLimit = () => {
    if (!tokenAddress || !tokenLimit) {
      toast({
        title: "Error",
        description: "Please enter token address and limit",
        variant: "destructive",
      })
      return
    }

    const limitInWei = parseUnits(tokenLimit, Number.parseInt(tokenDecimals))

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "updateOrderLimit",
      args: [tokenAddress as `0x${string}`, limitInWei],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Token Management</h1>
        <p className="text-muted-foreground">
          Configure supported payment tokens and manage transaction limits for the Paycrypt system.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Supported Token</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tokenAddress">Token Address</Label>
              <Input
                id="tokenAddress"
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tokenName">Token Name</Label>
              <Input
                id="tokenName"
                placeholder="e.g., USDC"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tokenDecimals">Decimals</Label>
              <Input
                id="tokenDecimals"
                placeholder="18"
                value={tokenDecimals}
                onChange={(e) => setTokenDecimals(e.target.value)}
              />
            </div>
            <Button onClick={addSupportedToken} disabled={isPending || isConfirming} className="w-full">
              Add Token
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Token Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="controlTokenAddress">Token Address</Label>
              <Input
                id="controlTokenAddress"
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="tokenStatus" checked={tokenStatus} onCheckedChange={setTokenStatus} />
              <Label htmlFor="tokenStatus">Token Active</Label>
            </div>
            <Button onClick={setTokenStatusFn} disabled={isPending || isConfirming} className="w-full">
              Update Status
            </Button>
            <div>
              <Label htmlFor="tokenLimit">Order Limit</Label>
              <Input
                id="tokenLimit"
                placeholder="1000"
                value={tokenLimit}
                onChange={(e) => setTokenLimit(e.target.value)}
              />
            </div>
            <Button onClick={updateOrderLimit} disabled={isPending || isConfirming} className="w-full">
              Update Limit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
