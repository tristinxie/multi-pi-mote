from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
from gpiozero import LED, Device
from gpiozero.pins.mock import MockFactory

Device.pin_factory = MockFactory()

led = LED(17)
app = Flask(__name__)
CORS(app)
def failsafe_off():
    led.off()

@app.route("/button_state", methods=['GET'])
def get_button_state():
    return jsonify({"state": led.is_lit})

@app.route("/activate_button", methods=['POST'])
def activate_button():
    led.on()
    timer = threading.Timer(20.0, failsafe_off)
    timer.start()
    return jsonify({"message": "Button activated"})

@app.route("/release_button", methods=['POST'])
def release_button():
    led.off()
    return jsonify({"message": "Button released"})

if __name__ =="__main__":
    app.run()
    # from waitress import serve
    # serve(app, port=5000, host="0.0.0.0")