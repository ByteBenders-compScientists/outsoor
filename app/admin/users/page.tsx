import { getUsers } from "@/app/actions/admin"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AdminUserTopUpDialog } from "@/components/admin-user-topup-dialog"
import { AdminUserDeductDialog } from "@/components/admin-user-deduct-dialog"

export default async function AdminUsersPage() {
  const users = await getUsers()

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Users</h1>

      <div className="rounded-md border border-[#2d2d32] bg-[#1a1b1f]">
        <Table>
          <TableHeader>
            <TableRow className="border-[#2d2d32] hover:bg-[#2d2d32]/50">
              <TableHead className="text-[#9ca3af]">Name</TableHead>
              <TableHead className="text-[#9ca3af]">Email</TableHead>
              <TableHead className="text-[#9ca3af]">Role</TableHead>
              <TableHead className="text-[#9ca3af]">Balance</TableHead>
              <TableHead className="text-[#9ca3af]">Created At</TableHead>
              <TableHead className="text-[#9ca3af] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-[#2d2d32] hover:bg-[#2d2d32]/50 text-[#d1d5db]">
                <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className={user.role === 'admin' ? "bg-[#8C5CF7]" : "bg-[#2d2d32]"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>${user.balance.toFixed(2)}</TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <AdminUserTopUpDialog userId={user.id} userEmail={user.email} currentBalance={user.balance} />
                    <AdminUserDeductDialog userId={user.id} userEmail={user.email} currentBalance={user.balance} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
