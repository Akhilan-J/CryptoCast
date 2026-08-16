import pandas as pd
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.preprocessing import MinMaxScaler
import joblib
from lstm_model import CryptLSTM

df = pd.read_csv("solana.csv", parse_dates=["ts"])
df = df.sort_values("ts")
features  = ["open", "high", "low", "close", "volume"]
data      = df[features].values

scaler = MinMaxScaler()
scaled = scaler.fit_transform(data)
joblib.dump(scaler, "sol_scaler.save")

SEQ_LEN   = 24
close_idx = features.index("close")

X, y = [], []
for i in range(SEQ_LEN, len(scaled)):
    X.append(scaled[i-SEQ_LEN:i])
    y.append(scaled[i, close_idx])

X = torch.tensor(np.array(X), dtype=torch.float32)
y = torch.tensor(np.array(y), dtype=torch.float32).unsqueeze(1)

split    = int(0.8 * len(X))
X_train, X_val = X[:split], X[split:]
y_train, y_val = y[:split], y[split:]

loader = DataLoader(TensorDataset(X_train, y_train), batch_size=32, shuffle=True)

model     = CryptLSTM(input_size=len(features))
optimizer = torch.optim.Adam(model.parameters())
loss_fn   = nn.MSELoss()

for epoch in range(50):
    model.train()
    for xb, yb in loader:
        optimizer.zero_grad()
        loss_fn(model(xb), yb).backward()
        optimizer.step()
    if (epoch + 1) % 10 == 0:
        model.eval()
        with torch.no_grad():
            val_loss = loss_fn(model(X_val), y_val).item()
        print(f"Epoch {epoch+1}/50  val_loss={val_loss:.6f}")

torch.save(model.state_dict(), "sol_predictor.pt")
print("Saved sol_predictor.pt")
