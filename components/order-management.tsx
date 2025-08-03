"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCwIcon } from "lucide-react"
import { useState } from "react"

export function OrderManagement() {
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchOrders = async () => {
    setIsLoading(true)
    // Simulate fetching orders from a smart contract or API
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setOrders([
      { id: "001", buyer: "0xabc...123", amount: "100 USDC", status: "Completed" },
      { id: "002", buyer: "0xdef...456", amount: "50 ETH", status: "Pending" },
    ])
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Order Management</CardTitle>
        <Button variant="ghost" size="icon" onClick={fetchOrders} disabled={isLoading}>
          <RefreshCwIcon className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          <span className="sr-only">Refresh Orders</span>
        </Button>
      </CardHeader>
      <CardContent>
        <CardDescription>Manage and view all orders on your contract.</CardDescription>
        {isLoading ? (
          <div className="text-center py-4">Loading orders...</div>
        ) : orders.length > 0 ? (
          <div className="mt-4 space-y-2">
            {orders.map((order) => (
              <div key={order.id} className="flex justify-between items-center p-2 border rounded-md">
                <div>
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <p className="text-sm text-muted-foreground">Buyer: {order.buyer}</p>
                </div>
                <div className="text-right">
                  <p>{order.amount}</p>
                  <p className={`text-sm ${order.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">No orders found.</div>
        )}
      </CardContent>
    </Card>
  )
}
