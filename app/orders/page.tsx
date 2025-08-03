"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { parseAbiItem } from "viem"

export default function OrderManagement() {
  const [txHash, setTxHash] = useState("")
  const [orderId, setOrderId] = useState<string | null>(null)
  const [decodedFunction, setDecodedFunction] = useState<any>(null)

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

  const handleDecodeTx = async () => {
    if (!txHash) {
      toast.error("Please enter a transaction hash.")
      return
    }
    try {
      // This is a placeholder for actual transaction decoding.
      // In a real app, you'd fetch the transaction details and then decode its input.
      // For now, we'll simulate decoding based on common function signatures.
      // You would typically use a library like viem's decodeFunctionData with the full ABI.

      // Example: Simulate decoding for createOrder
      const simulatedAbiItem = parseAbiItem(
        "function createOrder(bytes32 requestId, address tokenAddress, uint256 amount)",
      )
      const simulatedInputData = "0x..." // Replace with actual input data from the transaction

      // This part would require fetching the transaction from a blockchain RPC
      // and then using viem's decodeFunctionData with the full CONTRACT_ABI
      // For demonstration, we'll just extract a dummy order ID.
      const dummyOrderId = Math.floor(Math.random() * 100000).toString()
      setOrderId(dummyOrderId)
      setDecodedFunction({
        name: "createOrder",
        args: [`0x${Math.random().toString(16).slice(2, 34)}`, "0x...", "1000000000000000000"],
      })
      toast.success(`Simulated decode: Order ID ${dummyOrderId}`)
    } catch (error: any) {
      console.error("Decoding error:", error)
      toast.error(`Failed to decode transaction: ${error.message}`)
      setOrderId(null)
      setDecodedFunction(null)
    }
  }

  const callContractFunction = (functionName: string) => {
    if (!orderId) {
      toast.error("Please decode a transaction first to get an Order ID.")
      return
    }
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: functionName as any, // Type assertion for simplicity, ensure functionName is valid
      args: [BigInt(orderId)],
    })
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Decode Transaction Input</CardTitle>
          <CardDescription>Paste a transaction hash to extract the Order ID or Request ID.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="txHash">Transaction Hash</Label>
            <Input id="txHash" placeholder="0x..." value={txHash} onChange={(e) => setTxHash(e.target.value)} />
          </div>
          <Button onClick={handleDecodeTx}>Decode Transaction</Button>
          {orderId && (
            <div className="mt-4 space-y-2">
              <p className="font-medium">Decoded Order ID: {orderId}</p>
              {decodedFunction && (
                <p className="text-sm text-muted-foreground">
                  Function: {decodedFunction.name} (Args: {JSON.stringify(decodedFunction.args)})
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Orders</CardTitle>
          <CardDescription>Mark orders as successful or failed, or refund them.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Button
              onClick={() => callContractFunction("markOrderSuccessful")}
              disabled={!orderId || isWritePending || isConfirming}
            >
              Mark Successful
            </Button>
            <Button
              onClick={() => callContractFunction("markOrderFailed")}
              disabled={!orderId || isWritePending || isConfirming}
              variant="destructive"
            >
              Mark Failed
            </Button>
            {/* Refund function is not directly in ABI, assuming it's part of markOrderFailed or a separate admin function */}
            <Button disabled={true} variant="secondary">
              Refund Order (Not in ABI)
            </Button>
          </div>
          {(isWritePending || isConfirming) && (
            <p className="text-sm text-muted-foreground">
              {isWritePending ? "Sending transaction..." : "Confirming transaction..."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
