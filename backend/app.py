from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
from gpiozero import LED, Device
from gpiozero.pins.mock import MockFactory
from waitress import serve
import sqlite3 as sql
import os
from datetime import datetime
import json

Device.pin_factory = MockFactory()
DATABASE_PATH = "metadata.db"
led = LED(17)
app = Flask(__name__)
CORS(app)
def failsafe_off():
    led.off()
@app.route("/metadata", methods=['GET'])
def get_metadata():
    with sql.connect(DATABASE_PATH) as con:
        cur = con.cursor()
        cur.execute("SELECT * FROM button_history")
        res = cur.fetchall()[::-1]
        return json.dumps(dict(res))

@app.route("/button_state", methods=['GET'])
def get_button_state():
    return jsonify({"state": led.is_lit})

@app.route("/activate_button", methods=['POST'])
def activate_button():
    led.on()
    with sql.connect(DATABASE_PATH) as con:
        cur = con.cursor()
        cur.execute(f"INSERT INTO button_history VALUES('{datetime.now()}', 'TX')")
        con.commit()
    timer = threading.Timer(20.0, failsafe_off)
    timer.start()
    return jsonify({"message": "Button activated"})

@app.route("/release_button", methods=['POST'])
def release_button():
    led.off()
    return jsonify({"message": "Button released"})

if __name__ =="__main__":
    # app.run()
    if not os.path.exists(DATABASE_PATH):
        with sql.connect(DATABASE_PATH) as con:
            cur = con.cursor()
            cur.execute("CREATE TABLE button_history(name, press_time)")
            con.commit()
    serve(app, port=5001, host="0.0.0.0")