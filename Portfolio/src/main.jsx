import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import App from "./App.jsx";
import "./index.css";
import Navbar from "./NavBar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      {" "}
      {/* Enveloppez votre application dans Router */}
      <Navbar />
      <App />
    </Router>
  </StrictMode>
);
