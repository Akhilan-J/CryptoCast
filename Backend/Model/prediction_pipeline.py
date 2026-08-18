import requests
import json
from datetime import datetime
import subprocess
import logging
import os
import sys
import time

os.makedirs("logs", exist_ok=True)

logging.basicConfig(
    filename=os.environ.get("LOG_PATH", "/app/shared/prediction_logs.txt"),
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

API_BASE = os.environ.get("API_BASE", "https://api.cryptocast.live")

def run_script(script_path):
    logging.info(f"Running script: {script_path}")
    subprocess.run([sys.executable, script_path], check=True)

def post(path, data=None):
    try:
        r = requests.post(f"{API_BASE}{path}", json=data, timeout=30)
        r.raise_for_status()
        logging.info(f"POST {path} → {r.json().get('status', 'ok')}")
    except Exception as e:
        logging.error(f"POST {path} failed: {e}")

def read_prediction(filename):
    path = os.path.join(os.environ.get("SHARED_DIR", "/app/shared"), filename)
    with open(path) as f:
        return json.load(f)

def main():
    logging.info("Starting prediction pipeline with 4-hour intervals")

    while True:
        try:
            logging.info("Starting prediction cycle")
            print(f"[{datetime.now()}] Starting prediction cycle")

            # Fetch latest market data
            for script in ["api_btc.py", "api_eth.py", "api_sol.py", "api_xrp.py"]:
                run_script(f"/app/{script}")
                time.sleep(15)  # rate-limit buffer between CoinGecko calls

            # Run predictions
            for script in ["btcPredictor.py", "ethPredictor.py", "solPredictor.py", "xrpPredictor.py"]:
                run_script(f"/app/{script}")

            # Verify previous predictions against actual prices
            for coin in ["btc", "eth", "sol", "xrp"]:
                post(f"/verify/{coin}")

            # Record new predictions to DB
            for coin, filename in [
                ("btc", "prediction_btc.json"),
                ("eth", "prediction_eth.json"),
                ("sol", "prediction_sol.json"),
                ("xrp", "prediction_xrp.json"),
            ]:
                post(f"/record/{coin}", data=read_prediction(filename))

            logging.info("Prediction cycle completed successfully")
            print(f"[{datetime.now()}] Prediction cycle completed successfully")

            time.sleep(3600 * 4)

        except Exception as e:
            logging.error(f"Error in prediction cycle: {e}")
            print(f"[{datetime.now()}] Error: {e} — retrying in 1 hour")
            time.sleep(3600)

if __name__ == "__main__":
    main()
