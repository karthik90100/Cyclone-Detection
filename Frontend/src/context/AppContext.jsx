import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [result, setResult] = useState("");
    const [confidence, setConfidence] = useState("");

    const [weather, setWeather] = useState(null);
    const [risk, setRisk] = useState("");

    const [location, setLocation] = useState(null);

    return (
        <AppContext.Provider
            value={{
                file, setFile,
                preview, setPreview,
                result, setResult,
                confidence, setConfidence,
                weather, setWeather,
                risk, setRisk,
                location, setLocation
            }}
        >
            {children}
        </AppContext.Provider>
    );
};