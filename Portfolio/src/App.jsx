import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProjectPage from "./ProjectPage";
import ExcelViewer from "./ExcelViewer";
import Footer from "./Footer"; // Importer le Footer

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route
          path="/excel"
          element={<ExcelViewer filePath="/assets/docs/E4.xlsx" />}
        />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
