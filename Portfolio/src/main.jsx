import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importer Router, Routes et Route
import "./index.css";
import Navbar from "./NavBar.jsx"; // Importation de la barre de navigation
import Home from "./Home.jsx"; // Page d'accueil
import NewsFeed from "./NewsFeed.jsx"; // Page de veille
import IAArticles from "./IAArticles.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Navbar /> {/* Affiche la barre de navigation */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Page d'accueil */}
        <Route path="/veille" element={<NewsFeed />} /> {/* Page de veille informationnelle */}
        <Route path="/ia" element={<IAArticles />} /> {/* Page de veille informationnelle */}
        
      </Routes>
    </Router>
  </StrictMode>
);
