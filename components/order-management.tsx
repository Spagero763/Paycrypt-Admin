"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"

export function OrderManagement() {
  const [txHash, setTxHash] = useState("")
  const [orderId, setOrderId] = useState("")
  const [decodedData, setDecodedData] = useState("")
  const { toast } = useToast()

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const decodeTxHash = async () => {
    if (!txHash) {
      toast({
        title: "Error",
        description: "Please enter a transaction hash",
        variant: "destructive",
      })
      return
    }

    try {
      // This is a simplified example - in reality you'd need to fetch the transaction
      // and decode the input data to extract the order ID
      const response = await fetch(`/api/decode-transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txHash }),
      })

      if (response.ok) {
        const data = await response.json()
        setDecodedData(JSON.stringify(data, null, 2))
        if (data.orderId) {
          setOrderId(data.orderId.toString())
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decode transaction",
        variant: "destructive",
      })
    }
  }

  const markOrderSuccessful = () => {
    if (!orderId) {
      toast({
        title: "Error",
        description: "Please enter an order ID",
        variant: "destructive",
      })
      return
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "markOrderSuccessful",
      args: [BigInt(orderId)],
    })
  }

  const markOrderFailed = () => {
    if (!orderId) {
      toast({
        title: "Error",
        description: "Please enter an order ID",
        variant: "destructive",
      })
      return
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "markOrderFailed",
      args: [BigInt(orderId)],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Order Management</h1>
        <p className="text-muted-foreground">
          Manage Paycrypt payment orders, decode transaction data, and update order statuses.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Decoder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="txHash">Transaction Hash</Label>
              <Input id="txHash" placeholder="0x..." value={txHash} onChange={(e) => setTxHash(e.target.value)} />
            </div>
            <Button onClick={decodeTxHash} className="w-full">
              Decode Transaction
            </Button>
            {decodedData && (
              <div>
                <Label>Decoded Data</Label>
                <Textarea value={decodedData} readOnly className="h-32 font-mono text-sm" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="orderId">Order ID</Label>
              <Input
                id="orderId"
                placeholder="Enter order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Button onClick={markOrderSuccessful} disabled={isPending || isConfirming} className="w-full">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Successful
              </Button>
              <Button
                onClick={markOrderFailed}
                disabled={isPending || isConfirming}
                variant="destructive"
                className="w-full"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Mark Failed
              </Button>
            </div>
            {(isPending || isConfirming) && (
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                {isPending ? "Confirming..." : "Processing..."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
