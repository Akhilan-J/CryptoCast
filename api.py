import requests, os, pandas as pd, time

COINGECKO_API_KEY = os.getenv("API_KEY")          
COIN_ID      = "bitcoin"                        
VS_CURRENCY  = "usd"
N_DAYS       = 90                                
OUT_CSV      = f"{COIN_ID}.csv"

def call(endpoint: str, **params) -> dict:
    base = f"https://api.coingecko.com/api/v3/coins/{COIN_ID}/{endpoint}"
    headers = {"accept":"application/json"}
    if COINGECKO_API_KEY:                      
        headers["x-cg-demo-api-key"] = COINGECKO_API_KEY
    r = requests.get(base, params=params, headers=headers, timeout=30)
    r.raise_for_status()
    return r.json()

def fetch():
    mkt = call("market_chart", vs_currency=VS_CURRENCY, days=N_DAYS)
    df = pd.DataFrame(mkt["prices"], columns=["ts","close"])
    df["mcap"]   = [x[1] for x in mkt["market_caps"]]
    df["volume"] = [x[1] for x in mkt["total_volumes"]]
    df["ts"] = pd.to_datetime(df["ts"], unit="ms")
    ohlc = call("ohlc", vs_currency=VS_CURRENCY, days=N_DAYS)
    df_ohlc = pd.DataFrame(ohlc, columns=["ts","open","high","low","close_candle"])
    df_ohlc["ts"] = pd.to_datetime(df_ohlc["ts"], unit="ms")
    df["ts"] = df["ts"].dt.floor('H')
    df_ohlc["ts"] = df_ohlc["ts"].dt.floor('H')
    print(f"Price data: {len(df)} rows")
    print(f"OHLC data: {len(df_ohlc)} rows")
    df = df.merge(df_ohlc, on="ts", how="inner")
    df = df.sort_values("ts").drop_duplicates("ts").reset_index(drop=True)
    print(f"After merge: {len(df)} rows")
    df.to_csv(OUT_CSV, index=False)
    print(f" Saved {len(df):,} rows to {OUT_CSV}")

if __name__ == "__main__":
    fetch()
