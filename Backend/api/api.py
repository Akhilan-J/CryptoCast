from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os 
from dotenv import load_dotenv
from datetime import datetime, timedelta
import requests
from bson.json_util import dumps
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
        with open('/app/shared/prediction_btc.json', 'r') as file:
            data = json.load(file)
        result = db.btc.insert_one(data)
        data['_id'] = str(result.inserted_id)

        return jsonify({
            "status": "Success",
            "message": "BTC data recorded successfully",
            "data": data
        }), 200

    except Exception as e:
        return jsonify({"status": "Failed to record data", "error": str(e)}), 500

@app.route("/record/eth", methods=["POST"])
def record_eth():
    try:
        with open('/app/shared/prediction_eth.json', 'r') as file:
            data = json.load(file)
        result = db.eth.insert_one(data)
        data['_id'] = str(result.inserted_id)
        return jsonify({
            "status": "Success",
            "message": "ETH data recorded successfully",
            "data": data
        }), 200
    except Exception as e:
        return jsonify({"status": "Failed to record data", "error": str(e)}), 500

#Gets the latest data from the database
@app.route("/btc", methods=["GET"])
def get_btc():
    try:
        data = db.btc.find_one(sort=[("_id", -1)])
        if data and "_id" in data:
            data["_id"] = str(data["_id"])  
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"status": "Failed to get data", "error": str(e)}), 500

@app.route("/eth", methods=["GET"])
def get_eth():
    try:
        data = db.eth.find_one(sort=[("_id", -1)])
        print("DEBUG ETH DATA:", data)
        if data and "_id" in data:
            data["_id"] = str(data["_id"])
        return jsonify(data), 200
    except Exception as e:
        print("ERROR in get_eth:", e)
        return jsonify({"status": "Failed to get data", "error": str(e)}), 500
    
#Verifies the data by comparing the predicted price with the actual price
@app.route("/verify/btc", methods=["POST", "GET"])
def verify_btc():
    if request.method == "POST":
        try:
            res = getCryptoData("bitcoin")
            if res is not None:
                data = db.btc.find_one(sort=[("_id", -1)])
                data_str = data.get("predictedPrice")
                prediction_date = data.get("timestamp")
                cleaned = data_str.replace('$', '').replace(',', '').replace('"', '')
                cleaned_int = int(cleaned[:-3])
                diff = res - cleaned_int
                margin=0.02* res
                errorPercent=abs(((cleaned_int-res)/res)*100)
                if diff > margin:
                    db.btcVerify.insert_one({
                        "predictedPrice": cleaned_int,
                        "predictionDate": prediction_date,
                        "actualPrice": res,
                        "errorPercent":errorPercent,
                        "profitSim": cleaned_int - res,
                        "directionCorrect": False
                    })
                    return jsonify({"status": "Success", "message": "BTC data verification successfully", "result":"Wrong"}), 200
                else:
                    db.btcVerify.insert_one({
                        "predictedPrice": cleaned_int,
                        "predictionDate": prediction_date,
                        "actualPrice": res,
                        "errorPercent":errorPercent,
                        "profitSim": cleaned_int - res,
                        "directionCorrect": True
                    })
                    return jsonify({"status": "Success", "message": "BTC data verification successfully", "result":"Correct"}), 200
            else:
                return jsonify({"status": "Failed to verify data", "error": "getCryptoData failed"}), 404
        except Exception as e:
            return jsonify({"status": "Failed to verify data", "error": str(e)}), 500
    else:
        try:
            data = db.btcVerify.find_one(sort=[("_id", -1)])
            if data and "_id" in data:
                data["_id"] = str(data["_id"])
            return jsonify(data), 200
        except Exception as e:
            return jsonify({"status": "Failed to get data", "error": str(e)}),

@app.route("/verify/eth", methods=["POST", "GET"])
def verify_eth():
    if request.method == "POST":
        try:
            res = getCryptoData("ethereum")
            if res is not None:
                data = db.eth.find_one(sort=[("_id", -1)])
                data_str = data.get("predictedPrice")
                prediction_date = data.get("timestamp")
                cleaned = data_str.replace('$', '').replace(',', '').replace('"', '')
                cleaned_int = int(cleaned[:-3])
                diff = abs(res - cleaned_int)
                margin=0.02* res
                errorPercent=abs(((cleaned_int-res)/res)*100)
                if diff > margin:
                    db.ethVerify.insert_one({
                        "predictedPrice": cleaned_int,
                        "predictionDate": prediction_date,
                        "actualPrice": res,
                        "errorPercent":errorPercent,
                        "profitSim": cleaned_int - res,
                        "directionCorrect":False
                        
                    })
                    return jsonify({"status": "Success", "message": "ETH data verified successfully", "result":"Wrong"}), 200
                else:
                    db.ethVerify.insert_one({
                        "predictedPrice": cleaned_int,
                        "predictionDate": prediction_date,
                        "actualPrice": res,
                        "errorPercent":errorPercent,
                        "profitSim": cleaned_int - res,
                        "directionCorrect":True
                    })
                    return jsonify({"status": "Success", "message": "ETH data verified successfully", "result":"Correct"}), 200
            else:
                return jsonify({"status": "Failed to verify data", "error": "getCryptoData failed"}), 404
        except Exception as e:
            return jsonify({"status": "Failed to verify data", "error": str(e)}), 500
    else:
        try:
            data = db.ethVerify.find_one(sort=[("_id", -1)])
            if data and "_id" in data:
                data["_id"] = str(data["_id"])
            return jsonify(data), 200
        except Exception as e:
            return jsonify({"status": "Failed to get data", "error": str(e)}), 500

# Gets the last 10 records of volatility for BTC and ETH
@app.route("/volatility/btc", methods=["GET"])
def get_volatility_btc():
    try:
        data = db.btcVerify.find().sort("_id", -1).limit(10)
        list_data = list(data)
        if not list_data:
            return jsonify({"status": "No data found"}), 404
        total_error=0
        for item in list_data:
            total_error += item.get("errorPercent")
        average_error = total_error / len(list_data)
        return jsonify({"status": "Success", "average_error": average_error}), 200
    except Exception as e:
        return jsonify({"status": "Failed to get data", "error": str(e)}), 500

@app.route("/volatility/eth", methods=["GET"])
def get_volatility_eth():
    try:
        data = db.ethVerify.find().sort("_id", -1).limit(10)
        list_data = list(data)
        if not list_data:
            return jsonify({"status": "No data found"}), 404
        total_error=0
        for item in list_data:
            total_error += item.get("errorPercent")
        average_error = total_error / len(list_data)
        return jsonify({"status": "Success", "average_error": average_error}), 200
    except Exception as e:
        return jsonify({"status": "Failed to get data", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)