import { createConfig, http } from "wagmi"
import { base, polygon, mainnet } from "wagmi/chains"
import { metaMask, walletConnect, injected } from "wagmi/connectors"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "your-project-id"

export const config = createConfig({
  chains: [base, polygon, mainnet],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId,
      metadata: {
        name: "Paycrypt Admin Dashboard",
        description: "Official admin dashboard for Paycrypt team members",
        url: "https://paycrypt-admin.vercel.app",
        icons: ["https://paycrypt-admin.vercel.app/icon.png"],
      },
    }),
  ],
  transports: {
    [base.id]: http(),
    [polygon.id]: http(),
    [mainnet.id]: http(),
  },
})
