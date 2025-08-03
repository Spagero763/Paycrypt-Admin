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
import { parseUnits } from "viem"
import { Loader2 } from "lucide-react"

export function TokenManagement() {
  const [tokenAddress, setTokenAddress] = useState("")
  const [tokenName, setTokenName] = useState("")
  const [tokenDecimals, setTokenDecimals] = useState("")
  const [newLimit, setNewLimit] = useState("")
  const [tokenStatusAddress, setTokenStatusAddress] = useState("")
  const [tokenActiveStatus, setTokenActiveStatus] = useState(true)

  const { writeContract: addToken, data: hashAddToken, isPending: isAddingToken } = useWriteContract()
  const { writeContract: updateLimit, data: hashUpdateLimit, isPending: isUpdatingLimit } = useWriteContract()
  const { writeContract: setStatus, data: hashSetStatus, isPending: isSettingStatus } = useWriteContract()

  const { isLoading: isLoadingAddTokenTx, isSuccess: isAddTokenConfirmed } = useWaitForTransactionReceipt({
    hash: hashAddToken,
  })
  const { isLoading: isLoadingUpdateLimitTx, isSuccess: isUpdateLimitConfirmed } = useWaitForTransactionReceipt({
    hash: hashUpdateLimit,
  })
  const { isLoading: isLoadingSetStatusTx, isSuccess: isSetStatusConfirmed } = useWaitForTransactionReceipt({
    hash: hashSetStatus,
  })

  const handleAddSupportedToken = () => {
    if (!tokenAddress || !tokenName || !tokenDecimals) {
      toast.error("Please fill all fields for adding a token.")
      return
    }
    addToken({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "addSupportedToken",
      args: [tokenAddress as `0x${string}`, tokenName, Number(tokenDecimals)],
    })
  }

  const handleUpdateOrderLimit = () => {
    if (!tokenAddress || !newLimit) {
      toast.error("Please fill token address and new limit.")
      return
    }
    updateLimit({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "updateOrderLimit",
      args: [tokenAddress as `0x${string}`, parseUnits(newLimit, Number(tokenDecimals || 18))], // Assuming 18 decimals if not specified
    })
  }

  const handleSetTokenStatus = () => {
    if (!tokenStatusAddress) {
      toast.error("Please enter token address for status update.")
      return
    }
    setStatus({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "setTokenStatus",
      args: [tokenStatusAddress as `0x${string}`, tokenActiveStatus],
    })
  }

  useEffect(() => {
    if (isAddTokenConfirmed) {
      toast.success("Token added successfully!", { description: `Tx Hash: ${hashAddToken}` })
      setTokenAddress("")
      setTokenName("")
      setTokenDecimals("")
    }
    if (isUpdateLimitConfirmed) {
      toast.success("Order limit updated!", { description: `Tx Hash: ${hashUpdateLimit}` })
      setNewLimit("")
    }
    if (isSetStatusConfirmed) {
      toast.success("Token status updated!", { description: `Tx Hash: ${hashSetStatus}` })
      setTokenStatusAddress("")
    }
  }, [isAddTokenConfirmed, isUpdateLimitConfirmed, isSetStatusConfirmed, hashAddToken, hashUpdateLimit, hashSetStatus])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Management</CardTitle>
        <CardDescription>Add, update limits, and manage status of supported tokens.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Supported Token */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Add Supported Token</h3>
          <Label htmlFor="addTokenAddress">Token Address</Label>
          <Input
            id="addTokenAddress"
            placeholder="0x..."
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <Label htmlFor="tokenName">Token Name</Label>
          <Input
            id="tokenName"
            placeholder="e.g., USDC"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
          />
          <Label htmlFor="tokenDecimals">Decimals</Label>
          <Input
            id="tokenDecimals"
            type="number"
            placeholder="e.g., 6"
            value={tokenDecimals}
            onChange={(e) => setTokenDecimals(e.target.value)}
          />
          <Button onClick={handleAddSupportedToken} disabled={isAddingToken || isLoadingAddTokenTx} className="w-full">
            {isAddingToken || isLoadingAddTokenTx ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Add Token
          </Button>
        </div>

        <Separator />

        {/* Set Token Limit */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Set Token Order Limit</h3>
          <Label htmlFor="limitTokenAddress">Token Address</Label>
          <Input
            id="limitTokenAddress"
            placeholder="0x..."
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <Label htmlFor="newLimit">New Limit (in token units)</Label>
          <Input
            id="newLimit"
            type="number"
            placeholder="e.g., 1000"
            value={newLimit}
            onChange={(e) => setNewLimit(e.target.value)}
          />
          <Button
            onClick={handleUpdateOrderLimit}
            disabled={isUpdatingLimit || isLoadingUpdateLimitTx}
            className="w-full"
          >
            {isUpdatingLimit || isLoadingUpdateLimitTx ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Update Limit
          </Button>
        </div>

        <Separator />

        {/* Set Token Status */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Set Token Active Status</h3>
          <Label htmlFor="statusTokenAddress">Token Address</Label>
          <Input
            id="statusTokenAddress"
            placeholder="0x..."
            value={tokenStatusAddress}
            onChange={(e) => setTokenStatusAddress(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="tokenActiveStatus"
              checked={tokenActiveStatus}
              onChange={(e) => setTokenActiveStatus(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <Label htmlFor="tokenActiveStatus">Is Active</Label>
          </div>
          <Button onClick={handleSetTokenStatus} disabled={isSettingStatus || isLoadingSetStatusTx} className="w-full">
            {isSettingStatus || isLoadingSetStatusTx ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Set Status
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
