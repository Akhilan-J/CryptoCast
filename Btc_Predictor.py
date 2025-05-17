import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout

# Read the CSV file with all available features
df = pd.read_csv("bitcoin.csv", parse_dates=["ts"])
df = df.sort_values("ts")

# Extract all numerical features for prediction
features = ["open", "high", "low", "close", "volume"]
data = df[features].values

# Scale the data
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(data)

# Create sequences for LSTM model with all features
SEQ_LEN = 24  # 24 hours of data

X = []
y = []  # Target is still the close price

# Get the index of the close price column in our feature set
close_idx = features.index("close")

for i in range(SEQ_LEN, len(scaled_data)):
    X.append(scaled_data[i-SEQ_LEN:i])
    # We're still predicting only the close price
    y.append(scaled_data[i, close_idx:close_idx+1])

X = np.array(X)
y = np.array(y)

# Split data into training and validation sets (80/20 split)
split = int(0.8 * len(X))
X_train, X_val = X[:split], X[split:]
y_train, y_val = y[:split], y[split:]

# Build a more complex LSTM model
model = Sequential()
model.add(LSTM(units=64, return_sequences=True, input_shape=(X.shape[1], X.shape[2])))
model.add(Dropout(0.2))
model.add(LSTM(units=64, return_sequences=False))
model.add(Dropout(0.2))
model.add(Dense(32))
model.add(Dense(1))  # Output is still just the close price

# Compile and train model
model.compile(optimizer="adam", loss="mean_squared_error")
history = model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=32,
    validation_data=(X_val, y_val),
    verbose=1
)

# Plot training & validation loss
plt.figure(figsize=(10, 6))
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend()
plt.grid(True)
plt.savefig('training_history.png')
plt.close()

# Prepare the last sequence for prediction
last_seq = scaled_data[-SEQ_LEN:]
last_seq = np.expand_dims(last_seq, axis=0)

# Make prediction for the next hour's close price
pred_scaled = model.predict(last_seq)

# Create a dummy array to inverse transform the prediction
# We need this because the scaler was fitted on all features
dummy_array = np.zeros((1, len(features)))
dummy_array[0, close_idx] = pred_scaled[0, 0]

# Inverse transform to get the actual close price
inverse_pred = scaler.inverse_transform(dummy_array)
predicted_close = inverse_pred[0, close_idx]

# Get the last actual close price for comparison
last_actual_close = df["close"].iloc[-1]

print(f"\n📊 Model Performance:")
print(f"   - Features used: {', '.join(features)}")
print(f"   - Sequence length: {SEQ_LEN} hours")
print(f"\n📈 Prediction Results:")
print(f"   - Last actual close price: ${last_actual_close:,.2f}")
print(f"   - Predicted next hour close price: ${predicted_close:,.2f}")
print(f"   - Change: ${predicted_close - last_actual_close:,.2f} ({((predicted_close/last_actual_close)-1)*100:.2f}%)")

# Optional: Evaluate model on validation data
val_loss = model.evaluate(X_val, y_val, verbose=0)
print(f"\n🔍 Validation MSE: {val_loss:.6f}")
