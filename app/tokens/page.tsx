"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { TokenManagement } from "@/components/token-management"

export default function TokensPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <TokenManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
