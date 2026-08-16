from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import smtplib
from email.mime.text import MIMEText
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
import requests
from bson.json_util import dumps

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
cluster   = os.getenv("CLUSTER")

client = MongoClient(MONGO_URI, server_api=ServerApi("1"))
db     = client[cluster]

app = Flask(__name__)
CORS(app)


def getCryptoData(crypto_name):
    try:
        res = requests.get(
            f"https://api.coingecko.com/api/v3/simple/price?ids={crypto_name}&vs_currencies=usd"
        )
        if res.status_code == 200:
            return res.json()[crypto_name]["usd"]
        return None
    except Exception:
        return None


def _send_alert_email(to_email: str, coin: str, threshold: float, direction: str, actual_price: float):
    smtp_user = os.getenv("SMTP_EMAIL")
    smtp_pass = os.getenv("SMTP_PASSWORD")
    if not smtp_user or not smtp_pass:
        return

    direction_word = "above" if direction == "above" else "below"
    body = (
        f"Hi,\n\n"
        f"Your CryptoCast price alert for {coin.upper()} has been triggered.\n\n"
        f"  Threshold:    ${threshold:,.4f} ({direction_word})\n"
        f"  Current price: ${actual_price:,.4f}\n\n"
        f"This alert has now been deactivated. Set a new one at cryptocast.live.\n\n"
        f"— CryptoCast"
    )
    msg = MIMEText(body)
    msg["Subject"] = f"CryptoCast Alert: {coin.upper()} is {direction_word} ${threshold:,.2f}"
    msg["From"]    = smtp_user
    msg["To"]      = to_email

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as s:
            s.login(smtp_user, smtp_pass)
            s.sendmail(smtp_user, [to_email], msg.as_string())
    except Exception as e:
        print(f"[email] failed to send to {to_email}: {e}")


def _check_alerts(coin: str, actual_price: float):
    alerts = db.alerts.find({"coin": coin, "active": True})
    for alert in alerts:
        threshold = alert["threshold"]
        direction = alert["direction"]
        triggered = (
            (direction == "above" and actual_price >= threshold) or
            (direction == "below" and actual_price <= threshold)
        )
        if triggered:
            _send_alert_email(alert["email"], coin, threshold, direction, actual_price)
            db.alerts.update_one({"_id": alert["_id"]}, {"$set": {"active": False}})


def _prediction_path(filename):
    prediction_dir = os.environ.get("PREDICTION_DIR", BASE_DIR)
    return os.path.join(prediction_dir, filename)


def _clean_price(price_str):
    return int(price_str.replace("$", "").replace(",", "").replace('"', "")[:-3])


@app.route("/")
def home():
    return "we on this shiiiiiiiii"


# ── Record endpoints ──────────────────────────────────────────────────────────

@app.route("/record/btc", methods=["POST"])
def record_btc():
    try:
        with open(_prediction_path("prediction_btc.json")) as f:
            data = json.load(f)
        result = db.btc.insert_one(data)
        data["_id"] = str(result.inserted_id)
        return jsonify({"status": "Success", "message": "BTC data recorded successfully", "data": data}), 200
    except Exception as e:
        return jsonify({"status": "Failed to record data", "error": str(e)}), 500


@app.route("/record/eth", methods=["POST"])
def record_eth():
    try:
        with open(_prediction_path("prediction_eth.json")) as f:
            data = json.load(f)
        result = db.eth.insert_one(data)
        data["_id"] = str(result.inserted_id)
        return jsonify({"status": "Success", "message": "ETH data recorded successfully", "data": data}), 200
    except Exception as e:
        return jsonify({"status": "Failed to record data", "error": str(e)}), 500


@app.route("/record/sol", methods=["POST"])
def record_sol():
    try:
        with open(_prediction_path("prediction_sol.json")) as f:
            data = json.load(f)
        result = db.sol.insert_one(data)
        data["_id"] = str(result.inserted_id)
        return jsonify({"status": "Success", "message": "SOL data recorded successfully", "data": data}), 200
    except Exception as e:
        return jsonify({"status": "Failed to record data", "error": str(e)}), 500


@app.route("/record/xrp", methods=["POST"])
def record_xrp():
    try:
        with open(_prediction_path("prediction_xrp.json")) as f:
            data = json.load(f)
        result = db.xrp.insert_one(data)
        data["_id"] = str(result.inserted_id)
        return jsonify({"status": "Success", "message": "XRP data recorded successfully", "data": data}), 200
    except Exception as e:
        return jsonify({"status": "Failed to record data", "error": str(e)}), 500


# ── Latest prediction endpoints ───────────────────────────────────────────────

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
        if data and "_id" in data:
            data["_id"] = str(data["_id"])
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"status": "Failed to get data", "error": str(e)}), 500


@app.route("/sol", methods=["GET"])
def get_sol():
    try:
        data = db.sol.find_one(sort=[("_id", -1)])
        if data and "_id" in data:
            data["_id"] = str(data["_id"])
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"status": "Failed to get data", "error": str(e)}), 500


@app.route("/xrp", methods=["GET"])
def get_xrp():
    try:
        data = db.xrp.find_one(sort=[("_id", -1)])
        if data and "_id" in data:
            data["_id"] = str(data["_id"])
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"status": "Failed to get data", "error": str(e)}), 500


# ── Verify endpoints ──────────────────────────────────────────────────────────

