"use client"

import React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class WalletErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Wallet connection error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Wallet Connection Error</AlertTitle>
            <AlertDescription className="mt-2">
              There was an issue connecting to your wallet. This might be due to:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Multiple wallet extensions installed</li>
                <li>Network connectivity issues</li>
                <li>Wallet extension conflicts</li>
              </ul>
            </AlertDescription>
            <Button onClick={() => window.location.reload()} className="mt-4 w-full" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reload Page
            </Button>
          </Alert>
        </div>
      )
    }

    return this.props.children
  }
}
