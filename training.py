# training.py
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.model_selection import train_test_split

DATA = np.load("dataset_eth.npz", allow_pickle=True)
X, y = DATA["X"], DATA["y"]

X_train, X_val, y_train, y_val = train_test_split(
    X, y, test_size=0.2, shuffle=False)

model = Sequential([
    LSTM(64, return_sequences=True, input_shape=X.shape[1:]),
    Dropout(0.2),
    LSTM(32),
    Dense(1)
])

model.compile(optimizer="adam", loss="mse")

es = EarlyStopping(patience=6, restore_best_weights=True)
ck = ModelCheckpoint("model_eth.h5", save_best_only=True)

model.fit(X_train, y_train,
          validation_data=(X_val, y_val),
          epochs=100, batch_size=32,
          callbacks=[es, ck])

print("✅ model_eth.h5 retrained and saved")
