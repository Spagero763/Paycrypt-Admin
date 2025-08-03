"use client"

import { http, createConfig } from "wagmi"
import { base, polygon, mainnet } from "wagmi/chains"
import { metaMask, walletConnect } from "wagmi/connectors"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

export const config = createConfig({
  chains: [mainnet, polygon, base],
  connectors: [metaMask(), ...(projectId ? [walletConnect({ projectId, showQrModal: false })] : [])],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
