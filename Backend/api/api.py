from flask import Flask
from flask_cors import CORS
import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os 
from dotenv import load_dotenv
from datetime import datetime, timedelta
from flask import jsonify
import requests
#load the environment variables
load_dotenv()

MONGO_URI=os.getenv("MONGO_URI")
cluster=os.getenv("CLUSTER")

#connect to the database
client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
db=client[cluster]

#create a flask app
app=Flask(__name__)
CORS(app)

def getCryptoData(crypto_name):
    try:
        res = requests.get(f"https://api.coingecko.com/api/v3/simple/price?ids={crypto_name}&vs_currencies=usd")
        if res.status_code == 200:
            return res.json()[crypto_name]["usd"]
        else:
            return None
    except Exception as e:
        return None

@app.route("/")
def home():
    return "we on this shiiiiiiiii"

#Adds the data to the database
@app.route("/record/btc", methods=["POST"])
def record_btc():
    try:
        with open('./prediction_btc.json', 'r') as file:
            data = json.load(file)
        db.btc.insert_one(data)
        return jsonify({"status": "Success", "message": "BTC data recorded successfully"}), 200
    except Exception as e:
        return jsonify({"status": "Failed to record data", "error": str(e)}), 500

@app.route("/record/eth", methods=["POST"])
def record_eth():
    try:
        with open('./prediction_eth.json', 'r') as file:
            data = json.load(file)
        db.eth.insert_one(data)
        return jsonify({"status": "Success", "message": "ETH data recorded successfully"}), 200
    except Exception as e:
        return jsonify({"status": "Failed to record data", "error": str(e)}), 500

@app.route("/btc", methods=["GET"])
def get_btc():
    try:
        data = db.btc.find_one() 
        if data and "_id" in data:
            data["_id"] = str(data["_id"])  
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"status": "Failed to get data", "error": str(e)}), 500

@app.route("/eth", methods=["GET"])
def get_eth():
    try:
        data = db.eth.find_one()
        print("DEBUG ETH DATA:", data)
        if data and "_id" in data:
            data["_id"] = str(data["_id"])
        return jsonify(data), 200
    except Exception as e:
        print("ERROR in get_eth:", e)
        return jsonify({"status": "Failed to get data", "error": str(e)}), 500
    
@app.route("/verify/btc", methods=["POST", "GET"])
def verify_btc():
    if requests.method == "POST":
        try:
            res = getCryptoData("bitcoin")
            if res is not None:
                data = db.btc.find_one()
                data_str = data.get("predictedPrice")
                cleaned = data_str.replace('$', '').replace(',', '').replace('"', '')
                cleaned_int = int(cleaned[:-3])
                diff = res - cleaned_int
                margin=0.02* res
                if diff > margin:
                    return jsonify({"status": "Success", "message": "BTC data verification successfully", "result":"Wrong"}), 200
                else:
                    return jsonify({"status": "Success", "message": "BTC data verified successfully", "result":"Correct"}), 200
                return jsonify({"status": "Success", "message": "BTC data verified successfully", "curr":res,"pred":cleaned_int,"diff":diff}), 200
            else:
                return jsonify({"status": "Failed to verify data", "error": "getCryptoData failed"}), 404
        except Exception as e:
            return jsonify({"status": "Failed to verify data", "error": str(e)}), 500
    else:
        return jsonify({"status": "Method not allowed", "error": "Use POST method to verify data"}), 405

@app.route("/verify/eth", methods=["POST", "GET"])
def verify_eth():
    if requests.method == "POST":
        try:
            res = getCryptoData("ethereum")
            if res is not None:
                data = db.eth.find_one()
                data_str = data.get("predictedPrice")
                cleaned = data_str.replace('$', '').replace(',', '').replace('"', '')
                cleaned_int = int(cleaned[:-3])
                diff = abs(res - cleaned_int)
                margin=0.02* res
                if diff > margin:
                    return jsonify({"status": "Success", "message": "ETH data verification successfully", "result":"Wrong"}), 200
                else:
                    return jsonify({"status": "Success", "message": "ETH data verified successfully", "result":"Correct"}), 200
            else:
                return jsonify({"status": "Failed to verify data", "error": "getCryptoData failed"}), 404
        except Exception as e:
            return jsonify({"status": "Failed to verify data", "error": str(e)}), 500
    else:
        return jsonify({"status": "Method not allowed", "error": "Use POST method to verify data"}), 405


if __name__ == "__main__":
    app.run(debug=True)