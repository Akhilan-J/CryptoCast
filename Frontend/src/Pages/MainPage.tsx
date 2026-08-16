import React, { useState, useMemo } from "react";
import logo from "/src/assets/CryptoCast_logo.png";
import MoonLoader from "react-spinners/MoonLoader";
import ParticleBackground from "../Components/particleBakground";
import { Link } from "react-router";
import btcIcon from "cryptocurrency-icons/svg/color/btc.svg";
import ethIcon from "cryptocurrency-icons/svg/color/eth.svg";
import solIcon from "cryptocurrency-icons/svg/color/sol.svg";
import xrpIcon from "cryptocurrency-icons/svg/color/xrp.svg";

const API = import.meta.env.VITE_API_BASE_URL;

const COIN_CONFIG = {
  btc: { label: "Bitcoin",  symbol: "BTC", accent: "#f7931a", icon: btcIcon },
  eth: { label: "Ethereum", symbol: "ETH", accent: "#8b5cf6", icon: ethIcon },
  sol: { label: "Solana",   symbol: "SOL", accent: "#14f195", icon: solIcon },
  xrp: { label: "XRP",      symbol: "XRP", accent: "#3b82f6", icon: xrpIcon },
} as const;

type CoinKey = keyof typeof COIN_CONFIG;

type CoinData = {
  currentPrice: string;
  predictedPrice: string;
  priceChange: string;
  trend: string;
  timestamp: string;
  timestamp_display: string;
} | null;

type VerifyData = {
  predictedPrice: number;
  predictionDate: string;
  actualPrice: number;
  errorPercent: number;
  directionCorrect: boolean;
} | null;

type ErrorData = { average_error: number } | null;

