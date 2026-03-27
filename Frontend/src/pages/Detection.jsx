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
        if (!file) return;
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
        navigate("/dashboard");
    };

    return (
        <>
         <h1 className="text-5xl text-white">DETECTION</h1>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
           
            {/* CARD */}
            <div className="w-full max-w-5xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-8">

                {/* LEFT SIDE */}
                <div>
                    <div
                        className="border-2 border-dashed border-gray-500 p-10 text-center rounded-xl cursor-pointer hover:bg-white/10 transition"
                        onClick={() => document.getElementById("fileInput").click()}
                        onDrop={(e) => {
                            e.preventDefault();
                            handleFile(e.dataTransfer.files[0]);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <p className="text-white text-lg font-semibold">
                            📂 Drag & Drop Image
                        </p>
                        <p className="text-gray-400 mt-2">
                            or Click to Upload (JPG, PNG)
                        </p>

                        <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFile(e.target.files[0])}
                        />
                    </div>

                    {/* PREVIEW */}
                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="mt-4 rounded-xl shadow-lg w-full max-h-80 object-cover border border-white/10"
                        />
                    )}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col justify-center space-y-6">

                    {/* LOCATION BUTTON */}
                    <button
                        onClick={getLocation}
                        className="w-full py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
                    >
                        Get Location
                    </button>

                    {/* LOCATION DISPLAY */}
                    {location && (
                        <div className="text-green-400 text-sm text-center">
                            Lat: {location.lat.toFixed(2)} | Lon: {location.lon.toFixed(2)}
                        </div>
                    )}

                    {/* PREDICT BUTTON */}
                    <button
                        onClick={handleUpload}
                        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
                    >
                        Predict Cyclone
                    </button>

                    {/* LOADING */}
                    {loading && (
                        <p className="text-center text-yellow-400 animate-pulse">
                            Processing...
                        </p>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default Detection;