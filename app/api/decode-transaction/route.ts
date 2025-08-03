import { type NextRequest, NextResponse } from "next/server"
import { decodeFunctionData, parseAbi } from "viem"

export async function POST(req: NextRequest) {
  try {
    const { data, abi } = await req.json()

    if (!data || !abi) {
      return NextResponse.json({ error: "Missing data or ABI" }, { status: 400 })
    }

    const parsedAbi = parseAbi(abi)
    const decoded = decodeFunctionData({
      abi: parsedAbi,
      data: data,
    })

    return NextResponse.json({ decoded })
  } catch (error: any) {
    console.error("Error decoding transaction:", error)
    return NextResponse.json({ error: error.message || "Failed to decode transaction" }, { status: 500 })
  }
}
