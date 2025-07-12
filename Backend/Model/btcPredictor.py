import pandas as pd
import numpy as np
import json
from datetime import datetime
from keras.models import load_model
import joblib
import os


CSV_PATH = "/app/bitcoin.csv"
MODEL_PATH = "/app/btc_predictor.h5"
SCALER_PATH = "/app/btc_scaler.save"
OUTPUT_PATH = "/app/shared/prediction_btc.json"
SEQ_LEN = 12  # Using 2 days 

#Load model and scaler
model = load_model(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

df = pd.read_csv(CSV_PATH, parse_dates=["ts"])
df = df.sort_values("ts")

features = ["open", "high", "low", "close", "volume"]
data = df[features].values

scaled_data = scaler.transform(data)

last_seq = scaled_data[-SEQ_LEN:]
last_seq = np.expand_dims(last_seq, axis=0) 

pred_scaled = model.predict(last_seq)

close_idx = features.index("close")
dummy_array = np.zeros((1, len(features)))
dummy_array[0, close_idx] = pred_scaled[0, 0]
inverse_pred = scaler.inverse_transform(dummy_array)
predicted_close = inverse_pred[0, close_idx]

last_actual_close = df["close"].iloc[-1]

now = datetime.now()
current_time = now.strftime("%H:%M:%S")

output = {
    "currentPrice": f"${last_actual_close:,.2f}",
    "predictedPrice": f"${predicted_close:,.2f}",
    "priceChange": f"{'▲' if predicted_close > last_actual_close else '▼'} ${abs(predicted_close - last_actual_close):,.2f} ({((predicted_close / last_actual_close) - 1) * 100:.2f}%)",
    "trend": "Bullish" if predicted_close > last_actual_close else "Bearish",
    "timestamp": current_time,
    "raw_data": {
        "last_actual_close": float(last_actual_close),
        "predicted_close": float(predicted_close),
        "change_dollars": float(predicted_close - last_actual_close),
        "change_percent": float(((predicted_close / last_actual_close) - 1) * 100)
    }
}

with open(OUTPUT_PATH, "w") as f:
    json.dump(output, f, indent=2)



print("Done")
