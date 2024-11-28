import React, { useState } from "react";
import * as XLSX from "xlsx"; // Importer SheetJS pour lire les fichiers Excel

const ExcelViewer = ({ filePath }) => {
  const [tableData, setTableData] = useState(null);

  const loadExcel = async () => {
    try {
      // Charger le fichier Excel depuis l'URL
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();

      // Lire le fichier Excel avec SheetJS
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      // Prendre la première feuille
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convertir la feuille en JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Stocker les données dans l'état
      setTableData(jsonData);
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier Excel :", error);
    }
  };

  // Charger les données au montage
  React.useEffect(() => {
    loadExcel();
  }, [filePath]);

  if (!tableData) {
    return (
      <p className="text-center text-white">Chargement du fichier Excel...</p>
    );
  }

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
      <h1 className="text-2xl mb-4">Tableau Excel</h1>
      <table className="table-auto border-collapse border border-gray-500 w-full text-white">
        <thead>
          <tr>
            {tableData[0]?.map((header, index) => (
              <th
                key={index}
                className="border border-gray-600 px-4 py-2 bg-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-600 px-4 py-2 text-center"
                >
                  {cell || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelViewer;
