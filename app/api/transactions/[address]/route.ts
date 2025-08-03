import { NextResponse } from "next/server"
import { getAddress } from "viem"

// This API route is for fetching transactions related to a specific address.
// In a real application, you would use a blockchain indexer service (like Etherscan API, TheGraph, Covalent, etc.)
// as fetching all transactions directly from an RPC node is not efficient or often possible.

export async function GET(request: Request, { params }: { params: { address: string } }) {
  try {
    const { address } = params

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }

    // Validate address format
    const checksumAddress = getAddress(address)

    // For demonstration, we'll return mock data.
    // In a real scenario, you'd query an indexer.
    // Example using a hypothetical indexer:
    // const response = await fetch(`https://api.example.com/transactions?address=${checksumAddress}`);
    // const data = await response.json();

    const mockTransactions = [
      {
        hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
        from: checksumAddress,
        to: "0xContractAddress12345678901234567890123456789012",
        value: "100000000000000000", // 0.1 ETH
        timestamp: Date.now() - 3600000, // 1 hour ago
        type: "send",
      },
      {
        hash: "0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b",
        from: "0xAnotherAddress12345678901234567890123456789012",
        to: checksumAddress,
        value: "50000000000000000", // 0.05 ETH
        timestamp: Date.now() - 7200000, // 2 hours ago
        type: "receive",
      },
    ]

    return NextResponse.json(mockTransactions)
  } catch (error: any) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch transactions" }, { status: 500 })
  }
}
