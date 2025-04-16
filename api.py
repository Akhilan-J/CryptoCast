import requests
import pandas as pd
import os

COINGECKO_API_KEY = os.environ.get("API_KEY")

def fetch_market_data():
    url = "https://api.coingecko.com/api/v3/coins/ethereum/market_chart"  
    
    params = {
        'vs_currency': 'usd',
        'days': '30',  
    }

    headers = {
        'accept': 'application/json',
        'x-cg-demo-api-key': COINGECKO_API_KEY,
    }
    try:
        print("Fetching market data from CoinGecko...")
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        prices = data.get('prices', [])
        volumes = data.get('total_volumes', [])
        print(f"Data points received: {len(prices)}")
        df_prices = pd.DataFrame(prices, columns=['timestamp', 'price'])
        df_volumes = pd.DataFrame(volumes, columns=['timestamp', 'volume'])
        df = pd.merge(df_prices, df_volumes, on='timestamp')
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
        df = df.sort_values('timestamp')
        df.to_csv('eth.csv', index=False)
        print("Market data collected and saved to market_data.csv")
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"An error occurred: {err}")
if __name__ == '__main__':
    fetch_market_data()