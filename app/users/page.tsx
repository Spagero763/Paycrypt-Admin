"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { UserManagement } from "@/components/user-management"

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <UserManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
