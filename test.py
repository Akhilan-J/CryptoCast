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
ohlc = call("ohlc", vs_currency=VS_CURRENCY, days=N_DAYS)
print(ohlc)