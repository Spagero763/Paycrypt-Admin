import { NextResponse } from "next/server"
import { decodeEventLog, type Hex } from "viem"

export async function POST(req: Request) {
  try {
    const { transactionHash, abi } = await req.json()

    if (!transactionHash || !abi) {
      return NextResponse.json({ error: "Missing transactionHash or ABI" }, { status: 400 })
    }

    // In a real application, you would fetch the transaction receipt
    // from an RPC provider using `viem` or `wagmi`'s public client.
    // For this example, we'll simulate a successful decode.
    // Replace this with actual RPC call:
    // const publicClient = createPublicClient({ chain: baseSepolia, transport: http() });
    // const receipt = await publicClient.getTransactionReceipt({ hash: transactionHash });

    // Simulate a transaction receipt with logs
    const mockReceipt = {
      logs: [
        {
          address: "0xYourContractAddressHere", // Replace with your contract address
          topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x..."], // Example Transfer event topic
          data: "0x0000000000000000000000000000000000000000000000000000000000000001", // Example orderId 1
        },
        {
          address: "0xYourContractAddressHere", // Replace with your contract address
          topics: ["0x8e27402204b65b00112d17703714710937207c029845901b745770405572870b"], // OrderCreated event topic
          data: "0x0000000000000000000000000000000000000000000000000000000000000005", // Example orderId 5
          // Add other indexed topics if they exist for OrderCreated
        },
      ],
    }

    let orderId: string | null = null

    for (const log of mockReceipt.logs) {
      try {
        const decodedLog = decodeEventLog({
          abi: abi,
          data: log.data as Hex,
          topics: log.topics as [Hex, ...Hex[]],
        })

        if (decodedLog.eventName === "OrderCreated" && decodedLog.args.orderId) {
          orderId = decodedLog.args.orderId.toString()
          break // Found the order ID, no need to check other logs
        }
        if (decodedLog.eventName === "OrderSuccessful" && decodedLog.args.orderId) {
          orderId = decodedLog.args.orderId.toString()
          break // Found the order ID, no need to check other logs
        }
        if (decodedLog.eventName === "OrderFailed" && decodedLog.args.orderId) {
          orderId = decodedLog.args.orderId.toString()
          break // Found the order ID, no need to check other logs
        }
      } catch (decodeError) {
        console.warn("Could not decode log:", decodeError)
      }
    }

    if (orderId) {
      return NextResponse.json({ orderId })
    } else {
      return NextResponse.json(
        { error: "No OrderCreated, OrderSuccessful, or OrderFailed event found in transaction logs." },
        { status: 404 },
      )
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
