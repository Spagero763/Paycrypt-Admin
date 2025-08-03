"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CheckCircle, XCircle, Hash } from "lucide-react"
import { useReadContract } from "wagmi"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract"
import { formatUnits } from "viem"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function DashboardHome() {
  const [totalVolume, setTotalVolume] = useState("0")
  const [totalSuccessfulOrders, setTotalSuccessfulOrders] = useState("0")
  const [totalFailedOrders, setTotalFailedOrders] = useState("0")
  const [orderCounter, setOrderCounter] = useState("0")

  const {
    data: volumeData,
    isLoading: isLoadingVolume,
    error: errorVolume,
  } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getTotalVolume",
  })

  const {
    data: successfulOrdersData,
    isLoading: isLoadingSuccessful,
    error: errorSuccessful,
  } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getTotalSuccessfulOrders",
  })

  const {
    data: failedOrdersData,
    isLoading: isLoadingFailed,
    error: errorFailed,
  } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getTotalFailedOrders",
  })

  const {
    data: orderCounterData,
    isLoading: isLoadingCounter,
    error: errorCounter,
  } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getOrderCounter",
  })

  useEffect(() => {
    if (volumeData !== undefined) {
      setTotalVolume(formatUnits(volumeData as bigint, 18)) // Assuming 18 decimals for volume
    }
    if (successfulOrdersData !== undefined) {
      setTotalSuccessfulOrders((successfulOrdersData as bigint).toString())
    }
    if (failedOrdersData !== undefined) {
      setTotalFailedOrders((failedOrdersData as bigint).toString())
    }
    if (orderCounterData !== undefined) {
      setOrderCounter((orderCounterData as bigint).toString())
    }

    if (errorVolume) toast.error("Error fetching total volume", { description: errorVolume.message })
    if (errorSuccessful) toast.error("Error fetching successful orders", { description: errorSuccessful.message })
    if (errorFailed) toast.error("Error fetching failed orders", { description: errorFailed.message })
    if (errorCounter) toast.error("Error fetching order counter", { description: errorCounter.message })
  }, [
    volumeData,
    successfulOrdersData,
    failedOrdersData,
    orderCounterData,
    errorVolume,
    errorSuccessful,
    errorFailed,
    errorCounter,
  ])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoadingVolume ? "Loading..." : totalVolume}</div>
          <p className="text-xs text-muted-foreground">Total value processed</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Successful Orders</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoadingSuccessful ? "Loading..." : totalSuccessfulOrders}</div>
          <p className="text-xs text-muted-foreground">Orders completed successfully</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Failed Orders</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoadingFailed ? "Loading..." : totalFailedOrders}</div>
          <p className="text-xs text-muted-foreground">Orders that did not complete</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Order Counter</CardTitle>
          <Hash className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoadingCounter ? "Loading..." : orderCounter}</div>
          <p className="text-xs text-muted-foreground">Total orders created</p>
        </CardContent>
      </Card>
    </div>
  )
}
