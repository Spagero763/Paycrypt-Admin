"use client"

import React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "@/hooks/use-toast"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"

export function TokenManagement() {
  const [mintAmount, setMintAmount] = useState("")
  const [transferRecipient, setTransferRecipient] = useState("")
  const [transferAmount, setTransferAmount] = useState("")

  // Read total supply
  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "totalSupply",
  })

  // Write contract for minting
  const { writeContract: writeMint, data: mintHash } = useWriteContract()
  const { isLoading: isMinting, isSuccess: isMintConfirmed } = useWaitForTransactionReceipt({
    hash: mintHash,
  })

  // Write contract for transferring
  const { writeContract: writeTransfer, data: transferHash } = useWriteContract()
  const { isLoading: isTransferring, isSuccess: isTransferConfirmed } = useWaitForTransactionReceipt({
    hash: transferHash,
  })

  const handleMint = () => {
    if (!mintAmount || isNaN(Number(mintAmount)) || Number(mintAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount to mint.",
        variant: "destructive",
      })
      return
    }
    writeMint({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "mint",
      args: [BigInt(mintAmount)],
    })
  }

  const handleTransfer = () => {
    if (!transferRecipient || !transferAmount || isNaN(Number(transferAmount)) || Number(transferAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid recipient and amount to transfer.",
        variant: "destructive",
      })
      return
    }
    writeTransfer({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "transfer",
      args: [transferRecipient as `0x${string}`, BigInt(transferAmount)],
    })
  }

  React.useEffect(() => {
    if (isMintConfirmed) {
      toast({
        title: "Mint Successful",
        description: `Minted ${mintAmount} tokens. Transaction hash: ${mintHash}`,
      })
      setMintAmount("")
      refetchTotalSupply()
    }
  }, [isMintConfirmed, mintHash, mintAmount, refetchTotalSupply])

  React.useEffect(() => {
    if (isTransferConfirmed) {
      toast({
        title: "Transfer Successful",
        description: `Transferred ${transferAmount} tokens to ${transferRecipient}. Transaction hash: ${transferHash}`,
      })
      setTransferRecipient("")
      setTransferAmount("")
      refetchTotalSupply() // Assuming transfer affects total supply or balance displayed
    }
  }, [isTransferConfirmed, transferHash, transferAmount, transferRecipient, refetchTotalSupply])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Token Management</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label>Total Supply</Label>
          <p className="text-lg font-semibold">{totalSupply?.toString() || "Loading..."}</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="mintAmount">Mint Tokens</Label>
          <Input
            id="mintAmount"
            type="number"
            placeholder="Amount to mint"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
          />
          <Button onClick={handleMint} disabled={isMinting}>
            {isMinting ? "Minting..." : "Mint"}
          </Button>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="transferRecipient">Transfer Tokens</Label>
          <Input
            id="transferRecipient"
            placeholder="Recipient Address (0x...)"
            value={transferRecipient}
            onChange={(e) => setTransferRecipient(e.target.value)}
          />
          <Input
            id="transferAmount"
            type="number"
            placeholder="Amount to transfer"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
          <Button onClick={handleTransfer} disabled={isTransferring}>
            {isTransferring ? "Transferring..." : "Transfer"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
