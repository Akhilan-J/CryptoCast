import torch
import torch.nn as nn

class CryptLSTM(nn.Module):
    def __init__(self, input_size=5, hidden=64):
        super().__init__()
        self.lstm1 = nn.LSTM(input_size, hidden, batch_first=True)
        self.drop1 = nn.Dropout(0.2)
        self.lstm2 = nn.LSTM(hidden, hidden, batch_first=True)
        self.drop2 = nn.Dropout(0.2)
        self.fc1   = nn.Linear(hidden, 32)
        self.fc2   = nn.Linear(32, 1)

    def forward(self, x):
        out, _ = self.lstm1(x)
        out     = self.drop1(out)
        out, _  = self.lstm2(out)
        out     = self.drop2(out[:, -1, :])
        out     = torch.relu(self.fc1(out))
        return self.fc2(out)
