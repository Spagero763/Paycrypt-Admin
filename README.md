# Paycrypt Admin Dashboard

This is the official admin dashboard for Paycrypt team members to manage smart contract operations and payment processing.

## Features

- **Dashboard Home**: View key stats like Total Volume, Total Successful Orders, Total Failed Orders, and Order Counter.
- **Order Tools**: Decode transaction input to extract order IDs and manage order statuses (mark successful/failed).
- **Manage Contract**: Grouped read/write functions for:
  - Token Management (add/remove supported tokens, set limits)
  - User Management (add/remove from blacklist)
  - Admin Management (add/remove admins)
  - Emergency Controls (emergency withdraw, pause/unpause contract)
- **UI & UX**:
  - Organized into clear pages/sections.
  - Supports MetaMask and WalletConnect for signing.
  - Supports Base, Polygon, and Ethereum chains.
  - Auto-loads contract using ABI + address.
  - Light + dark mode.

## Getting Started

1.  **Clone the repository**:
    \`\`\`bash
    git clone https://github.com/16navigabraham/Paycrypt-Admin.git
    cd Paycrypt-Admin
    \`\`\`
2.  **Install dependencies**:
    \`\`\`bash
    pnpm install
    \`\`\`
3.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add your WalletConnect Project ID (optional, but recommended for full wallet support):
    \`\`\`
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID
    \`\`\`
    You can get a Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com).

4.  **Run the development server**:
    \`\`\`bash
    pnpm dev
    \`\`\`
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is designed to be deployed on Vercel. Ensure your environment variables are configured on Vercel for production deployments.

## Contract Information

-   **Contract Address**: `0x0574A0941Ca659D01CF7370E37492bd2DF43128d` (Defined in `lib/contract.ts`)
-   **Supported Networks**: Base, Polygon, Ethereum

## Contributing

Feel free to contribute to this project by opening issues or pull requests.
