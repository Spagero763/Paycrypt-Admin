"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ConnectButton } from "@/components/connect-button"
import { ThemeToggle } from "@/components/theme-toggle"

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <span className="text-lg font-bold">Smart Contract Dashboard</span>
          <span className="sr-only">Smart Contract Dashboard</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Dashboard
          </Link>
          <ConnectButton />
          <ThemeToggle />
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
            Interact with Your Smart Contracts
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A powerful and intuitive dashboard to manage and monitor your decentralized applications on the Base chain.
          </p>
          <div className="space-x-4">
            <Link href="/dashboard" prefetch={false}>
              <Button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Go to Dashboard
              </Button>
            </Link>
            <ConnectButton />
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Smart Contract Dashboard. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
