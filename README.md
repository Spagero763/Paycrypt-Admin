# Paycrypt Admin Dashboard

This is the official admin dashboard for Paycrypt team members to manage smart contract operations and payment processing.

## Features

- **Secure Wallet Connection**: Connect securely with MetaMask or WalletConnect.
- **Smart Contract Management**: Interact directly with the Paycrypt smart contract for full control over operations.
- **Real-time Analytics**: Monitor key metrics like total volume, successful, and failed orders.
- **User & Token Management**: Effortlessly manage supported tokens, user blacklists, and admin roles.
- **Emergency Controls**: Access critical functions like pausing the contract or emergency withdrawals.
- **Multi-Chain Support**: Seamlessly manage operations across Base, Polygon, and Ethereum networks.
- **Dark/Light Mode**: Toggle between light and dark themes for comfortable viewing.

## Getting Started

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/16navigabraham/Paycrypt-Admin.git
cd Paycrypt-Admin
\`\`\`

### 2. Install dependencies

Using pnpm:

\`\`\`bash
pnpm install
\`\`\`

### 3. Environment Variables

Create a `.env.local` file in the root of your project and add your WalletConnect Project ID:

\`\`\`
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
\`\`\`

You can get a WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).

### 4. Run the development server

\`\`\`bash
pnpm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is designed to be deployed on Vercel.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
