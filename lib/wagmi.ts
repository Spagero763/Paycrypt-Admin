"use client"

import { http, createConfig } from "wagmi"
import { base, polygon, mainnet } from "wagmi/chains"
import { injected, metaMask, coinbaseWallet, walletConnect } from "wagmi/connectors"

// Get WalletConnect project ID from environment
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

// Create connectors array
const connectors = [
  injected({
    shimDisconnect: true,
  }),
  metaMask({
    shimDisconnect: true,
  }),
  coinbaseWallet({
    appName: "Paycrypt Admin Dashboard",
    appLogoUrl: "/placeholder-logo.png",
  }),
]

// Only add WalletConnect if project ID is available
if (projectId) {
  connectors.push(
    walletConnect({
      projectId,
      metadata: {
        name: "Paycrypt Admin Dashboard",
        description: "Admin dashboard for Paycrypt smart contract management",
        url: typeof window !== "undefined" ? window.location.origin : "https://paycrypt-admin.vercel.app",
        icons: ["/placeholder-logo.png"],
      },
      showQrModal: true,
    }),
  )
}

export const config = createConfig({
  chains: [base, polygon, mainnet],
  connectors,
  transports: {
    [base.id]: http(),
    [polygon.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
