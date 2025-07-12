import requests
from datetime import datetime
import subprocess
import logging
import os
import sys
import time


os.makedirs("logs", exist_ok=True)

# Configure logger
logging.basicConfig(
    filename="/app/shared/prediction_logs.txt", 
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

def run_script(script_path):
    logging.info(f"Running script: {script_path}")
    subprocess.run([sys.executable, script_path], check=True)

def main():
    # Convert 4 hours to seconds

    logging.info(f"Starting prediction pipeline with 4-hour intervals")

    
    while True:
        try:
            logging.info("Starting prediction cycle")
            print(f"[{datetime.now()}] Starting prediction cycle")
            
            # To get the latest data from the API
            run_script("/app/api_btc.py")
            run_script("/app/api_eth.py")

            # To run the predictions
            run_script("/app/btcPredictor.py")
            run_script("/app/ethPredictor.py")

            # To record the verified data in the database
            res1 = requests.post("https://api.cryptocast.live/verify/btc")
            res2 = requests.post("https://api.cryptocast.live/verify/eth")

            # To record the data in the database
            res3 = requests.post("https://api.cryptocast.live/record/btc")
            res4 = requests.post("https://api.cryptocast.live/record/eth")


            logging.info("Successfully recorded verified data")
            print(f"[{datetime.now()}] Recorded verified BTC and ETH data")
            logging.info("Successfully completed prediction cycle")
            print(f"[{datetime.now()}] Recorded BTC and ETH data")
            print(f"[{datetime.now()}] Prediction cycle completed successfully")
            
            # Sleep for 4 hours
            time.sleep(3600*4)

        except Exception as e:
            logging.error(f"Error in prediction cycle: {e}")
            print(f"[{datetime.now()}] Error: {e}")
            print(f"[{datetime.now()}] Retrying in 1 hour...")
            time.sleep(3600)  

if __name__ == "__main__":
    main()



