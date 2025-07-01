from flask import Flask
from flask_cors import CORS
import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os 
from dotenv import load_dotenv
from datetime import datetime, timedelta
from flask import jsonify
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
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
@app.route("/")
def home():
    return "we are live bois"

@app.route("/ping-mongo")
def ping_mongo():
    try:
        test_doc = {"check": "mongo_test"}
        db.test.insert_one(test_doc)
        result = db.test.find_one({"check": "mongo_test"})
        print(result)
        return jsonify({"status": "Success", "message": "MongoDB connected successfully"}), 200
    except Exception as e:
        return jsonify({"status": "Failed to connect", "error": str(e)}), 500

#Adds the data to the database
@app.route("/record/btc", methods=["POST"])
def record_btc():
    with open('./prediction_btc.json', 'r') as file:
        data = json.load(file)
        print(data)
    db.btc.insert_one(data)
    return "btc data recorded"

@app.route("/record/eth", methods=["POST"])
def record_eth():
    with open('./prediction_eth.json', 'r') as file:
        data = json.load(file)
    db.eth.insert_one(data)
    return "eth data recorded"

@app.route("/get/btc", methods=["GET"])
def get_btc():
    try:
        data = db.btc.find_one() 
        if data and "_id" in data:
            data["_id"] = str(data["_id"])  
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"status": "Failed to get data", "error": str(e)}), 500

@app.route("/get/eth", methods=["GET"])
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

if __name__ == "__main__":
    app.run(debug=True)

