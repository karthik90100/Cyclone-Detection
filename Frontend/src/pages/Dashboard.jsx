import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Dashboard() {
    const { result, confidence, weather, risk } = useContext(AppContext);

    return (
        <div className="p-10">

            <h1 className="text-3xl mb-6">📊 Results Dashboard</h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="card">
                    <h2>☁️ {result}</h2>
                    <p>Confidence: {confidence}%</p>
                </div>

                {weather && (
                    <div className="card">
                        <p>🌬️ Wind: {weather.windSpeed}</p>
                        <p>🌡️ Pressure: {weather.pressure}</p>
                        <p>💧 Humidity: {weather.humidity}</p>
                    </div>
                )}

                <div className="card">
                    <h2>⚠️ Risk: {risk}</h2>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;