import pandas as pd, numpy as np
from sklearn.preprocessing import MinMaxScaler
import ta                                  
LOOKBACK = 5                             

df = pd.read_csv("ethereum.csv", parse_dates=["ts"])
print(f"Original data shape: {df.shape}")
df = df.set_index("ts")

df["log_ret"]   = np.log(df["close"]).diff()
df["sma_7"]     = df["close"].rolling(3).mean()  
df["sma_24"]    = df["close"].rolling(5).mean()  
df["rsi_14"]    = ta.momentum.rsi(df["close"], window=7) 
df["hour_sin"]  = np.sin(2*np.pi*df.index.hour/24)
df["hour_cos"]  = np.cos(2*np.pi*df.index.hour/24)

df = df.ffill().bfill()

print(f"Shape after processing: {df.shape}")
print("NaN counts after processing:")
print(df.isna().sum())

feature_cols = [
    "close", "mcap", "volume",
    "sma_7", "sma_24", "rsi_14",
    "hour_sin", "hour_cos", "log_ret"
]

target_col   = "close"                     

scaler = MinMaxScaler()
scaled = scaler.fit_transform(df[feature_cols])
df_scaled = pd.DataFrame(scaled, index=df.index, columns=feature_cols)
df_scaled[target_col] = df[target_col]     

X_seq, y_seq = [], []
for i in range(LOOKBACK, len(df_scaled)):
    X_seq.append(df_scaled.iloc[i-LOOKBACK:i][feature_cols].values)
    y_seq.append(df_scaled.iloc[i][target_col])     

X = np.array(X_seq)
y = np.array(y_seq)

np.savez_compressed("dataset_eth.npz",
                    X=X, y=y,
                    feature_cols=feature_cols,
                    scaler_min=scaler.min_,
                    scaler_scale=scaler.scale_)
print("✅ dataset.npz ready:", X.shape, y.shape)