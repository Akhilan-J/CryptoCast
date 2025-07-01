import requests
from datetime import datetime
import subprocess

def run_script(script_path):
    print(f"Running script: {script_path}")
    subprocess.run(["python", script_path], check=True)

def main():
    try:
        # To get the latest data from the API
        run_script("/Model/api_btc.py")
        run_script("/Model/api_eth.py")

        # To run the predictions
        run_script("/Model/btcPredictor.py")
        run_script("/Model/ethPredictor.py")

        # To record the data in the database
        res1 = requests.post("http://127.0.0.1:5000/record/btc")
        res2 = requests.post("http://127.0.0.1:5000/record/eth")
        print(f"[{datetime.now()}] Recorded BTC and ETH data")

    except Exception as e:
        print(f"[{datetime.now()}] Error: {e}")

if __name__ == "__main__":
    main()



