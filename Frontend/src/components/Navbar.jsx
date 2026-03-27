import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-4 transition-all duration-300
            ${isHome
                    ? "bg-transparent text-white"
                    : "bg-black/90 backdrop-blur-md text-white shadow-md"
                }`}
        >
            {/* Logo */}
            <h1 className="font-bold text-xl tracking-wide">
                Cyclone AI
            </h1>

            {/* Links */}
            <div className="flex gap-8 text-lg">

                <Link
                    to="/"
                    className={`hover:text-blue-400 transition ${location.pathname === "/" && "text-blue-400"
                        }`}
                >
                    Home
                </Link>

                <Link
                    to="/detect"
                    className={`hover:text-blue-400 transition ${location.pathname === "/detect" && "text-blue-400"
                        }`}
                >
                    Detection
                </Link>

                <Link
                    to="/about"
                    className={`hover:text-blue-400 transition ${location.pathname === "/about" && "text-blue-400"
                        }`}
                >
                    About
                </Link>

            </div>
        </nav>
    );
}

export default Navbar;