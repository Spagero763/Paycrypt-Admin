"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function AdminControls() {
  const [adminAddress, setAdminAddress] = useState("")
  const [devWalletAddress, setDevWalletAddress] = useState("")
  const [emergencyWithdrawTokenAddress, setEmergencyWithdrawTokenAddress] = useState("")
  const [emergencyWithdrawAmount, setEmergencyWithdrawAmount] = useState("")

  const { writeContract: addAdmin, data: hashAddAdmin, isPending: isAddingAdmin } = useWriteContract()
  const { writeContract: removeAdmin, data: hashRemoveAdmin, isPending: isRemovingAdmin } = useWriteContract()
  const { writeContract: setDevWallet, data: hashSetDevWallet, isPending: isSettingDevWallet } = useWriteContract()
  const {
    writeContract: emergencyWithdraw,
    data: hashEmergencyWithdraw,
    isPending: isEmergencyWithdrawing,
  } = useWriteContract()
  const { writeContract: pauseContract, data: hashPause, isPending: isPausing } = useWriteContract()
  const { writeContract: unpauseContract, data: hashUnpause, isPending: isUnpausing } = useWriteContract()

  const { data: pausedStatus, isLoading: isLoadingPausedStatus } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "paused",
  })

  const { isLoading: isLoadingAddAdminTx, isSuccess: isAddAdminConfirmed } = useWaitForTransactionReceipt({
    hash: hashAddAdmin,
  })
  const { isLoading: isLoadingRemoveAdminTx, isSuccess: isRemoveAdminConfirmed } = useWaitForTransactionReceipt({
    hash: hashRemoveAdmin,
  })
  const { isLoading: isLoadingSetDevWalletTx, isSuccess: isSetDevWalletConfirmed } = useWaitForTransactionReceipt({
    hash: hashSetDevWallet,
  })
  const { isLoading: isLoadingEmergencyWithdrawTx, isSuccess: isEmergencyWithdrawConfirmed } =
    useWaitForTransactionReceipt({
      hash: hashEmergencyWithdraw,
    })
  const { isLoading: isLoadingPauseTx, isSuccess: isPauseConfirmed } = useWaitForTransactionReceipt({
    hash: hashPause,
  })
  const { isLoading: isLoadingUnpauseTx, isSuccess: isUnpauseConfirmed } = useWaitForTransactionReceipt({
    hash: hashUnpause,
  })

  const handleAddAdmin = () => {
    if (!adminAddress) {
      toast.error("Please enter an admin address.")
      return
    }
    addAdmin({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "addAdmin",
      args: [adminAddress as `0x${string}`],
    })
  }

  const handleRemoveAdmin = () => {
    if (!adminAddress) {
      toast.error("Please enter an admin address.")
      return
    }
    removeAdmin({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "removeAdmin",
      args: [adminAddress as `0x${string}`],
    })
  }

  const handleSetDevWallet = () => {
    if (!devWalletAddress) {
      toast.error("Please enter a new dev wallet address.")
      return
    }
    setDevWallet({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "setDevWallet",
      args: [devWalletAddress as `0x${string}`],
    })
  }

  const handleEmergencyWithdraw = () => {
    if (!emergencyWithdrawTokenAddress || !emergencyWithdrawAmount) {
      toast.error("Please enter token address and amount for emergency withdrawal.")
      return
    }
    // Assuming 18 decimals for the amount for simplicity, adjust if needed
    emergencyWithdraw({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "emergencyWithdrawToken",
      args: [emergencyWithdrawTokenAddress as `0x${string}`, BigInt(emergencyWithdrawAmount)],
    })
  }

  const handlePauseContract = () => {
    pauseContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "pause",
      args: [],
    })
  }

  const handleUnpauseContract = () => {
    unpauseContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "unpause",
      args: [],
    })
  }

  useEffect(() => {
    if (isAddAdminConfirmed) {
      toast.success("Admin added successfully!", { description: `Tx Hash: ${hashAddAdmin}` })
      setAdminAddress("")
    }
    if (isRemoveAdminConfirmed) {
      toast.success("Admin removed successfully!", { description: `Tx Hash: ${hashRemoveAdmin}` })
      setAdminAddress("")
    }
    if (isSetDevWalletConfirmed) {
      toast.success("Dev wallet updated!", { description: `Tx Hash: ${hashSetDevWallet}` })
      setDevWalletAddress("")
    }
    if (isEmergencyWithdrawConfirmed) {
      toast.success("Emergency withdrawal successful!", { description: `Tx Hash: ${hashEmergencyWithdraw}` })
      setEmergencyWithdrawTokenAddress("")
      setEmergencyWithdrawAmount("")
    }
    if (isPauseConfirmed) {
      toast.success("Contract paused!", { description: `Tx Hash: ${hashPause}` })
    }
    if (isUnpauseConfirmed) {
      toast.success("Contract unpaused!", { description: `Tx Hash: ${hashUnpause}` })
    }
  }, [
    isAddAdminConfirmed,
    isRemoveAdminConfirmed,
    isSetDevWalletConfirmed,
    isEmergencyWithdrawConfirmed,
    isPauseConfirmed,
    isUnpauseConfirmed,
    hashAddAdmin,
    hashRemoveAdmin,
    hashSetDevWallet,
    hashEmergencyWithdraw,
    hashPause,
    hashUnpause,
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Controls</CardTitle>
        <CardDescription>Manage contract administrators, dev wallet, and emergency functions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Admin Management */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Admin Management</h3>
          <Label htmlFor="adminAddress">Admin Address</Label>
          <Input
            id="adminAddress"
            placeholder="0x..."
            value={adminAddress}
            onChange={(e) => setAdminAddress(e.target.value)}
          />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button onClick={handleAddAdmin} disabled={isAddingAdmin || isLoadingAddAdminTx}>
              {isAddingAdmin || isLoadingAddAdminTx ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Add Admin
            </Button>
            <Button onClick={handleRemoveAdmin} disabled={isRemovingAdmin || isLoadingRemoveAdminTx}>
              {isRemovingAdmin || isLoadingRemoveAdminTx ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Remove Admin
            </Button>
          </div>
        </div>

        <Separator />

        {/* Dev Wallet Management */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Set Dev Wallet</h3>
          <Label htmlFor="devWalletAddress">New Dev Wallet Address</Label>
          <Input
            id="devWalletAddress"
            placeholder="0x..."
            value={devWalletAddress}
            onChange={(e) => setDevWalletAddress(e.target.value)}
          />
          <Button
            onClick={handleSetDevWallet}
            disabled={isSettingDevWallet || isLoadingSetDevWalletTx}
            className="w-full"
          >
            {isSettingDevWallet || isLoadingSetDevWalletTx ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Set Dev Wallet
          </Button>
        </div>

        <Separator />

        {/* Emergency Controls */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Emergency Controls</h3>
          <div className="flex items-center justify-between">
            <p>Contract Status: {isLoadingPausedStatus ? "Loading..." : pausedStatus ? "Paused" : "Active"}</p>
            <div className="flex gap-2">
              <Button onClick={handlePauseContract} disabled={isPausing || isLoadingPauseTx || pausedStatus}>
                {isPausing || isLoadingPauseTx ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Pause
              </Button>
              <Button onClick={handleUnpauseContract} disabled={isUnpausing || isLoadingUnpauseTx || !pausedStatus}>
                {isUnpausing || isLoadingUnpauseTx ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Unpause
              </Button>
            </div>
          </div>
          <Label htmlFor="emergencyWithdrawTokenAddress">Token Address for Emergency Withdraw</Label>
          <Input
            id="emergencyWithdrawTokenAddress"
            placeholder="0x..."
            value={emergencyWithdrawTokenAddress}
            onChange={(e) => setEmergencyWithdrawTokenAddress(e.target.value)}
          />
          <Label htmlFor="emergencyWithdrawAmount">Amount (in token units)</Label>
          <Input
            id="emergencyWithdrawAmount"
            type="number"
            placeholder="e.g., 1000"
            value={emergencyWithdrawAmount}
            onChange={(e) => setEmergencyWithdrawAmount(e.target.value)}
          />
          <Button
            onClick={handleEmergencyWithdraw}
            disabled={isEmergencyWithdrawing || isLoadingEmergencyWithdrawTx}
            className="w-full"
          >
            {isEmergencyWithdrawing || isLoadingEmergencyWithdrawTx ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Emergency Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
