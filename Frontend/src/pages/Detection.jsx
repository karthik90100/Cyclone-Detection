import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Detection() {
    const {
        file, setFile,
        preview, setPreview,
        setResult, setConfidence,
        setWeather, setRisk,
        location, setLocation
    } = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFile = (file) => {
        setFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLocation({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
            });
        });
    };

    const handleUpload = async () => {
        if (!file || !location) return alert("Complete all steps");

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("lat", location.lat);
        formData.append("lon", location.lon);

        const res = await axios.post("http://127.0.0.1:5000/predict", formData);

        setResult(res.data.prediction);
        setConfidence(res.data.confidence);
        setWeather(res.data.weather);
        setRisk(res.data.risk);

        setLoading(false);

        navigate("/dashboard"); // 🔥 redirect
    };

    return (
        <div className="p-10 grid md:grid-cols-2 gap-8">

            {/* LEFT */}
            <div>
                <div
                    className="border-2 border-dashed border-gray-400 p-10 text-center rounded-lg cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => document.getElementById("fileInput").click()}

                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        handleFile(file);
                    }}

                    onDragOver={(e) => e.preventDefault()}
                >
                    <p className="text-gray-600 text-lg font-semibold">
                        📂 Drag & Drop Image Here
                    </p>

                    <p className="text-gray-400 mt-2">
                        or Click to Upload (JPG, PNG)
                    </p>

                    {/* Hidden Input */}
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files[0])}
                    />
                </div>

                {/* Preview */}
                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="mt-4 rounded-lg shadow-lg w-full max-h-80 object-cover"
                    />
                )}
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
                <button onClick={getLocation} className="btn">📍 Get Location</button>

                {location && (
                    <p>Lat: {location.lat.toFixed(2)} | Lon: {location.lon.toFixed(2)}</p>
                )}

                <button onClick={handleUpload} className="btn bg-blue-500 text-white">
                    🚀 Predict
                </button>

                {loading && <p>Loading...</p>}
            </div>
            {/* LEFT */}
            <div>
                <div
                    className="border-2 border-dashed border-gray-400 p-8 text-center rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => document.getElementById("fileInput").click()}
                >
                    <p className="text-gray-600 text-lg">📂 Click to Upload Image</p>
                    <p className="text-sm text-gray-400 mt-2">JPG, PNG supported</p>

                    {/* Hidden Input */}
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files[0])}
                    />
                </div>

                {/* Preview */}
                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="mt-4 rounded-lg shadow-lg w-full max-h-80 object-cover"
                    />
                )}
            </div>
        </div>
    );
}

export default Detection;