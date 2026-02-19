"use client"

import { useState, useTransition } from "react"
import { adminDeductUserCreditsAction } from "@/app/actions/admin"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AdminUserDeductDialogProps {
  userId: string
  userEmail: string
  currentBalance: number
}

export function AdminUserDeductDialog({ userId, userEmail, currentBalance }: AdminUserDeductDialogProps) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(1)
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (formData: FormData) => {
    setError(null)
    setSuccess(null)

    startTransition(async () => {
      const result = await adminDeductUserCreditsAction(formData)
      if (!result.success) {
        setError(result.error || "Failed to deduct credits")
        return
      }
      setSuccess(result.message || "Credits deducted successfully")
      // Give a short delay so admin can see success then close & refresh
      setTimeout(() => {
        setOpen(false)
        if (typeof window !== "undefined") {
          window.location.reload()
        }
      }, 800)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size="sm"
        variant="outline"
        className="border-[#2d2d32] text-xs text-[#e5e7eb] hover:bg-[#2d2d32]"
        onClick={() => setOpen(true)}
      >
        Deduct credits
      </Button>
      <DialogContent className="bg-[#1a1b1f] border-[#2d2d32]">
        <DialogHeader>
          <DialogTitle className="text-white text-base">Deduct credits from user</DialogTitle>
          <DialogDescription className="text-xs text-[#9ca3af]">
            User: <span className="font-mono">{userEmail}</span>. Current balance: ${currentBalance.toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="userId" value={userId} />

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-xs text-[#e5e7eb]">
              Amount (USD)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280] text-sm">$</span>
              <Input
                id="amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                max={currentBalance}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pl-7 bg-[#111827] border-[#374151] text-sm text-white placeholder:text-[#6b7280]"
                required
              />
            </div>
            <p className="text-[11px] text-[#9ca3af]">Maximum: ${currentBalance.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs text-[#e5e7eb]">
              Note (optional)
            </Label>
            <Input
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Reason for manual deduction"
              className="bg-[#111827] border-[#374151] text-sm text-white placeholder:text-[#6b7280]"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded px-2 py-1">
              {error}
            </p>
          )}
          {success && (
            <p className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-1">
              {success}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="border-[#374151] text-xs text-[#e5e7eb] hover:bg-[#374151]"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#ef4444] hover:bg-[#dc2626] text-xs" disabled={isPending}>
              {isPending ? "Deducting..." : "Deduct credits"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
