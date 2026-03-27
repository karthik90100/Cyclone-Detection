import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (file) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
  };

  const handleUpload = async () => {
    if (!file) return alert("Upload image first!");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(res.data.prediction);
      setConfidence(res.data.confidence);
    } catch {
      alert("Error");
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">☁️ Cloud Detection AI</h1>

        <div
          className="dropZone"
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>📂 Drag & Drop or Click</p>
          <input
            type="file"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {preview && <img src={preview} className="image" />}

        <button className="btn" onClick={handleUpload}>
          🚀 Predict
        </button>

        {loading && <div className="loader"></div>}

        {result && (
          <div className="resultBox">
            <h2>{result}</h2>
            <p>{confidence}% confidence</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;