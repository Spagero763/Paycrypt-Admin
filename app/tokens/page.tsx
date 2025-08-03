import { DashboardLayout } from "@/components/dashboard-layout"
import { TokenManagement } from "@/components/token-management"

export default function TokensPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Token Management</h2>
        <TokenManagement />
      </div>
    </DashboardLayout>
  )
}
