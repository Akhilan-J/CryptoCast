import pandas as pd
import numpy as np
import json
import torch
from datetime import datetime, timezone
import joblib
import os
import sys

_here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, _here)
from lstm_model import CryptLSTM

CSV_PATH    = os.environ.get("XRP_CSV_PATH",    os.path.join(os.environ.get("APP_DIR", "/app"), "xrp.csv"))
MODEL_PATH  = os.environ.get("XRP_MODEL_PATH",  os.path.join(os.environ.get("APP_DIR", "/app"), "xrp_predictor.pt"))
SCALER_PATH = os.environ.get("XRP_SCALER_PATH", os.path.join(os.environ.get("APP_DIR", "/app"), "xrp_scaler.save"))
OUTPUT_PATH = os.environ.get("XRP_OUTPUT_PATH", os.path.join(os.environ.get("SHARED_DIR", "/app/shared"), "prediction_xrp.json"))
SEQ_LEN     = 24

scaler = joblib.load(SCALER_PATH)
df     = pd.read_csv(CSV_PATH, parse_dates=["ts"])
df     = df.sort_values("ts")

features  = ["open", "high", "low", "close", "volume"]
scaled    = scaler.transform(df[features].values)
close_idx = features.index("close")

model = CryptLSTM(input_size=len(features))
model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
model.eval()

last_seq = torch.tensor(scaled[-SEQ_LEN:], dtype=torch.float32).unsqueeze(0)
with torch.no_grad():
    pred_sc = model(last_seq).item()

dummy = np.zeros((1, len(features)))
dummy[0, close_idx] = pred_sc
predicted_close   = scaler.inverse_transform(dummy)[0, close_idx]
last_actual_close = df["close"].iloc[-1]

def day_suffix(d):
    if 11 <= d <= 13: return "th"
    return {1:"st", 2:"nd", 3:"rd"}.get(d % 10, "th")

now = datetime.now(timezone.utc)
d   = now.day
formatted = now.strftime(f"%A, %B {d}{day_suffix(d)}, at %H:%M")

output = {
    "currentPrice":      f"${last_actual_close:,.4f}",
    "predictedPrice":    f"${predicted_close:,.4f}",
    "priceChange":       f"{'▲' if predicted_close > last_actual_close else '▼'} ${abs(predicted_close - last_actual_close):,.4f} ({((predicted_close/last_actual_close)-1)*100:.2f}%)",
    "trend":             "Bullish" if predicted_close > last_actual_close else "Bearish",
    "timestamp":         now.isoformat(),
    "timestamp_display": formatted,
    "raw_data": {
        "last_actual_close": float(last_actual_close),
        "predicted_close":   float(predicted_close),
        "change_dollars":    float(predicted_close - last_actual_close),
        "change_percent":    float(((predicted_close / last_actual_close) - 1) * 100),
    },
}

out_dir = os.path.dirname(OUTPUT_PATH)
if out_dir:
    os.makedirs(out_dir, exist_ok=True)
with open(OUTPUT_PATH, "w") as f:
    json.dump(output, f, indent=2)

print("Done — prediction_xrp.json written")
