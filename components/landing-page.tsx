"use client"

import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectButton } from "@/components/connect-button"
import { Shield, BarChart3, Settings, Users, Coins, ArrowRight, CheckCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const features = [
  {
    icon: BarChart3,
    title: "Payment Analytics",
    description: "Monitor Paycrypt payment processing with real-time metrics and transaction analytics.",
  },
  {
    icon: Settings,
    title: "Order Management",
    description: "Manage payment orders, decode transaction data, and handle order status updates.",
  },
  {
    icon: Coins,
    title: "Token Administration",
    description: "Configure supported payment tokens, set transaction limits, and manage token policies.",
  },
  {
    icon: Users,
    title: "User Access Control",
    description: "Manage user permissions, blacklist controls, and team member access rights.",
  },
  {
    icon: Shield,
    title: "System Security",
    description: "Emergency controls, contract pause functionality, and secure fund management.",
  },
]

const benefits = [
  "Multi-chain payment processing (Base, Polygon, Ethereum)",
  "Real-time transaction monitoring and analytics",
  "Universal wallet support (MetaMask, WalletConnect, and more)",
  "Mobile-responsive interface for on-the-go management",
  "Dark/Light mode for comfortable extended use",
  "Type-safe operations with comprehensive error handling",
]

export function LandingPage() {
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard")
    }
  }, [isConnected, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            <span className="text-xl font-bold">Paycrypt Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full border px-3 py-1 text-sm">
            <Shield className="mr-2 h-4 w-4" />
            Paycrypt Team Dashboard
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Paycrypt</span>{" "}
            Admin Dashboard
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Comprehensive admin interface for the Paycrypt team to manage smart contract operations, monitor payment
            processing, and control system access across multiple blockchain networks.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {!isConnected ? (
              <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Shield className="h-5 w-5" />
                    Team Access Required
                  </CardTitle>
                  <CardDescription>
                    Connect your authorized wallet to access the Paycrypt admin dashboard and manage contract
                    operations. Supports all major wallets including MetaMask, WalletConnect, and more.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ConnectButton />
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Only authorized Paycrypt team members can access admin functions
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Button size="lg" onClick={() => router.push("/dashboard")} className="text-lg">
                Access Team Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Powerful Admin Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to manage your smart contract operations efficiently and securely.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 transition-colors hover:border-primary/20">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">Built for the Paycrypt Team</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            This dashboard is specifically designed for Paycrypt team members to efficiently manage smart contract
            operations, monitor payment flows, and maintain system security across all supported blockchain networks.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-left">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">Ready to Manage Paycrypt?</CardTitle>
              <CardDescription className="text-lg">
                Connect your authorized wallet and start managing Paycrypt smart contract operations with our
                comprehensive team dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isConnected ? (
                <ConnectButton />
              ) : (
                <Button size="lg" onClick={() => router.push("/dashboard")}>
                  Access Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-purple-600">
                <span className="text-xs font-bold text-white">P</span>
              </div>
              <span className="font-semibold">Paycrypt Admin Dashboard</span>
            </div>
            <p className="text-sm text-muted-foreground">Secure payment processing management for the Paycrypt team.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
