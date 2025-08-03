import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  try {
    const address = params.address

    // Mock transaction history - replace with actual API call
    const transactions = [
      {
        id: 1,
        hash: "0x123...",
        type: "Order Created",
        amount: "100 USDC",
        status: "Success",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        hash: "0x456...",
        type: "Order Failed",
        amount: "50 USDT",
        status: "Failed",
        timestamp: new Date().toISOString(),
      },
    ]

    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}
