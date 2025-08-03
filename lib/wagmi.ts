import { http, createPublicClient } from "wagmi"
import { baseSepolia } from "wagmi/chains"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_WALLETCONNECT_PROJECT_ID"

export const config = getDefaultConfig({
  appName: "Smart Contract Dashboard",
  projectId: projectId,
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://sepolia.base.org"),
  },
})

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://sepolia.base.org"),
})
