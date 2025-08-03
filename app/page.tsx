import { ConnectButton } from "@/components/connect-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAccount } from "wagmi"
import Link from "next/link"
import { Wallet } from "lucide-react"

export default function LandingPage() {
  const { isConnected } = useAccount()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 dark:from-gray-900 dark:to-gray-950">
      <header className="absolute right-4 top-4 flex items-center gap-4">
        <ThemeToggle />
      </header>
      <main className="container flex flex-col items-center justify-center gap-10 px-4 text-center md:px-6">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Paycrypt Team Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            Official admin dashboard for Paycrypt team members to manage smart contract operations and payment
            processing.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {isConnected ? (
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <ConnectButton />
            )}
          </div>
        </div>
        <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-blue-500" />
                Secure Wallet Connection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect securely with MetaMask or WalletConnect to manage your operations.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-purple-500"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Smart Contract Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Interact directly with the Paycrypt smart contract for full control over operations.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-green-500"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                Real-time Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor key metrics like total volume, successful, and failed orders in real-time.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-yellow-500"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                User & Token Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Effortlessly manage supported tokens, user blacklists, and admin roles.</CardDescription>
            </CardContent>
          </Card>
          <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-red-500"
                >
                  <path d="M10.68 13.31a16.845 16.845 0 0 0 5.82 5.82L21 14l-6-6z" />
                  <path d="M14 2l6 6" />
                  <path d="M2 22 7 17" />
                </svg>
                Emergency Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access critical functions like pausing the contract or emergency withdrawals when needed.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-indigo-500"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Multi-Chain Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Seamlessly manage operations across Base, Polygon, and Ethereum networks.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="mt-12 w-full py-6 text-center text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Paycrypt. All rights reserved.
      </footer>
    </div>
  )
}
