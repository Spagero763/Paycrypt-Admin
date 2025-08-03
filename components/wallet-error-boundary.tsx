"use client"

import React from "react"
import { useAccount } from "wagmi"
import { toast } from "@/hooks/use-toast"

interface WalletErrorBoundaryProps {
  children: React.ReactNode
}

interface WalletErrorBoundaryState {
  hasError: boolean
  errorMessage: string
}

class WalletErrorBoundary extends React.Component<WalletErrorBoundaryProps, WalletErrorBoundaryState> {
  constructor(props: WalletErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, errorMessage: "" }
  }

  static getDerivedStateFromError(error: Error): WalletErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: error.message }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service
    console.error("Wallet Error Boundary caught an error:", error, errorInfo)
    toast({
      title: "Wallet Error",
      description: `An error occurred with your wallet connection: ${error.message}`,
      variant: "destructive",
    })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h1 className="text-2xl font-bold text-destructive">Wallet Connection Error</h1>
          <p className="mt-2 text-muted-foreground">
            Something went wrong with your wallet connection. Please try reconnecting or refreshing the page.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Error: {this.state.errorMessage}</p>
          <button
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            onClick={() => this.setState({ hasError: false, errorMessage: "" })}
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Wrapper component to use useAccount hook with class component ErrorBoundary
export function WalletErrorBoundaryWrapper({ children }: WalletErrorBoundaryProps) {
  const { isDisconnected } = useAccount()

  // Reset error boundary state if wallet disconnects after an error
  const [key, setKey] = React.useState(0)
  React.useEffect(() => {
    if (isDisconnected) {
      setKey((prevKey) => prevKey + 1) // Force remount of error boundary
    }
  }, [isDisconnected])

  return <WalletErrorBoundary key={key}>{children}</WalletErrorBoundary>
}

export { WalletErrorBoundary }
