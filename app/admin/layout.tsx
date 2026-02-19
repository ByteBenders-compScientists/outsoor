import { getCurrentUser } from "@/lib/auth"
import { AdminLayoutClient } from "./admin-layout-client"
import { AdminLoginForm } from "@/components/admin-login-form"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user || user.role !== 'admin') {
    return <AdminLoginForm />
  }

  return (
    <AdminLayoutClient user={user}>
      {children}
    </AdminLayoutClient>
  )
}
