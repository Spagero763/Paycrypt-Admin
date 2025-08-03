import { DashboardLayout } from "@/components/dashboard-layout"
import { AdminControls } from "@/components/admin-controls"
import { ProtectedRoute } from "@/components/protected-route"

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <AdminControls />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
