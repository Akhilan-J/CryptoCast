# predictor.py
import numpy as np
import pandas as pd
import tensorflow as tf
import requests
from sklearn.preprocessing import MinMaxScaler
import ta

LOOKBACK = 5
COIN_ID = "ethereum"
VS_CURRENCY = "usd"

# Load trained model and scaler
DATA = np.load("dataset_eth.npz", allow_pickle=True)
X_hist = DATA["X"]
feature_cols = DATA["feature_cols"].tolist()

scaler = MinMaxScaler()
scaler.min_, scaler.scale_ = DATA["scaler_min"], DATA["scaler_scale"]

model = tf.keras.models.load_model("model_eth.h5", compile=False)

def fetch_market_data():
    url = f"https://api.coingecko.com/api/v3/coins/{COIN_ID}/market_chart"
    params = {"vs_currency": VS_CURRENCY, "days": 1}
    r = requests.get(url, params=params, timeout=10)
    r.raise_for_status()
    mkt = r.json()
    
    df = pd.DataFrame(mkt["prices"], columns=["ts","close"])
    df["mcap"] = [x[1] for x in mkt["market_caps"]]
    df["volume"] = [x[1] for x in mkt["total_volumes"]]
    df["ts"] = pd.to_datetime(df["ts"], unit="ms")
    df = df.set_index("ts")
    
    return df

def build_live_sequence(df):
    df["log_ret"]  = np.log(df["close"]).diff()
    df["sma_7"]    = df["close"].rolling(7).mean()
    df["sma_24"]   = df["close"].rolling(24).mean()
    df["rsi_14"]   = ta.momentum.rsi(df["close"], window=14)
    df["hour_sin"] = np.sin(2*np.pi*df.index.hour/24)
    df["hour_cos"] = np.cos(2*np.pi*df.index.hour/24)

    df = df.dropna().copy()
    latest_features = df[feature_cols].tail(LOOKBACK)
    
    X_live = scaler.transform(latest_features)
    return X_live.reshape(1, LOOKBACK, len(feature_cols))

def predict():
    df = fetch_market_data()
    X_live = build_live_sequence(df)
    pred = model.predict(X_live, verbose=0)[0][0]
    print(f"🚀 Predicted next ETH price: ${pred:.2f}")

if __name__ == "__main__":
    predict()