const MainPage: React.FC = () => {
  const [activeCoin, setActiveCoin] = useState<CoinKey>("btc");
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  const [alertEmail,     setAlertEmail]     = useState("");
  const [alertThreshold, setAlertThreshold] = useState("");
  const [alertDirection, setAlertDirection] = useState<"above" | "below">("above");
  const [alertStatus,    setAlertStatus]    = useState<"idle" | "sending" | "success" | "error">("idle");

  const [coins, setCoins] = useState<Record<CoinKey, CoinData>>({
    btc: null, eth: null, sol: null, xrp: null,
  });
  const [verified, setVerified] = useState<Record<CoinKey, VerifyData>>({
    btc: null, eth: null, sol: null, xrp: null,
  });
  const [errors, setErrors] = useState<Record<CoinKey, ErrorData>>({
    btc: null, eth: null, sol: null, xrp: null,
  });

  const submitAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail || !alertThreshold) return;
    setAlertStatus("sending");
    try {
      const res = await fetch(`${API}/alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: alertEmail,
          coin: activeCoin,
          threshold: parseFloat(alertThreshold),
          direction: alertDirection,
        }),
      });
      if (!res.ok) throw new Error();
      setAlertStatus("success");
      setAlertEmail("");
      setAlertThreshold("");
      setTimeout(() => setAlertStatus("idle"), 4000);
    } catch {
      setAlertStatus("error");
      setTimeout(() => setAlertStatus("idle"), 4000);
    }
  };

  const toLocal = (ts: string) =>
    new Date(ts).toLocaleTimeString("en-US", {
      hour12: true, hour: "2-digit", minute: "2-digit",
    });

  const safeFetch = async (url: string) => {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  };

  const fetchData = async () => {
    try {
      const [btc, eth, sol, xrp,
             btcV, ethV, solV, xrpV,
             btcE, ethE, solE, xrpE] = await Promise.all([
        safeFetch(`${API}/btc`), safeFetch(`${API}/eth`),
        safeFetch(`${API}/sol`), safeFetch(`${API}/xrp`),
        safeFetch(`${API}/verify/btc`), safeFetch(`${API}/verify/eth`),
        safeFetch(`${API}/verify/sol`), safeFetch(`${API}/verify/xrp`),
        safeFetch(`${API}/volatility/btc`), safeFetch(`${API}/volatility/eth`),
        safeFetch(`${API}/volatility/sol`), safeFetch(`${API}/volatility/xrp`),
      ]);

      for (const d of [btc, eth, sol, xrp]) {
        if (d?.timestamp) d.timestamp_display = toLocal(d.timestamp);
      }

      setCoins({ btc, eth, sol, xrp });
      setVerified({ btc: btcV, eth: ethV, sol: solV, xrp: xrpV });
      setErrors({ btc: btcE, eth: ethE, sol: solE, xrp: xrpE });
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  useMemo(() => {
    fetchData();
    const id = setInterval(fetchData, 600_000);
    return () => clearInterval(id);
  }, []);

  const cfg        = COIN_CONFIG[activeCoin];
  const coinData   = coins[activeCoin];
  const verifyData = verified[activeCoin];
  const errorData  = errors[activeCoin];
  const isBullish  = coinData?.trend === "Bullish";
  const trendColor = isBullish ? "#4ade80" : "#f87171";

  return (
    <main className="min-h-screen bg-[#08080a] text-white relative overflow-x-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <Link to="/">
            <img src={logo} alt="CryptoCast" className="h-14 drop-shadow-lg" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
            CryptoCast
          </h1>
          <p className="text-zinc-500 text-sm">AI-powered crypto price predictions</p>
        </div>

        {/* ── Coin tabs ──────────────────────────────────── */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(Object.entries(COIN_CONFIG) as [CoinKey, typeof COIN_CONFIG[CoinKey]][]).map(([key, c]) => (
            <button
              key={key}
              onClick={() => { setActiveCoin(key); setAlertStatus("idle"); setAlertThreshold(""); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={activeCoin === key ? {
                background: `${c.accent}22`,
                color: c.accent,
                border: `1px solid ${c.accent}55`,
                boxShadow: `0 0 16px ${c.accent}22`,
              } : {
                background: "rgba(255,255,255,0.04)",
                color: "#71717a",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img src={c.icon} alt={c.symbol} className="w-5 h-5 rounded-full" />
              {c.symbol}
            </button>
          ))}
        </div>

        {/* ── Main coin card ─────────────────────────────── */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <MoonLoader color="#ffffff" size={32} />
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-12">Error: {error}</div>
        ) : coinData ? (
          <div
            className="rounded-2xl p-8 relative overflow-hidden mb-6 transition-all duration-500"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(24px)",
              border: `1px solid ${cfg.accent}30`,
              boxShadow: `0 0 60px ${cfg.accent}10`,
            }}
          >
            {/* Corner glow */}
            <div
              className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
              style={{
                background: `radial-gradient(circle at top right, ${cfg.accent}18 0%, transparent 65%)`,
              }}
            />

            {/* Coin label */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <img src={cfg.icon} alt={cfg.symbol} className="w-9 h-9 rounded-full" />
                <span className="font-semibold text-white">{cfg.label}</span>
                <span className="text-zinc-600 text-sm">{cfg.symbol}</span>
              </div>

              {/* Trend badge */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: `${trendColor}18`,
                  border: `1px solid ${trendColor}40`,
                  color: trendColor,
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: trendColor }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ background: trendColor }}
                  />
                </span>
                {coinData.trend}
              </div>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Current Price</p>
                <p className="text-4xl font-bold text-white tracking-tight">
                  {coinData.currentPrice}
                </p>
                <p className="text-zinc-600 text-xs mt-3">
                  Updated {coinData.timestamp_display}
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Next Prediction</p>
                <p
                  className="text-4xl font-bold tracking-tight"
                  style={{ color: cfg.accent }}
                >
                  {coinData.predictedPrice}
                </p>
                <p className="text-sm mt-2" style={{ color: trendColor }}>
                  {coinData.priceChange}
                </p>
              </div>
            </div>

            {/* Bottom stats row */}
            <div
              className="flex items-center gap-4 pt-5 flex-wrap"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {verifyData && (
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: verifyData.directionCorrect ? "rgba(74,222,128,0.08)" : "rgba(248,113,113,0.08)",
                    border: `1px solid ${verifyData.directionCorrect ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"}`,
                    color: verifyData.directionCorrect ? "#4ade80" : "#f87171",
                  }}
                >
                  {verifyData.directionCorrect ? "✓" : "✗"} Last prediction
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-zinc-500 text-center py-12">No data available</div>
        )}

        {/* ── Price alert form ───────────────────────────── */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base">🔔</span>
            <h3 className="text-sm font-semibold text-zinc-200">Price Alert</h3>
            <span className="text-zinc-600 text-xs">— get an email when {cfg.symbol} hits your target</span>
          </div>

          <form onSubmit={submitAlert} className="flex flex-wrap gap-3 items-end">
            <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
              <label className="text-zinc-500 text-xs uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={alertEmail}
                onChange={e => setAlertEmail(e.target.value)}
                className="bg-transparent text-sm text-white placeholder-zinc-600 rounded-xl px-4 py-2.5 outline-none focus:ring-1"
                style={{ border: "1px solid rgba(255,255,255,0.1)", focusRingColor: cfg.accent }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-zinc-500 text-xs uppercase tracking-wider">Direction</label>
              <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                {(["above", "below"] as const).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setAlertDirection(d)}
                    className="px-4 py-2.5 text-sm font-medium transition-all duration-150"
                    style={alertDirection === d
                      ? { background: `${cfg.accent}30`, color: cfg.accent }
                      : { background: "transparent", color: "#71717a" }
                    }
                  >
                    {d === "above" ? "↑ Above" : "↓ Below"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-zinc-500 text-xs uppercase tracking-wider">Price Target</label>
              <input
                type="number"
                required
                min={0}
                step="any"
                placeholder={coinData?.currentPrice?.replace("$", "").replace(",", "") ?? "0"}
                value={alertThreshold}
                onChange={e => setAlertThreshold(e.target.value)}
                className="bg-transparent text-sm text-white placeholder-zinc-600 rounded-xl px-4 py-2.5 outline-none w-36"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>

            <button
              type="submit"
              disabled={alertStatus === "sending" || alertStatus === "success"}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 disabled:opacity-50"
              style={{
                background: `${cfg.accent}22`,
                color: cfg.accent,
                border: `1px solid ${cfg.accent}44`,
              }}
            >
              {alertStatus === "sending" ? "Setting…" : alertStatus === "success" ? "✓ Alert set!" : "Set Alert"}
            </button>
          </form>

          {alertStatus === "error" && (
            <p className="text-red-400 text-xs mt-3">Something went wrong. Please try again.</p>
          )}
        </div>

        {/* ── Prediction results grid ────────────────────── */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Latest Predictions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.entries(COIN_CONFIG) as [CoinKey, typeof COIN_CONFIG[CoinKey]][]).map(([key, c]) => {
              const v = verified[key];
              if (!v) return null;
              const ok = v.directionCorrect;
              return (
                <div
                  key={key}
                  className="rounded-xl p-5 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${c.accent}20`,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img src={c.icon} alt={c.symbol} className="w-6 h-6 rounded-full" />
                      <span className="text-sm font-semibold text-zinc-200">{c.label}</span>
                    </div>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: ok ? "#4ade8018" : "#f8717118",
                        color: ok ? "#4ade80" : "#f87171",
                      }}
                    >
                      {ok ? "✓ Correct" : "✗ Incorrect"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: "Predicted", value: `$${v.predictedPrice?.toLocaleString()}`, color: c.accent },
                      { label: "Actual",    value: `$${v.actualPrice?.toLocaleString()}`,    color: "#e4e4e7" },
                      { label: "Error",     value: `${v.errorPercent?.toFixed(2)}%`,          color: "#71717a" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-xs text-zinc-500">{label}</span>
                        <span className="text-xs font-medium" style={{ color }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
};

export default MainPage;
