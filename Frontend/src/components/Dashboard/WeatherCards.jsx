import {
    LineChart,
    Line,
    ResponsiveContainer
} from "recharts";

import {
    Wind,
    Gauge,
    Droplets,
    TrendingUp,
    TrendingDown
} from "lucide-react";

function WeatherCards({ weather }) {

    // ✅ SAFETY CHECK (VERY IMPORTANT)
    if (!weather) {
        return (
            <div className="text-center text-gray-400 mt-6">
                Loading weather data...
            </div>
        );
    }

    // ✅ Safe values (prevents crash)
    const windSpeed = weather.windSpeed || 0;
    const pressure = weather.pressure || 0;
    const humidity = weather.humidity || 0;

    // ✅ Mini graph data
    const windData = [
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: windSpeed },
    ];

    // ✅ Pressure trend logic
    const pressureTrend = pressure > 1010 ? "up" : "down";

    return (
        <div className="grid md:grid-cols-3 gap-8">

            {/* 🌬️ WIND CARD */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-400/5 border border-white/10 hover:scale-105 transition duration-300">

                <Wind className="text-blue-400 mb-2" size={28} />

                <p className="text-gray-400">Wind Speed</p>

                <p className="text-3xl font-bold text-blue-400">
                    {windSpeed} km/h
                </p>

                {/* Mini Graph */}
                <div style={{ height: 60 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={windData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#38bdf8"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 📊 PRESSURE CARD */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-400/5 border border-white/10 hover:scale-105 transition duration-300">

                <Gauge className="text-purple-400 mb-2" size={28} />

                <p className="text-gray-400">Pressure</p>

                <p className="text-3xl font-bold text-purple-400 flex items-center gap-2">
                    {pressure} hPa

                    {pressureTrend === "up" ? (
                        <TrendingUp className="text-green-400" size={20} />
                    ) : (
                        <TrendingDown className="text-red-400" size={20} />
                    )}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                    {pressureTrend === "up" ? "Increasing" : "Decreasing"}
                </p>
            </div>

            {/* 💧 HUMIDITY CARD */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-400/5 border border-white/10 hover:scale-105 transition duration-300">

                <Droplets className="text-green-400 mb-2" size={28} />

                <p className="text-gray-400">Humidity</p>

                {/* Circular Progress */}
                <div className="relative w-24 h-24 mt-4">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke="#1f2937"
                            strokeWidth="8"
                            fill="transparent"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke="#22c55e"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={226}
                            strokeDashoffset={226 - (226 * humidity) / 100}
                            strokeLinecap="round"
                        />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center text-green-400 font-bold text-lg">
                        {humidity}%
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-2 text-center">
                    {humidity > 70 ? "High humidity" : "Normal"}
                </p>
            </div>

        </div>
    );
}

export default WeatherCards;