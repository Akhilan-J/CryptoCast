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

const API = import.meta.env.VITE_API_BASE_URL;

const COINS = [
  { value: "btc", label: "Bitcoin (BTC)" },
  { value: "eth", label: "Ethereum (ETH)" },
  { value: "sol", label: "Solana (SOL)" },
  { value: "xrp", label: "XRP" },
];

const chartConfig = {
  predicted: { label: "CryptoCast", color: "var(--chart-1)" },
  actual:    { label: "Market",     color: "var(--chart-2)" },
} satisfies ChartConfig;

type HistoryPoint = {
  date: string;
  predictedPrice: number;
  actualPrice: number;
};

export function ChartAreaInteractive() {
  const [coin, setCoin]       = React.useState("btc");
  const [data, setData]       = React.useState<HistoryPoint[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [timeRange, setTimeRange] = React.useState("30d");

  React.useEffect(() => {
    setLoading(true);
    fetch(`${API}/history/${coin}`)
      .then((r) => r.json())
      .then((rows: any[]) => {
        setData(
          rows.map((r) => ({
            date:           r.date,
            predictedPrice: r.predictedPrice,
            actualPrice:    r.actualPrice,
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [coin]);

  const filteredData = React.useMemo(() => {
    if (!data.length) return [];
    const days = timeRange === "7d" ? 7 : timeRange === "14d" ? 14 : 30;
    return data.slice(-days);
  }, [data, timeRange]);

  const coinLabel = COINS.find((c) => c.value === coin)?.label ?? coin.toUpperCase();

  const formatPrice = (v: number) => {
    if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`;
    if (v >= 1)    return `$${v.toFixed(2)}`;
    return `$${v.toFixed(4)}`;
  };

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Prediction Accuracy — {coinLabel}</CardTitle>
        </div>
        <div className="flex gap-2">
          <Select value={coin} onValueChange={setCoin}>
            <SelectTrigger className="hidden w-[170px] rounded-lg sm:ml-auto sm:flex" aria-label="Select coin">
              <SelectValue>{coinLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {COINS.map((c) => (
                <SelectItem key={c.value} value={c.value} className="rounded-lg">
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="hidden w-[130px] rounded-lg sm:flex" aria-label="Select range">
              <SelectValue>
                {timeRange === "7d" ? "Last 7 days" : timeRange === "14d" ? "Last 14 days" : "Last 30 days"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="7d"  className="rounded-lg">Last 7 days</SelectItem>
              <SelectItem value="14d" className="rounded-lg">Last 14 days</SelectItem>
              <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
            Loading…
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-predicted)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-predicted)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-actual)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-actual)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(v) =>
                  new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={70}
                domain={["dataMin * 0.995", "dataMax * 1.005"]}
                tickFormatter={formatPrice}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(v) =>
                      new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    }
                    formatter={(value) => formatPrice(Number(value))}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="actualPrice"
                name="actual"
                type="monotone"
                fill="url(#fillActual)"
                stroke="var(--color-actual)"
                strokeWidth={2}
              />
              <Area
                dataKey="predictedPrice"
                name="predicted"
                type="monotone"
                fill="url(#fillPredicted)"
                stroke="var(--color-predicted)"
                strokeWidth={2}
                strokeDasharray="4 2"
              />
              <ChartLegend content={<ChartLegendContent payload={""} nameKey="" />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
