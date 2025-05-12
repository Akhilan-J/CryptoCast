import pandas as pd
import numpy as np
import keras
from tensorflow import keras
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense

df = pd.read_csv("bitcoin.csv", parse_dates=["ts"])
df = df.sort_values("ts")

data = df[["close"]].values  

scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(data)

SEQ_LEN = 24  # 24 hours
X = []
y = []
for i in range(SEQ_LEN, len(scaled_data)):
    X.append(scaled_data[i-SEQ_LEN:i])
    y.append(scaled_data[i])

X = np.array(X)
y = np.array(y)

model = Sequential()
model.add(LSTM(units=50, return_sequences=True, input_shape=(X.shape[1], 1)))
model.add(LSTM(units=50))
model.add(Dense(1))

model.compile(optimizer="adam", loss="mean_squared_error")
model.fit(X, y, epochs=20, batch_size=16, verbose=1)

last_seq = scaled_data[-SEQ_LEN:]  
last_seq = np.expand_dims(last_seq, axis=0)  
pred_scaled = model.predict(last_seq)
pred_price = scaler.inverse_transform(pred_scaled)

print(f"\n📈 Predicted next hour close price: ${pred_price[0][0]:,.2f}")
