"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CheckCircle, XCircle, Hash, RefreshCw } from "lucide-react"
import { useReadContract } from "wagmi"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { formatUnits } from "viem"

function DashboardHomeContentComponent() {
  const [totalVolume, setTotalVolume] = useState("0")
  const [totalSuccessfulOrders, setTotalSuccessfulOrders] = useState("0")
  const [totalFailedOrders, setTotalFailedOrders] = useState("0")
  const [orderCounter, setOrderCounter] = useState("0")

  const {
    data: volumeData,
    isLoading: isLoadingVolume,
    error: errorVolume,
    refetch: refetchVolume,
  } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getTotalVolume",
  })

  const {
    data: successfulOrdersData,
    isLoading: isLoadingSuccessful,
    error: errorSuccessful,
    refetch: refetchSuccessful,
  } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getTotalSuccessfulOrders",
  })

  const {
    data: failedOrdersData,
    isLoading: isLoadingFailed,
    error: errorFailed,
    refetch: refetchFailed,
  } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getTotalFailedOrders",
  })

  const {
    data: orderCounterData,
    isLoading: isLoadingCounter,
    error: errorCounter,
    refetch: refetchCounter,
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

  const handleRefetchAll = () => {
    refetchVolume()
    refetchSuccessful()
    refetchFailed()
    refetchCounter()
    toast.info("Refreshing dashboard data...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paycrypt Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your Paycrypt smart contract performance, payment processing metrics, and system health.
          </p>
        </div>
        <Button onClick={handleRefetchAll} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh All
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoadingVolume ? "Loading..." : totalVolume}</div>
            <p className="text-xs text-muted-foreground">Total value processed</p>
            <Button variant="ghost" size="sm" onClick={() => refetchVolume()} className="mt-2">
              <RefreshCw className="h-3 w-3 mr-1" /> Refetch
            </Button>
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
            <Button variant="ghost" size="sm" onClick={() => refetchSuccessful()} className="mt-2">
              <RefreshCw className="h-3 w-3 mr-1" /> Refetch
            </Button>
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
            <Button variant="ghost" size="sm" onClick={() => refetchFailed()} className="mt-2">
              <RefreshCw className="h-3 w-3 mr-1" /> Refetch
            </Button>
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
            <Button variant="ghost" size="sm" onClick={() => refetchCounter()} className="mt-2">
              <RefreshCw className="h-3 w-3 mr-1" /> Refetch
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Network Support:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Base Network
                  </span>
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Polygon
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                    Ethereum
                  </span>
                </div>
              </div>
              <div>
                <span className="font-medium">System Status:</span>
                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  Operational
                </span>
              </div>
              <div>
                <span className="font-medium">Last Updated:</span>
                <span className="ml-2 text-sm text-muted-foreground">{new Date().toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardHomeContentComponent />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
