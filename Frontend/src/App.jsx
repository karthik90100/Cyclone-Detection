import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Home from "./pages/Home";
import Detection from "./pages/GroundDetection";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import SatelliteDetection from "./pages/SatelliteDetection";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detect-ground" element={<Detection />} />
          <Route path="/detect-satilite" element={<SatelliteDetection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;