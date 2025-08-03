"use client"

import type React from "react"

import { ConnectButton } from "@/components/connect-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { HomeIcon, MenuIcon, Package2Icon, SettingsIcon, UsersIcon, WalletCardsIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAccount } from "wagmi"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isConnected && pathname !== "/") {
      router.push("/")
    }
  }, [isConnected, pathname, router])

  if (!isConnected && pathname !== "/") {
    return null // Or a loading spinner while redirecting
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span className="">Paycrypt Admin</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname === "/dashboard" ? "bg-muted text-primary" : ""
                }`}
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard Home
              </Link>
              <Link
                href="/orders"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname === "/orders" ? "bg-muted text-primary" : ""
                }`}
              >
                <WalletCardsIcon className="h-4 w-4" />
                Order Tools
              </Link>
              <Link
                href="/tokens"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname === "/tokens" ? "bg-muted text-primary" : ""
                }`}
              >
                <SettingsIcon className="h-4 w-4" />
                Token Management
              </Link>
              <Link
                href="/users"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname === "/users" ? "bg-muted text-primary" : ""
                }`}
              >
                <UsersIcon className="h-4 w-4" />
                User Management
              </Link>
              <Link
                href="/admin"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname === "/admin" ? "bg-muted text-primary" : ""
                }`}
              >
                <SettingsIcon className="h-4 w-4" />
                Admin Controls
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                  <Package2Icon className="h-6 w-6" />
                  <span className="sr-only">Paycrypt Admin</span>
                </Link>
                <Link
                  href="/dashboard"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    pathname === "/dashboard" ? "bg-muted text-foreground" : ""
                  }`}
                >
                  <HomeIcon className="h-5 w-5" />
                  Dashboard Home
                </Link>
                <Link
                  href="/orders"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    pathname === "/orders" ? "bg-muted text-foreground" : ""
                  }`}
                >
                  <WalletCardsIcon className="h-5 w-5" />
                  Order Tools
                </Link>
                <Link
                  href="/tokens"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    pathname === "/tokens" ? "bg-muted text-foreground" : ""
                  }`}
                >
                  <SettingsIcon className="h-5 w-5" />
                  Token Management
                </Link>
                <Link
                  href="/users"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    pathname === "/users" ? "bg-muted text-foreground" : ""
                  }`}
                >
                  <UsersIcon className="h-5 w-5" />
                  User Management
                </Link>
                <Link
                  href="/admin"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                    pathname === "/admin" ? "bg-muted text-foreground" : ""
                  }`}
                >
                  <SettingsIcon className="h-5 w-5" />
                  Admin Controls
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">{/* Search or other header content */}</div>
          <ConnectButton />
          <ThemeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
