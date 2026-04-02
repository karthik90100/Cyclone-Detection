import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

function CycloneMap() {

    const [position, setPosition] = useState([20, 80]); // default India center

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition([latitude, longitude]);
            },
            (err) => {
                console.log("Location access denied", err);
            }
        );
    }, []);

    return (
        <MapContainer
            center={position}
            zoom={6}
            scrollWheelZoom={true}
            className="h-64 w-full rounded-xl"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* User Location */}
            <Marker position={position}>
                <Popup>📍 Your Location</Popup>
            </Marker>

            {/* Impact Radius */}
            <Circle
                center={position}
                radius={100000}
                pathOptions={{ color: "blue" }}
            />
        </MapContainer>
    );
}

export default CycloneMap;