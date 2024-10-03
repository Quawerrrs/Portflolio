import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Navbar from "./NavBar.jsx";
import Projets from "./Projets.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <body className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white animate-subtleGradientMove bg-[length:200%_200%] h-screen">
      <Navbar />
      <div className="container mx-auto px-4">
        <App />
        <Projets />
      </div>
    </body>
  </StrictMode>
);
