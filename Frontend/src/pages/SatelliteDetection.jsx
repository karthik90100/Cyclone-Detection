import React, { useState } from "react";
import axios from "axios";

function SatelliteDetection() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        if (!file) {
            alert("Please upload an image");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://localhost:5000/predict-satellite",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert("Error while predicting");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">

            {/* Card */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-md text-center shadow-xl">

                <h2 className="text-2xl font-bold text-white mb-6">
                    🛰️ Satellite Detection
                </h2>

                {/* File Input */}
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="text-white mb-4"
                />

                {/* Preview */}
                {file && (
                    <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="mx-auto rounded-lg mb-4 w-48 h-48 object-cover border border-white/20"
                    />
                )}

                {/* Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                    Predict
                </button>

                {/* Result */}
                {result && (
                    <div className="mt-6 text-white">
                        <h3 className="text-lg font-semibold">
                            Prediction: {result.prediction}
                        </h3>

                        <p className="text-sm text-gray-300">
                            Confidence: {result.confidence}%
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SatelliteDetection;