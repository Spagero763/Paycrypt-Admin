# Smart Contract Dashboard

This is a Next.js application designed to provide a dashboard for interacting with and monitoring smart contracts. It leverages Wagmi for Ethereum wallet integration and Viem for interacting with smart contracts.

## Features

-   **Wallet Connection**: Connect your Ethereum wallet (e.g., MetaMask) using Wagmi.
-   **Dashboard Overview**: View key metrics and interact with your deployed smart contracts.
-   **Contract Interaction**: Call read and write functions on your smart contracts.
-   **Responsive Design**: Built with Tailwind CSS and Shadcn UI for a modern and responsive user interface.
-   **Theme Toggle**: Switch between light and dark modes.
-   **Protected Routes**: Ensure users are connected with a wallet before accessing certain parts of the dashboard.

## Getting Started

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/your-username/smart-contract-dashboard.git
cd smart-contract-dashboard
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

\`\`\`
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="YOUR_WALLETCONNECT_PROJECT_ID"
# NEXT_PUBLIC_ALCHEMY_RPC_URL="YOUR_ALCHEMY_BASE_RPC_URL" # Uncomment and set if you need a specific RPC
\`\`\`

-   **`NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`**: Get your project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is required if you plan to use the WalletConnect connector.
-   **`NEXT_PUBLIC_ALCHEMY_RPC_URL`**: (Optional) If you need a specific RPC URL for the Base chain (or any other chain you configure), you can set it here. Otherwise, Wagmi will use default public RPCs.

### 4. Run the development server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `app/`: Next.js App Router pages and API routes.
    -   `api/`: Backend API routes for server-side operations (e.g., decoding transactions).
    -   `dashboard/`, `orders/`, `tokens/`, `users/`, `admin/`: Protected routes for different dashboard sections.
    -   `layout.tsx`: Root layout for the application.
    -   `page.tsx`: Landing page.
    -   `providers.tsx`: Wagmi and React Query providers.
-   `components/`: Reusable React components.
    -   `ui/`: Shadcn UI components.
    -   `connect-button.tsx`: Wallet connection button.
    -   `dashboard-layout.tsx`: Layout for dashboard pages, including sidebar and header.
    -   `dashboard-home.tsx`: Main content for the dashboard home page.
    -   `protected-route.tsx`: Component to protect routes requiring wallet connection.
    -   `theme-toggle.tsx`: Component for switching themes.
    -   `wallet-error-boundary.tsx`: Error boundary for wallet-related issues.
-   `lib/`: Utility functions and configurations.
    -   `contract.ts`: Smart contract address, ABI, and custom hooks for contract interaction.
    -   `utils.ts`: General utility functions (e.g., `cn`, `shortenAddress`).
    -   `wagmi.ts`: Wagmi configuration.
-   `public/`: Static assets.
-   `styles/`: Global CSS.

## Deployment

This project can be easily deployed to Vercel.

\`\`\`bash
npm run build
\`\`\`

Then deploy using the Vercel CLI:

\`\`\`bash
vercel deploy
\`\`\`

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
