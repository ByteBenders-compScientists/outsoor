"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export function PrintInvoiceButton() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <Button onClick={handlePrint} className="bg-[#8C5CF7] hover:bg-[#7a4bd9]">
      <Printer className="w-4 h-4 mr-2" /> Print Invoice
    </Button>
  )
}

