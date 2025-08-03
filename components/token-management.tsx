"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { parseUnits } from "viem"
import { RefreshCwIcon } from "lucide-react"

export function TokenManagement() {
  const [tokenAddress, setTokenAddress] = useState("")
  const [tokenName, setTokenName] = useState("")
  const [tokenDecimals, setTokenDecimals] = useState("18")
  const [newLimit, setNewLimit] = useState("")
  const [tokenStatus, setTokenStatus] = useState<boolean | null>(null)
  const [tokens, setTokens] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
      // Clear form fields after successful transaction
      setTokenAddress("")
      setTokenName("")
      setTokenDecimals("18")
      setNewLimit("")
      setTokenStatus(null)
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

  const handleAddSupportedToken = () => {
    if (!tokenAddress || !tokenName || !tokenDecimals) {
      toast.error("Please fill all fields for adding a token.")
      return
    }
    writeContract({
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
    try {
      const limitInWei = parseUnits(newLimit, Number(tokenDecimals || 18)) // Use tokenDecimals for conversion
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "updateOrderLimit",
        args: [tokenAddress as `0x${string}`, limitInWei],
      })
    } catch (e: any) {
      toast.error(`Invalid limit amount: ${e.message}`)
    }
  }

  const handleSetTokenStatus = (status: boolean) => {
    if (!tokenAddress) {
      toast.error("Please enter token address to set status.")
      return
    }
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "setTokenStatus",
      args: [tokenAddress as `0x${string}`, status],
    })
  }

  const fetchTokens = async () => {
    setIsLoading(true)
    // Simulate fetching token data from a smart contract or API
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setTokens([
      { name: "MyToken", symbol: "MTK", totalSupply: "1,000,000", holders: "500" },
      { name: "Governance Token", symbol: "GOV", totalSupply: "10,000", holders: "50" },
    ])
    setIsLoading(false)
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Token Management</CardTitle>
          <Button variant="ghost" size="icon" onClick={fetchTokens} disabled={isLoading}>
            <RefreshCwIcon className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh Tokens</span>
          </Button>
        </CardHeader>
        <CardContent>
          <CardDescription>View and manage your contract's tokens.</CardDescription>
          {isLoading ? (
            <div className="text-center py-4">Loading token data...</div>
          ) : tokens.length > 0 ? (
            <div className="mt-4 space-y-2">
              {tokens.map((token) => (
                <div key={token.symbol} className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <p className="font-semibold">
                      {token.name} ({token.symbol})
                    </p>
                    <p className="text-sm text-muted-foreground">Total Supply: {token.totalSupply}</p>
                  </div>
                  <div className="text-right">
                    <p>Holders: {token.holders}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">No token data found.</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Supported Token</CardTitle>
          <CardDescription>Add a new ERC20 token that the contract will support.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="addTokenAddress">Token Address</Label>
            <Input
              id="addTokenAddress"
              placeholder="0x..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tokenName">Token Name</Label>
            <Input
              id="tokenName"
              placeholder="e.g., USDC"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tokenDecimals">Decimals (e.g., 6 for USDC, 18 for ETH)</Label>
            <Input
              id="tokenDecimals"
              type="number"
              placeholder="18"
              value={tokenDecimals}
              onChange={(e) => setTokenDecimals(e.target.value)}
            />
          </div>
          <Button onClick={handleAddSupportedToken} disabled={isWritePending || isConfirming}>
            Add Token
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Order Limit</CardTitle>
          <CardDescription>Set a new order limit for a supported token.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="limitTokenAddress">Token Address</Label>
            <Input
              id="limitTokenAddress"
              placeholder="0x..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newLimit">New Limit (in token units, e.g., 1000)</Label>
            <Input
              id="newLimit"
              type="number"
              placeholder="1000"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
            />
          </div>
          <Button onClick={handleUpdateOrderLimit} disabled={isWritePending || isConfirming}>
            Update Limit
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Set Token Status</CardTitle>
          <CardDescription>Activate or deactivate a supported token.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="statusTokenAddress">Token Address</Label>
            <Input
              id="statusTokenAddress"
              placeholder="0x..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => handleSetTokenStatus(true)}
              disabled={isWritePending || isConfirming}
              variant={tokenStatus === true ? "default" : "outline"}
            >
              Activate
            </Button>
            <Button
              onClick={() => handleSetTokenStatus(false)}
              disabled={isWritePending || isConfirming}
              variant={tokenStatus === false ? "destructive" : "outline"}
            >
              Deactivate
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
