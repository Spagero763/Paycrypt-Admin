"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCwIcon } from "lucide-react"
import { useState } from "react"

export function UserManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchUsers = async () => {
    setIsLoading(true)
    // Simulate fetching user data from a smart contract or API
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setUsers([
      { address: "0xabc...123", role: "Admin", balance: "10 ETH" },
      { address: "0xdef...456", role: "User", balance: "0.5 ETH" },
    ])
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">User Management</CardTitle>
        <Button variant="ghost" size="icon" onClick={fetchUsers} disabled={isLoading}>
          <RefreshCwIcon className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          <span className="sr-only">Refresh Users</span>
        </Button>
      </CardHeader>
      <CardContent>
        <CardDescription>Manage and view users interacting with your contract.</CardDescription>
        {isLoading ? (
          <div className="text-center py-4">Loading users...</div>
        ) : users.length > 0 ? (
          <div className="mt-4 space-y-2">
            {users.map((user) => (
              <div key={user.address} className="flex justify-between items-center p-2 border rounded-md">
                <div>
                  <p className="font-semibold">Address: {user.address}</p>
                  <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                </div>
                <div className="text-right">
                  <p>Balance: {user.balance}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">No users found.</div>
        )}
      </CardContent>
    </Card>
  )
}
