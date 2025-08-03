import { DashboardLayout } from "@/components/dashboard-layout"
import { OrderManagement } from "@/components/order-management"
import { ProtectedRoute } from "@/components/protected-route"

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <OrderManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
