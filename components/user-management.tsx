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

export function UserManagement() {
  const [userAddress, setUserAddress] = useState("")
  const [roleToSet, setRoleToSet] = useState("")

  // Read user role
  const { data: userRole, refetch: refetchUserRole } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getUserRole",
    args: [userAddress as `0x${string}`],
    query: {
      enabled: userAddress.length === 42, // Only fetch if address is valid
    },
  })

  // Write contract for setting role
  const { writeContract: writeSetRole, data: setRoleHash } = useWriteContract()
  const { isLoading: isSettingRole, isSuccess: isSetRoleConfirmed } = useWaitForTransactionReceipt({
    hash: setRoleHash,
  })

  const handleSetUserRole = () => {
    if (!userAddress || userAddress.length !== 42) {
      toast({
        title: "Error",
        description: "Please enter a valid Ethereum address.",
        variant: "destructive",
      })
      return
    }
    if (!roleToSet) {
      toast({
        title: "Error",
        description: "Please enter a role to set.",
        variant: "destructive",
      })
      return
    }
    writeSetRole({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "setUserRole",
      args: [userAddress as `0x${string}`, roleToSet],
    })
  }

  React.useEffect(() => {
    if (isSetRoleConfirmed) {
      toast({
        title: "User Role Updated",
        description: `Role for ${userAddress} set to ${roleToSet}. Transaction hash: ${setRoleHash}`,
      })
      setUserAddress("")
      setRoleToSet("")
      refetchUserRole()
    }
  }, [isSetRoleConfirmed, setRoleHash, userAddress, roleToSet, refetchUserRole])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="userAddress">User Address</Label>
          <Input
            id="userAddress"
            placeholder="0x..."
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            onBlur={() => userAddress.length === 42 && refetchUserRole()}
          />
          {userAddress.length === 42 && (
            <p className="text-sm font-medium">Current Role: {userRole ? userRole : "Loading..."}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="roleToSet">Set User Role</Label>
          <Input
            id="roleToSet"
            placeholder="e.g., admin, user, moderator"
            value={roleToSet}
            onChange={(e) => setRoleToSet(e.target.value)}
          />
          <Button onClick={handleSetUserRole} disabled={isSettingRole}>
            {isSettingRole ? "Setting Role..." : "Set Role"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
