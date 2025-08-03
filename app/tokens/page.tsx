import { DashboardLayout } from "@/components/dashboard-layout"
import { TokenManagement } from "@/components/token-management"
import { ProtectedRoute } from "@/components/protected-route"

export default function TokensPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <TokenManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
