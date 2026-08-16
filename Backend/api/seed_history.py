"""
Seed 30 days of realistic historical verify data for the chart.
Run once: python seed_history.py
"""
import random
from datetime import datetime, timedelta, timezone
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env"))

client = MongoClient(os.getenv("MONGO_URI"), server_api=ServerApi("1"))
db     = client[os.getenv("CLUSTER")]

random.seed(42)

COINS = {
    "btcVerify": {"base": 63000, "volatility": 1500},
    "ethVerify": {"base": 1880,  "volatility": 60},
    "solVerify": {"base": 148,   "volatility": 8},
    "xrpVerify": {"base": 2.15,  "volatility": 0.12},
}

now = datetime.now(timezone.utc)

for collection_name, params in COINS.items():
    col   = db[collection_name]
    base  = params["base"]
    vol   = params["volatility"]

    docs = []
    actual = base
    for i in range(30, 0, -1):
        dt           = now - timedelta(days=i)
        actual       = actual + random.uniform(-vol * 0.5, vol * 0.5)
        error_pct    = random.uniform(0.1, 3.5)
        direction_ok = random.random() > 0.35
        if direction_ok:
            predicted = actual * (1 + random.uniform(-0.005, 0.005))
        else:
            predicted = actual * (1 + random.uniform(0.02, 0.04) * random.choice([-1, 1]))
        docs.append({
            "predictedPrice":   round(predicted, 4),
            "predictionDate":   dt.isoformat(),
            "actualPrice":      round(actual, 4),
            "errorPercent":     round(abs(((predicted - actual) / actual) * 100), 4),
            "profitSim":        round(predicted - actual, 4),
            "directionCorrect": direction_ok,
        })

    col.insert_many(docs)
    print(f"Seeded 30 docs into {collection_name}")

print("Done.")
