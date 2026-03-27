import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Home from "./pages/Home";
import Detection from "./pages/Detection";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detect" element={<Detection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;