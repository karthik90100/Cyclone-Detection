import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import CycloneMap from "../components/Dashboard/CycloneMap";
import WeatherChart from "../components/Dashboard/WeatherChart";
import WeatherCards from "../components/Dashboard/WeatherCards";

function Dashboard() {
    const { result, confidence, weather, risk } = useContext(AppContext);

    const getRiskColor = () => {
        if (!risk) return "text-gray-400";
        if (risk.toLowerCase().includes("high")) return "text-red-500";
        if (risk.toLowerCase().includes("medium")) return "text-yellow-400";
        return "text-green-400";
    };

    const getRiskGlow = () => {
        if (!risk) return "";
        if (risk.toLowerCase().includes("high")) return "shadow-red-500/50";
        if (risk.toLowerCase().includes("medium")) return "shadow-yellow-400/50";
        return "shadow-green-400/50";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10 pt-20">

            {/* HEADER */}
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
                🌪️ Cyclone Analysis Dashboard
            </h1>

            {/* HERO */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

                {/* Prediction */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-gray-400 mb-3">Prediction</h2>

                    <div className="text-4xl font-bold flex gap-3">
                        {result === "Invalid Image" ? "❌" : "☁️"}
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            {result}
                        </span>
                    </div>

                    <p className="mt-4">
                        Confidence:
                        <span className="ml-2 text-blue-400 font-bold">
                            {confidence}%
                        </span>
                    </p>

                    <div className="w-full bg-gray-800 h-3 rounded-full mt-3">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${confidence}%` }}
                            className="bg-blue-500 h-3 rounded-full"
                        />
                    </div>
                </div>

                {/* Risk */}
                <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center ${getRiskGlow()}`}>
                    <h2 className="text-gray-400 mb-3">Risk Level</h2>

                    <div className="flex items-center gap-3">
                        <span className="animate-ping h-3 w-3 rounded-full bg-green-400"></span>
                        <span className={`text-3xl font-bold ${getRiskColor()}`}>
                            {risk || "Unknown"}
                        </span>
                    </div>
                </div>
            </div>

            {/* MAP */}
            <div className="max-w-6xl mx-auto mt-10">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
                    <h2 className="text-gray-400 mb-4">🌍 Cyclone Map</h2>

                    <div className="h-[300px] w-full rounded-xl overflow-hidden">
                        <CycloneMap />
                    </div>
                </div>
            </div>

            {/* GRAPH */}
            <div className="max-w-6xl mx-auto mt-10">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
                    <h2 className="text-gray-400 mb-4">📈 Weather Trends</h2>

                    <div className="h-[300px] w-full">
                        <WeatherChart />
                    </div>
                </div>
            </div>
            <WeatherCards weather={weather} />
            {/* ALERT */}
            {risk && risk.toLowerCase().includes("high") && (
                <div className="max-w-6xl mx-auto mt-8">
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center animate-pulse">
                        ⚠️ High Risk Cyclone Detected!
                    </div>
                </div>
            )}

        </div>
    );
}

export default Dashboard;