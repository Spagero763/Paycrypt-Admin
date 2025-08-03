import { createConfig, http } from "wagmi"
import { base, polygon, mainnet } from "wagmi/chains"
import { metaMask, walletConnect, injected, coinbaseWallet } from "wagmi/connectors"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

export const config = createConfig({
  chains: [base, polygon, mainnet],
  connectors: [
    // Injected connector for browser wallets (handles multiple wallets gracefully)
    injected({
      shimDisconnect: true,
    }),
    // MetaMask specific connector
    metaMask({
      shimDisconnect: true,
    }),
    // Coinbase Wallet
    coinbaseWallet({
      appName: "Paycrypt Admin Dashboard",
      appLogoUrl: "https://paycrypt-admin.vercel.app/icon.png",
    }),
    // WalletConnect - only if project ID is available
    ...(projectId
      ? [
          walletConnect({
            projectId,
            metadata: {
              name: "Paycrypt Admin Dashboard",
              description: "Official admin dashboard for Paycrypt team members",
              url: typeof window !== "undefined" ? window.location.origin : "https://paycrypt-admin.vercel.app",
              icons: [
                typeof window !== "undefined"
                  ? `${window.location.origin}/icon.png`
                  : "https://paycrypt-admin.vercel.app/icon.png",
              ],
            },
            showQrModal: true,
          }),
        ]
      : []),
  ],
  transports: {
    [base.id]: http(),
    [polygon.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
})
