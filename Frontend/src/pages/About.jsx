function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

            {/* HERO SECTION */}
            <div className="text-center py-20 px-6">
                <h1 className="text-5xl font-bold mb-4">
                    🌪️ Cyclone AI Detection
                </h1>

                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Advanced AI-powered system that analyzes cloud patterns and weather data
                    to predict cyclone formation, intensity, and risk in real-time.
                </p>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

                {/* LEFT */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                        🚀 What We Do
                    </h2>

                    <p className="text-gray-300 leading-relaxed">
                        Cyclone AI uses deep learning models trained on satellite imagery
                        and meteorological data to detect cyclone patterns. By analyzing
                        cloud structures and environmental conditions, our system predicts
                        cyclone risk with high accuracy.
                    </p>
                </div>

                {/* RIGHT */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-2xl font-semibold mb-4 text-green-400">
                        🎯 Why It Matters
                    </h2>

                    <p className="text-gray-300 leading-relaxed">
                        Early cyclone detection can save lives and reduce damage. Our AI
                        system helps authorities and individuals make informed decisions
                        by providing fast, accurate, and reliable predictions.
                    </p>
                </div>

            </div>

            {/* FEATURES SECTION */}
            <div className="max-w-6xl mx-auto px-6 mt-16 grid md:grid-cols-3 gap-6">

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">🧠 AI Prediction</h3>
                    <p className="text-gray-400">
                        Deep learning models analyze cloud patterns from images.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">🌦️ Weather Data</h3>
                    <p className="text-gray-400">
                        Integrates real-time weather conditions for better accuracy.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">⚡ Fast Results</h3>
                    <p className="text-gray-400">
                        Get instant predictions with risk analysis and confidence scores.
                    </p>
                </div>

            </div>

            {/* FOOTER */}
            <div className="text-center mt-20 pb-10 text-gray-500">
                Built with ❤️ using AI & React
            </div>
        </div>
    );
}

export default About;