import { DashboardLayout } from "@/components/dashboard-layout"
import { AdminControls } from "@/components/admin-controls"

export default function AdminPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Admin Controls</h2>
        <AdminControls />
      </div>
    </DashboardLayout>
  )
}
