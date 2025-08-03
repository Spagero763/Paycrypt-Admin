"use client"

import React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "@/hooks/use-toast"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"

export default function OrderManagement() {
  const [transactionHash, setTransactionHash] = useState("")
  const [decodedOrderId, setDecodedOrderId] = useState<string | null>(null)
  const [isDecoding, setIsDecoding] = useState(false)

  const { writeContract: writeMarkSuccessful, data: hashMarkSuccessful } = useWriteContract()
  const { writeContract: writeMarkFailed, data: hashMarkFailed } = useWriteContract()

  const { isLoading: isConfirmingSuccessful, isSuccess: isConfirmedSuccessful } = useWaitForTransactionReceipt({
    hash: hashMarkSuccessful,
  })

  const { isLoading: isConfirmingFailed, isSuccess: isConfirmedFailed } = useWaitForTransactionReceipt({
    hash: hashMarkFailed,
  })

  const handleDecodeTransaction = async () => {
    if (!transactionHash) {
      toast({
        title: "Error",
        description: "Please enter a transaction hash.",
        variant: "destructive",
      })
      return
    }

    setIsDecoding(true)
    setDecodedOrderId(null)

    try {
      const response = await fetch("/api/decode-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionHash, abi: CONTRACT_ABI }),
      })

      const data = await response.json()

      if (response.ok && data.orderId) {
        setDecodedOrderId(data.orderId)
        toast({
          title: "Success",
          description: `Transaction decoded. Order ID: ${data.orderId}`,
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to decode transaction.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error decoding transaction:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while decoding the transaction.",
        variant: "destructive",
      })
    } finally {
      setIsDecoding(false)
    }
  }

  const handleMarkOrderSuccessful = () => {
    if (!decodedOrderId) {
      toast({
        title: "Error",
        description: "Please decode a transaction to get an Order ID first.",
        variant: "destructive",
      })
      return
    }
    writeMarkSuccessful({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "markOrderSuccessful",
      args: [BigInt(decodedOrderId)],
    })
  }

  const handleMarkOrderFailed = () => {
    if (!decodedOrderId) {
      toast({
        title: "Error",
        description: "Please decode a transaction to get an Order ID first.",
        variant: "destructive",
      })
      return
    }
    writeMarkFailed({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "markOrderFailed",
      args: [BigInt(decodedOrderId)],
    })
  }

  React.useEffect(() => {
    if (isConfirmedSuccessful) {
      toast({
        title: "Order Marked Successful",
        description: `Transaction hash: ${hashMarkSuccessful}`,
      })
      setDecodedOrderId(null)
      setTransactionHash("")
    }
  }, [isConfirmedSuccessful, hashMarkSuccessful])

  React.useEffect(() => {
    if (isConfirmedFailed) {
      toast({
        title: "Order Marked Failed",
        description: `Transaction hash: ${hashMarkFailed}`,
      })
      setDecodedOrderId(null)
      setTransactionHash("")
    }
  }, [isConfirmedFailed, hashMarkFailed])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="transactionHash">Transaction Hash</Label>
          <Input
            id="transactionHash"
            placeholder="0x..."
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
          />
          <Button onClick={handleDecodeTransaction} disabled={isDecoding}>
            {isDecoding ? "Decoding..." : "Decode Transaction"}
          </Button>
        </div>
        {decodedOrderId && (
          <div className="grid gap-2">
            <p className="text-sm font-medium">Decoded Order ID: {decodedOrderId}</p>
            <div className="flex gap-2">
              <Button onClick={handleMarkOrderSuccessful} disabled={isConfirmingSuccessful || isConfirmingFailed}>
                {isConfirmingSuccessful ? "Confirming..." : "Mark Successful"}
              </Button>
              <Button
                onClick={handleMarkOrderFailed}
                variant="destructive"
                disabled={isConfirmingSuccessful || isConfirmingFailed}
              >
                {isConfirmingFailed ? "Confirming..." : "Mark Failed"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
