from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
from flask_cors import CORS

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, Dense

app = Flask(__name__)
CORS(app)

# ✅ Rebuild model
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


# 🔥 FUNCTION: Detect if image looks like sky/cloud
def is_cloud_image(img):
    img_np = np.array(img)

    # Average brightness
    brightness = np.mean(img_np)

    # Blue channel dominance
    blue_mean = np.mean(img_np[:, :, 2])
    red_mean = np.mean(img_np[:, :, 0])
    green_mean = np.mean(img_np[:, :, 1])

    # 🔥 RULES (tuned)
    if brightness < 70:
        return False  # too dark (indoor / night)

    if blue_mean < red_mean:  
        return False  # not sky dominant

    return True


@app.route("/", methods=["GET"])
def home():
    return "Cloud Detection API Running"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        file = request.files["file"]

        # Load image
        img = Image.open(file).convert("RGB")
        img = img.resize((224, 224))

        # 🚨 STEP 1: Check if cloud-like image
        if not is_cloud_image(img):
            return jsonify({
                "prediction": "Invalid Image ❌",
                "confidence": 0
            })

        # 🚀 STEP 2: Preprocess
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # 🚀 STEP 3: Predict
        prediction = model.predict(img_array)[0]
        index = int(np.argmax(prediction))
        confidence = float(prediction[index]) * 100

        print("Prediction vector:", prediction)
        print("Predicted class:", classes[index])

        result = classes[index]

        return jsonify({
            "prediction": result,
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })


if __name__ == "__main__":
    app.run(debug=True)