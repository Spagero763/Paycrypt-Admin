"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"
import DashboardLayout from "@/components/dashboard-layout"
import OrderManagement from "@/components/order-management"

export default function OrdersPage() {
  const [transactionHash, setTransactionHash] = useState("")
  const [decodedData, setDecodedData] = useState<any>(null)
  const [orderId, setOrderId] = useState("")
  const { toast } = useToast()

  const { writeContract, data: hash, isPending: isWritePending, error: writeError } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
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

    try {
      const response = await fetch("/api/decode-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionHash }),
      })
      const data = await response.json()
      if (response.ok) {
        setDecodedData(data)
        // Attempt to extract orderId from decoded function or event
        if (data.decodedFunction && data.decodedFunction.args && data.decodedFunction.args[0] !== undefined) {
          setOrderId(data.decodedFunction.args[0].toString())
        } else if (data.decodedEvents && data.decodedEvents.length > 0) {
          const orderEvent = data.decodedEvents.find(
            (event: any) =>
              event.eventName === "OrderCreated" ||
              event.eventName === "OrderSuccessful" ||
              event.eventName === "OrderFailed",
          )
          if (orderEvent && orderEvent.args && orderEvent.args.orderId !== undefined) {
            setOrderId(orderEvent.args.orderId.toString())
          }
        } else {
          setOrderId("") // Clear if no orderId found
        }
        toast({
          title: "Success",
          description: "Transaction decoded successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to decode transaction.",
          variant: "destructive",
        })
        setDecodedData(null)
        setOrderId("")
      }
    } catch (error) {
      console.error("Error decoding transaction:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while decoding.",
        variant: "destructive",
      })
      setDecodedData(null)
      setOrderId("")
    }
  }

  const handleMarkOrderSuccessful = () => {
    if (!orderId) {
      toast({
        title: "Error",
        description: "Please decode a transaction to get an Order ID first.",
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

  const handleMarkOrderFailed = () => {
    if (!orderId) {
      toast({
        title: "Error",
        description: "Please decode a transaction to get an Order ID first.",
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

  const handleRefundOrder = () => {
    // Assuming refundOrder is a function in your contract that takes orderId
    // Note: Your provided ABI does not have a refundOrder function.
    // This is a placeholder for if you add it.
    if (!orderId) {
      toast({
        title: "Error",
        description: "Please decode a transaction to get an Order ID first.",
        variant: "destructive",
      })
      return
    }
    // Example if refundOrder existed:
    // writeContract({
    //   address: CONTRACT_ADDRESS,
    //   abi: CONTRACT_ABI,
    //   functionName: "refundOrder",
    //   args: [BigInt(orderId)],
    // });
    toast({
      title: "Info",
      description: "Refund Order function not available in current ABI.",
    })
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Order Management</h2>
        <OrderManagement />
      </div>
    </DashboardLayout>
  )
}
