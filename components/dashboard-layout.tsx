"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu"
import { ConnectButton } from "./connect-button"
import { ThemeToggle } from "./theme-toggle"
import { HomeIcon, ShoppingCartIcon, PackageIcon, UsersIcon, SettingsIcon, MenuIcon, BellIcon } from "lucide-react"
import { Card } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Smart Contract Dashboard</span>
            </Link>
            <Button className="ml-auto h-8 w-8 bg-transparent" size="icon" variant="outline">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="/dashboard"
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="/orders"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Orders
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="/tokens"
              >
                <PackageIcon className="h-4 w-4" />
                Tokens
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="/users"
              >
                <UsersIcon className="h-4 w-4" />
                Users
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="/admin"
              >
                <SettingsIcon className="h-4 w-4" />
                Admin
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <div className="p-4 text-sm">
                <h3 className="font-semibold">Wallet Status</h3>
                <p className="text-muted-foreground">Connect your wallet to interact with contracts.</p>
                <ConnectButton />
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="shrink-0 md:hidden bg-transparent" size="icon" variant="outline">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
                  <Package2Icon className="h-6 w-6" />
                  <span className="sr-only">Smart Contract Dashboard</span>
                </Link>
                <Link
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  href="/dashboard"
                >
                  <HomeIcon className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  href="/orders"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  href="/tokens"
                >
                  <PackageIcon className="h-5 w-5" />
                  Tokens
                </Link>
                <Link
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  href="/users"
                >
                  <UsersIcon className="h-5 w-5" />
                  Users
                </Link>
                <Link
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  href="/admin"
                >
                  <SettingsIcon className="h-5 w-5" />
                  Admin
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <div className="p-4 text-sm">
                    <h3 className="font-semibold">Wallet Status</h3>
                    <p className="text-muted-foreground">Connect your wallet to interact with contracts.</p>
                    <ConnectButton />
                  </div>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">{/* Search or other header content can go here */}</div>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

function Package2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.79 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}
