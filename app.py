from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
from flask_cors import CORS
import requests
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, Dense

app = Flask(__name__)
CORS(app)

# ==============================
# 🔥 MODEL SETUP
# ==============================
# ==============================
# 🛰️ SATELLITE MODEL
# ==============================

satellite_model = tf.keras.models.load_model("cyclone_detection_model.keras")

model = Sequential([
    Input(shape=(224, 224, 3)),

    Conv2D(32, (3,3), activation='relu'),
    MaxPooling2D(2,2),

    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),

    Conv2D(128, (3,3), activation='relu'),
    MaxPooling2D(2,2),

    Flatten(),
    Dense(128, activation='relu'),
    Dense(5, activation='softmax')
])

model.load_weights("cloud.weights.h5")

classes = ['VEIL CLOUDS', 'clear', 'pattern', 'thick dark', 'thick white']


# ==============================
# ☁️ IMAGE VALIDATION
# ==============================

def is_cloud_image(img):
    img_np = np.array(img)

    brightness = np.mean(img_np)

    blue_mean = np.mean(img_np[:, :, 2])
    red_mean = np.mean(img_np[:, :, 0])

    if brightness < 70:
        return False

    if blue_mean < red_mean:
        return False

    return True


# ==============================
# 🌦️ WEATHER API FUNCTION
# ==============================

def get_weather(lat, lon):
    API_KEY = "5233375f708b67ed604cd291a09f8ef2"  # 🔥 PUT YOUR KEY HERE

    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"

    res = requests.get(url)

    if res.status_code != 200:
        return None

    data = res.json()

    return {
        "windSpeed": data["wind"]["speed"],   # m/s
        "pressure": data["main"]["pressure"], # hPa
        "humidity": data["main"]["humidity"],
        "condition": data["weather"][0]["main"]
    }


# ==============================
# 🏠 HOME ROUTE
# ==============================

@app.route("/", methods=["GET"])
def home():
    return "🚀 Cloud + Cyclone Detection API Running"
# ==============================
# 🛰️ SATELLITE PREDICTION ROUTE
# ==============================

@app.route("/predict-satellite", methods=["POST"])
def predict_satellite():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"})

        file = request.files["file"]

        # 🖼️ Load image
        img = Image.open(file).convert("RGB")
        img = img.resize((150, 150))  # must match training

        # 🔄 Preprocess
        img_array = np.array(img, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # 🤖 Predict
        prediction = float(satellite_model.predict(img_array, verbose=0)[0][0])

        if prediction >= 0.5:
            result = "No Cyclone"
            confidence = prediction
        else:
            result = "Cyclone"
            confidence = 1 - prediction

        return jsonify({
            "prediction": result,
            "confidence": round(confidence * 100, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# ==============================
# 🔮 PREDICTION ROUTE
# ==============================

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # 📂 Get file
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"})

        file = request.files["file"]

        # 📍 Get location
        lat = request.form.get("lat")
        lon = request.form.get("lon")

        if not lat or not lon:
            return jsonify({"error": "Location not provided"})

        lat = float(lat)
        lon = float(lon)

        # 🖼️ Load image
        img = Image.open(file).convert("RGB")
        img = img.resize((224, 224))

        # 🚨 Validate image
        if not is_cloud_image(img):
            return jsonify({
                "prediction": "Invalid Image ❌",
                "confidence": 0
            })

        # 🔄 Preprocess
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # 🤖 Predict
        prediction = model.predict(img_array)[0]
        index = int(np.argmax(prediction))
        confidence = float(prediction[index]) * 100

        result = classes[index]

        # 🌦️ Get weather data
        weather = get_weather(lat, lon)

        if weather is None:
            return jsonify({
                "prediction": result,
                "confidence": round(confidence, 2),
                "error": "Weather API failed"
            })

        # 🌪️ Cyclone risk logic
        risk = "🟢 Safe"

        if (
            result.lower() in ["thick dark", "thick white"] and
            weather["windSpeed"] > 15 and
            weather["pressure"] < 1000
        ):
            risk = "🔴 Cyclone Risk"

        elif weather["windSpeed"] > 10:
            risk = "🟡 Storm Possible"

        # 📤 Response
        return jsonify({
            "prediction": result,
            "confidence": round(confidence, 2),
            "weather": weather,
            "risk": risk
        })

    except Exception as e:
        return jsonify({"error": str(e)})


# ==============================
# 🚀 RUN SERVER
# ==============================

if __name__ == "__main__":
    app.run(debug=True)