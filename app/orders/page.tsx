"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { OrderManagement } from "@/components/order-management"

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <OrderManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
