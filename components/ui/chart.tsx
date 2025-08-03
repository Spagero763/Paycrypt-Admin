"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import {
  ChartContainer as RechartsChartContainer,
  type ChartContainerProps as RechartsChartContainerProps,
} from "@tremor/react"

import { type ChartConfig, ChartLegendContent, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const ChartContext = React.createContext<ChartConfig | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartProvider")
  }
  return context
}

const ChartContainer = React.forwardRef<HTMLDivElement, RechartsChartContainerProps>(({ className, ...props }, ref) => (
  <RechartsChartContainer ref={ref} className={cn("flex aspect-video w-full", className)} {...props} />
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = ({ ...props }: React.ComponentProps<typeof Tooltip>) => {
  const chartConfig = useChart()
  return (
    <Tooltip
      cursor={false}
      content={
        <ChartTooltipContent
          hideLabel
          formatter={(value, name) => {
            const key = name as keyof typeof chartConfig
            return `${chartConfig[key]?.label || name}: ${value}`
          }}
        />
      }
      {...props}
    />
  )
}

const ChartLegendComponent = ({ ...props }: React.ComponentProps<typeof Legend>) => {
  return <Legend content={<ChartLegendContent />} {...props} />
}

export {
  ChartContainer,
  ChartTooltip as ChartTooltipComponent,
  ChartLegendComponent,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ChartTooltipContent,
  ChartLegendContent,
}

export type { ChartConfig }
