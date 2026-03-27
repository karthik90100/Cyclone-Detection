import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Dashboard() {
    const { result, confidence, weather, risk } = useContext(AppContext);

    const getRiskColor = () => {
        if (!risk) return "text-gray-400";
        if (risk.toLowerCase().includes("high")) return "text-red-500";
        if (risk.toLowerCase().includes("medium")) return "text-yellow-400";
        return "text-green-400";
    };

    return (

        <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white p-20">

            {/* HEADER */}
            <h1 className="text-4xl font-bold mb-8 text-center">
                🌪️ Cyclone Analysis Dashboard
            </h1>

            {/* MAIN GRID */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

                {/* RESULT CARD */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-xl text-gray-400 mb-2">Prediction</h2>

                    <div className="text-3xl font-bold flex items-center gap-2">
                        {result === "Invalid Image" ? "❌" : "☁️"} {result}
                    </div>

                    <p className="mt-4 text-gray-300">
                        Confidence:
                        <span className="ml-2 text-blue-400 font-semibold">
                            {confidence}%
                        </span>
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-800 rounded-full h-2 mt-3">
                        <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${confidence}%` }}
                        ></div>
                    </div>
                </div>

                {/* RISK CARD */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-xl text-gray-400 mb-2">Risk Level</h2>

                    <div className={`text-3xl font-bold ${getRiskColor()}`}>
                        ⚠️ {risk || "Unknown"}
                    </div>
                </div>

                {/* WEATHER CARD */}
                {weather && (
                    <div className="md:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">

                        <h2 className="text-xl text-gray-400 mb-4">
                            🌦️ Weather Insights
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6 text-center">

                            <div className="bg-black/30 p-4 rounded-xl">
                                <p className="text-gray-400">Wind Speed</p>
                                <p className="text-xl font-bold text-blue-400">
                                    {weather.windSpeed}
                                </p>
                            </div>

                            <div className="bg-black/30 p-4 rounded-xl">
                                <p className="text-gray-400">Pressure</p>
                                <p className="text-xl font-bold text-purple-400">
                                    {weather.pressure}
                                </p>
                            </div>

                            <div className="bg-black/30 p-4 rounded-xl">
                                <p className="text-gray-400">Humidity</p>
                                <p className="text-xl font-bold text-green-400">
                                    {weather.humidity}
                                </p>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;