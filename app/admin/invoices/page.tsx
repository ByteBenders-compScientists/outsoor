import { getTransactions, AdminTransaction } from "@/app/actions/admin"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Receipt,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function AdminInvoicesPage() {
  const transactions = await getTransactions()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTypeBadge = (type: AdminTransaction["type"]) => {
    switch (type) {
      case "topup":
        return <Badge className="bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20">Top-up</Badge>
      case "usage":
        return <Badge className="bg-[#ff0040]/10 text-[#ff0040] border-[#ff0040]/20">Usage</Badge>
      case "refund":
        return <Badge className="bg-[#0080ff]/10 text-[#0080ff] border-[#0080ff]/20">Refund</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const getStatusBadge = (status: AdminTransaction["status"]) => {
    const statusConfig = {
      completed: { color: "bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20", label: "Completed" },
      pending: { color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", label: "Pending" },
      failed: { color: "bg-[#ff0040]/10 text-[#ff0040] border-[#ff0040]/20", label: "Failed" },
      cancelled: { color: "bg-gray-500/10 text-gray-500 border-gray-500/20", label: "Cancelled" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed

    return (
      <Badge variant="outline" className={config.color}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Invoices & Receipts</h1>

      <div className="rounded-md border border-[#2d2d32] bg-[#1a1b1f]">
        <Table>
          <TableHeader>
            <TableRow className="border-[#2d2d32] hover:bg-[#2d2d32]/50">
              <TableHead className="text-[#9ca3af]">Date</TableHead>
              <TableHead className="text-[#9ca3af]">User</TableHead>
              <TableHead className="text-[#9ca3af]">Type</TableHead>
              <TableHead className="text-[#9ca3af]">Amount</TableHead>
              <TableHead className="text-[#9ca3af]">Status</TableHead>
              <TableHead className="text-[#9ca3af]">Reference</TableHead>
              <TableHead className="text-[#9ca3af]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-[#2d2d32] hover:bg-[#2d2d32]/50 text-[#d1d5db]">
                  <TableCell>{formatDate(transaction.created_at)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{transaction.user_name || 'N/A'}</div>
                    <div className="text-xs text-[#9ca3af]">{transaction.user_email}</div>
                  </TableCell>
                  <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell className={
                    transaction.type === "topup"
                      ? "text-[#00ff88]"
                      : "text-[#ff0040]"
                  }>
                    {transaction.type === "topup" ? "+" : "-"}{formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="font-mono text-xs">{transaction.reference_id ? transaction.reference_id.slice(-8) : 'N/A'}</TableCell>
                  <TableCell>
                    <Link href={`/admin/invoices/${transaction.id}`}>
                      <Button variant="outline" size="sm">
                        <Receipt className="w-4 h-4 mr-2" /> View Invoice
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-[#9ca3af]">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
