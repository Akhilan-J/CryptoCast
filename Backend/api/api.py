from flask import Flask
from flask_cors import CORS
import json

app=Flask(__name__)
CORS(app)

@app.route("/eth")
def eth_output():
    with open('./prediction_eth.json', 'r') as file:
        data = json.load(file)
    
    return json.dumps(data)

@app.route("/btc")
def btc_output():
    with open('./prediction_btc.json', 'r') as file:
        data = json.load(file)
    
    return json.dumps(data)
    

