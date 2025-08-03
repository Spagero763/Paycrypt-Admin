"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCwIcon } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useContractRead } from "@/lib/contract"
import { useAccount } from "wagmi"
import { shortenAddress } from "@/lib/utils"

export function DashboardHomeContent() {
  const { address, isConnected } = useAccount()

  // State for individual metric loading
  const [loadingTotalSupply, setLoadingTotalSupply] = useState(false)
  const [loadingBalance, setLoadingBalance] = useState(false)
  const [loadingOwner, setLoadingOwner] = useState(false)
  const [loadingName, setLoadingName] = useState(false)
  const [loadingSymbol, setLoadingSymbol] = useState(false)

  // Fetch contract data
  const { data: name, refetch: refetchName } = useContractRead("name")
  const { data: symbol, refetch: refetchSymbol } = useContractRead("symbol")
  const { data: totalSupply, refetch: refetchTotalSupply } = useContractRead("totalSupply")
  const { data: owner, refetch: refetchOwner } = useContractRead("owner")
  const { data: userBalance, refetch: refetchUserBalance } = useContractRead("balanceOf", [address])

  // Function to refetch all data
  const refetchAllData = useCallback(async () => {
    if (!isConnected) return

    setLoadingName(true)
    setLoadingSymbol(true)
    setLoadingTotalSupply(true)
    setLoadingOwner(true)
    setLoadingBalance(true)

    await Promise.all([refetchName(), refetchSymbol(), refetchTotalSupply(), refetchOwner(), refetchUserBalance()])

    setLoadingName(false)
    setLoadingSymbol(false)
    setLoadingTotalSupply(false)
    setLoadingOwner(false)
    setLoadingBalance(false)
  }, [isConnected, refetchName, refetchSymbol, refetchTotalSupply, refetchOwner, refetchUserBalance])

  // Initial data fetch on component mount and when wallet connects
  useEffect(() => {
    if (isConnected) {
      refetchAllData()
    }
  }, [isConnected, refetchAllData])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contract Name</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setLoadingName(true)
              refetchName().finally(() => setLoadingName(false))
            }}
            disabled={loadingName || !isConnected}
          >
            <RefreshCwIcon className={`h-4 w-4 ${loadingName ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh Name</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isConnected ? (loadingName ? "Loading..." : name || "N/A") : "Connect Wallet"}
          </div>
          <p className="text-xs text-muted-foreground">Name of the deployed contract.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contract Symbol</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setLoadingSymbol(true)
              refetchSymbol().finally(() => setLoadingSymbol(false))
            }}
            disabled={loadingSymbol || !isConnected}
          >
            <RefreshCwIcon className={`h-4 w-4 ${loadingSymbol ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh Symbol</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isConnected ? (loadingSymbol ? "Loading..." : symbol || "N/A") : "Connect Wallet"}
          </div>
          <p className="text-xs text-muted-foreground">Symbol of the contract's token.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Supply</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setLoadingTotalSupply(true)
              refetchTotalSupply().finally(() => setLoadingTotalSupply(false))
            }}
            disabled={loadingTotalSupply || !isConnected}
          >
            <RefreshCwIcon className={`h-4 w-4 ${loadingTotalSupply ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh Total Supply</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isConnected
              ? loadingTotalSupply
                ? "Loading..."
                : totalSupply !== undefined
                  ? totalSupply.toString()
                  : "N/A"
              : "Connect Wallet"}
          </div>
          <p className="text-xs text-muted-foreground">Total tokens in circulation.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setLoadingBalance(true)
              refetchUserBalance().finally(() => setLoadingBalance(false))
            }}
            disabled={loadingBalance || !isConnected}
          >
            <RefreshCwIcon className={`h-4 w-4 ${loadingBalance ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh Balance</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isConnected
              ? loadingBalance
                ? "Loading..."
                : userBalance !== undefined
                  ? userBalance.toString()
                  : "N/A"
              : "Connect Wallet"}
          </div>
          <p className="text-xs text-muted-foreground">Your token balance.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contract Owner</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setLoadingOwner(true)
              refetchOwner().finally(() => setLoadingOwner(false))
            }}
            disabled={loadingOwner || !isConnected}
          >
            <RefreshCwIcon className={`h-4 w-4 ${loadingOwner ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh Owner</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isConnected ? (loadingOwner ? "Loading..." : owner ? shortenAddress(owner) : "N/A") : "Connect Wallet"}
          </div>
          <p className="text-xs text-muted-foreground">Address of the contract owner.</p>
        </CardContent>
      </Card>

      <Card className="col-span-full flex items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Button
            onClick={refetchAllData}
            disabled={
              !isConnected || loadingName || loadingSymbol || loadingTotalSupply || loadingBalance || loadingOwner
            }
          >
            <RefreshCwIcon
              className={`mr-2 h-4 w-4 ${loadingName || loadingSymbol || loadingTotalSupply || loadingBalance || loadingOwner ? "animate-spin" : ""}`}
            />
            Refresh All Data
          </Button>
          <p className="text-xs text-muted-foreground mt-2">Click to refresh all contract data.</p>
        </CardContent>
      </Card>
    </div>
  )
}
