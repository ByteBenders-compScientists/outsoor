import { NextRequest, NextResponse } from "next/server"
import { getBillingInfo } from "@/app/actions/billing"

export async function GET(request: NextRequest) {
  try {
    const billingInfo = await getBillingInfo()
    
    if (!billingInfo.success) {
      return NextResponse.json(
        { error: billingInfo.error || "Failed to fetch credits" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      credits: billingInfo.data?.credits || { balance: 0, total_spent: 0, total_topped_up: 0 }
    })
  } catch (error) {
    console.error("Error fetching user credits:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
