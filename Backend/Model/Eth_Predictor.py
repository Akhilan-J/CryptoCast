import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout
import json
from datetime import datetime

df = pd.read_csv("ethereum.csv", parse_dates=["ts"])
df = df.sort_values("ts")
features = ["open", "high", "low", "close", "volume"]
data = df[features].values

scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(data)

SEQ_LEN = 24  # 24 hours of data

X = []
y = [] 

close_idx = features.index("close")

for i in range(SEQ_LEN, len(scaled_data)):
    X.append(scaled_data[i-SEQ_LEN:i])
    y.append(scaled_data[i, close_idx:close_idx+1])

X = np.array(X)
y = np.array(y)

split = int(0.8 * len(X))
X_train, X_val = X[:split], X[split:]
y_train, y_val = y[:split], y[split:]

model = Sequential()
model.add(LSTM(units=64, return_sequences=True, input_shape=(X.shape[1], X.shape[2])))
model.add(Dropout(0.2))
model.add(LSTM(units=64, return_sequences=False))
model.add(Dropout(0.2))
model.add(Dense(32))
model.add(Dense(1))  


model.compile(optimizer="adam", loss="mean_squared_error")
history = model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=32,
    validation_data=(X_val, y_val),
    verbose=1
)

last_seq = scaled_data[-SEQ_LEN:]
last_seq = np.expand_dims(last_seq, axis=0)

pred_scaled = model.predict(last_seq)

dummy_array = np.zeros((1, len(features)))
dummy_array[0, close_idx] = pred_scaled[0, 0]

inverse_pred = scaler.inverse_transform(dummy_array)
predicted_close = inverse_pred[0, close_idx]

last_actual_close = df["close"].iloc[-1]

now = datetime.now()
current_time=now.strftime("%H:%M:%S")

output = {
    "last_actual_close": float(last_actual_close),
    "predicted_close": float(predicted_close),
    "change_dollars": float(predicted_close - last_actual_close),
    "change_percent": float(((predicted_close/last_actual_close)-1)*100),
    "Time":str(current_time)
}

with open("prediction_eth.json", "w") as f:
    json.dump(output, f)