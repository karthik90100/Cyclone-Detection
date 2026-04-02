import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

function WeatherChart() {

    const data = [
        { time: "Now", wind: 3.6 },
        { time: "+1h", wind: 5 },
        { time: "+2h", wind: 7 },
        { time: "+3h", wind: 6 },
        { time: "+4h", wind: 8 },
    ];

    return (
        <div style={{ width: "100%", height: "300px", background: "#111" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid stroke="#333" />
                    <XAxis dataKey="time" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="wind"
                        stroke="#38bdf8"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default WeatherChart;