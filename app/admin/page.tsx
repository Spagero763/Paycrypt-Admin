"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { AdminControls } from "@/components/admin-controls"

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <AdminControls />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