def _run_verify(coin_id, collection, verify_collection):
    if request.method == "POST":
        try:
            actual = getCryptoData(coin_id)
            if actual is None:
                return jsonify({"status": "Failed", "error": "getCryptoData failed"}), 404
            data         = collection.find_one(sort=[("_id", -1)])
            price_str    = data.get("predictedPrice")
            timestamp    = data.get("timestamp")
            cleaned      = price_str.replace("$", "").replace(",", "").replace('"', "")
            predicted    = float(cleaned)
            diff         = abs(actual - predicted)
            margin       = 0.02 * actual
            error_pct    = abs(((predicted - actual) / actual) * 100)
            direction_ok = diff <= margin
            _check_alerts(coin_id, actual)
            verify_collection.insert_one({
                "predictedPrice":   predicted,
                "predictionDate":   timestamp,
                "actualPrice":      actual,
                "errorPercent":     error_pct,
                "profitSim":        predicted - actual,
                "directionCorrect": direction_ok,
            })
            return jsonify({"status": "Success", "result": "Correct" if direction_ok else "Wrong"}), 200
        except Exception as e:
            return jsonify({"status": "Failed", "error": str(e)}), 500
    else:
        try:
            data = verify_collection.find_one(sort=[("_id", -1)])
            if data and "_id" in data:
                data["_id"] = str(data["_id"])
            return jsonify(data), 200
        except Exception as e:
            return jsonify({"status": "Failed", "error": str(e)}), 500


@app.route("/verify/btc", methods=["POST", "GET"])
def verify_btc():
    return _run_verify("bitcoin", db.btc, db.btcVerify)


@app.route("/verify/eth", methods=["POST", "GET"])
def verify_eth():
    return _run_verify("ethereum", db.eth, db.ethVerify)


@app.route("/verify/sol", methods=["POST", "GET"])
def verify_sol():
    return _run_verify("solana", db.sol, db.solVerify)


@app.route("/verify/xrp", methods=["POST", "GET"])
def verify_xrp():
    return _run_verify("ripple", db.xrp, db.xrpVerify)


# ── Volatility endpoints ──────────────────────────────────────────────────────

def _volatility(verify_collection):
    try:
        docs = list(verify_collection.find().sort("_id", -1).limit(10))
        if not docs:
            return jsonify({"status": "No data found"}), 404
        avg_error = sum(d.get("errorPercent", 0) for d in docs) / len(docs)
        return jsonify({"status": "Success", "average_error": avg_error}), 200
    except Exception as e:
        return jsonify({"status": "Failed", "error": str(e)}), 500


@app.route("/volatility/btc", methods=["GET"])
def get_volatility_btc():
    return _volatility(db.btcVerify)


@app.route("/volatility/eth", methods=["GET"])
def get_volatility_eth():
    return _volatility(db.ethVerify)


@app.route("/volatility/sol", methods=["GET"])
def get_volatility_sol():
    return _volatility(db.solVerify)


@app.route("/volatility/xrp", methods=["GET"])
def get_volatility_xrp():
    return _volatility(db.xrpVerify)


# ── History endpoint (for chart) ──────────────────────────────────────────────

def _history(verify_collection, limit=30):
    try:
        docs = list(verify_collection.find().sort("_id", -1).limit(limit))
        docs.reverse()
        result = []
        for d in docs:
            result.append({
                "date":           d.get("predictionDate", ""),
                "predictedPrice": d.get("predictedPrice"),
                "actualPrice":    d.get("actualPrice"),
                "errorPercent":   d.get("errorPercent"),
                "directionCorrect": d.get("directionCorrect"),
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"status": "Failed", "error": str(e)}), 500


@app.route("/history/btc", methods=["GET"])
def history_btc():
    return _history(db.btcVerify)


@app.route("/history/eth", methods=["GET"])
def history_eth():
    return _history(db.ethVerify)


@app.route("/history/sol", methods=["GET"])
def history_sol():
    return _history(db.solVerify)


@app.route("/history/xrp", methods=["GET"])
def history_xrp():
    return _history(db.xrpVerify)


# ── Price alert endpoints ─────────────────────────────────────────────────────

@app.route("/alert", methods=["POST"])
def create_alert():
    try:
        body = request.get_json()
        email     = body.get("email", "").strip()
        coin      = body.get("coin", "").lower()
        threshold = float(body.get("threshold", 0))
        direction = body.get("direction", "above")

        if not email or not coin or threshold <= 0:
            return jsonify({"status": "error", "message": "Missing required fields"}), 400
        if direction not in ("above", "below"):
            return jsonify({"status": "error", "message": "direction must be above or below"}), 400

        db.alerts.insert_one({
            "email":     email,
            "coin":      coin,
            "threshold": threshold,
            "direction": direction,
            "active":    True,
            "createdAt": datetime.utcnow().isoformat(),
        })
        return jsonify({"status": "Success", "message": "Alert created"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/alert", methods=["DELETE"])
def delete_alert():
    try:
        body  = request.get_json()
        email = body.get("email", "").strip()
        coin  = body.get("coin", "").lower()
        if not email or not coin:
            return jsonify({"status": "error", "message": "email and coin required"}), 400
        result = db.alerts.update_many(
            {"email": email, "coin": coin, "active": True},
            {"$set": {"active": False}},
        )
        return jsonify({"status": "Success", "deactivated": result.modified_count}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
