"use client";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "./ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const description = "";

const chartData = [
  { date: "2024-07-01", desktop: 106357.01, mobile: 106336.01 },
  { date: "2024-07-02", desktop: 106335.96, mobile: 106329.6 },
  { date: "2024-07-03", desktop: 107705.65, mobile: 107755.68 },
  { date: "2024-07-04", desktop: 107070.87, mobile: 107031.79 },
  { date: "2024-07-05", desktop: 107599.95, mobile: 107600.99 },
  { date: "2024-07-06", desktop: 106376.92, mobile: 106420.47 },
  { date: "2024-07-07", desktop: 106694.01, mobile: 106687.92 },
  { date: "2024-07-08", desktop: 106355.28, mobile: 106392.28 },
  { date: "2024-07-09", desktop: 106805.39, mobile: 106770.71 },
  { date: "2024-07-10", desktop: 106648.87, mobile: 106578.15 },
  { date: "2024-07-11", desktop: 106879.0, mobile: 106875.9 },
  { date: "2024-07-12", desktop: 106982.9, mobile: 106937.42 },
  { date: "2024-07-13", desktop: 106958.08, mobile: 106945.83 },
  { date: "2024-07-14", desktop: 107263.21, mobile: 107234.0 },
  { date: "2024-07-15", desktop: 106390.37, mobile: 106453.39 },
  { date: "2024-07-16", desktop: 106247.77, mobile: 106235.64 },
  { date: "2024-07-17", desktop: 107192.59, mobile: 107180.34 },
  { date: "2024-07-18", desktop: 107027.43, mobile: 106993.92 },
  { date: "2024-07-19", desktop: 107119.87, mobile: 107078.78 },
  { date: "2024-07-20", desktop: 106125.62, mobile: 106092.88 },
  { date: "2024-07-21", desktop: 107203.6, mobile: 107210.11 },
  { date: "2024-07-22", desktop: 106858.8, mobile: 106853.94 },
  { date: "2024-07-23", desktop: 106415.57, mobile: 106396.46 },
  { date: "2024-07-24", desktop: 107062.98, mobile: 107079.56 },
  { date: "2024-07-25", desktop: 106283.84, mobile: 106289.17 },
  { date: "2024-07-26", desktop: 107087.67, mobile: 107059.74 },
  { date: "2024-07-27", desktop: 106761.62, mobile: 106689.95 },
  { date: "2024-07-28", desktop: 107215.09, mobile: 107150.4 },
  { date: "2024-07-29", desktop: 106963.79, mobile: 107015.87 },
  { date: "2024-07-30", desktop: 107390.47, mobile: 107456.02 },
  { date: "2024-07-31", desktop: 107097.38, mobile: 107043.91 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "CryptoCast",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Market",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("17d");

  const filteredData = React.useMemo(() => {
    const latestDate = new Date(chartData[chartData.length - 1].date);
    const daysToSubtract =
      timeRange === "7d" ? 7 : timeRange === "14d" ? 14 : 30;
    const cutoffDate = new Date(latestDate);
    cutoffDate.setDate(latestDate.getDate() - daysToSubtract);
    return chartData.filter((item) => new Date(item.date) >= cutoffDate);
  }, [timeRange]);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Our Btc Predictions</CardTitle>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue>
              {timeRange === "7d"
                ? "Last 7 days"
                : timeRange === "14d"
                ? "Last 14 days"
                : "Last 30 days"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="14d" className="rounded-lg">
              Last 14 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={60}
              domain={["dataMin - 500", "dataMax + 500"]}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="monotone"
              fill="none"
              stroke="var(--color-mobile)"
              strokeWidth={3}
            />
            <Area
              dataKey="desktop"
              type="monotone"
              fill="none"
              stroke="var(--color-desktop)"
              strokeWidth={3}
            />
            <ChartLegend
              content={
                <ChartLegendContent className="" payload={""} nameKey="" />
              }
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
