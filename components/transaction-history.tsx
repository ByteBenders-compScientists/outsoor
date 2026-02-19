"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpCircle, ArrowDownCircle, Search, Receipt } from "lucide-react"

interface Transaction {
  id: number
  type: "topup" | "usage" | "refund"
  amount: number
  description: string
  status: "pending" | "completed" | "failed" | "cancelled"
  created_at: string
  reference_id?: string
}

interface TransactionHistoryProps {
  transactions?: Transaction[]
}

export function TransactionHistory({ transactions = [] }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

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

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "topup":
        return <ArrowUpCircle className="h-4 w-4 text-[#00ff88]" />
      case "usage":
        return <ArrowDownCircle className="h-4 w-4 text-[#ff0040]" />
      case "refund":
        return <ArrowUpCircle className="h-4 w-4 text-[#0080ff]" />
      default:
        return <Receipt className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
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

  // Safe filtering with fallback to empty array
  const safeTransactions = transactions || []
  const filteredTransactions = safeTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference_id?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Transaction History</CardTitle>
        <CardDescription>View all your account transactions and payments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[140px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="topup">Top-ups</SelectItem>
              <SelectItem value="usage">Usage</SelectItem>
              <SelectItem value="refund">Refunds</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[140px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-400">{formatDate(transaction.created_at)}</p>
                      {transaction.reference_id && (
                        <>
                          <span className="text-gray-600">•</span>
                          <p className="text-sm text-gray-500 font-mono">{transaction.reference_id.slice(-8)}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(transaction.status)}
                  <div className="text-right">
                    <p className={`font-medium ${transaction.type === "topup" ? "text-[#00ff88]" : "text-[#ff0040]"}`}>
                      {transaction.type === "topup" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No transactions found</p>
              {(searchTerm || filterType !== "all" || filterStatus !== "all") && (
                <Button
                  variant="link"
                  className="text-[#00ff88] p-0 h-auto mt-2"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterType("all")
                    setFilterStatus("all")
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
