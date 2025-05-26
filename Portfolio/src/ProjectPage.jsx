import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importer Framer Motion

const projectFiles = [
  "../projects/project1.json",
  "../projects/project2.json",
  "../projects/project3.json",
  "../projects/project4.json",
  "../projects/project5.json",
]; // Liste des fichiers JSON

function ProjectPage() {
  const { id } = useParams(); // Récupère l'ID du projet dans l'URL
  const navigate = useNavigate(); // Pour naviguer entre les pages
  const [project, setProject] = useState(null); // État pour stocker les détails du projet
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    const loadProjectDetails = async () => {
      try {
        const projectPromises = projectFiles.map((file) =>
          fetch(file).then((res) => res.json())
        );
        const projectsData = await Promise.all(projectPromises);
        const project = projectsData.flat().find((p) => p.id === parseInt(id));

        if (project) {
          setProject(project);
        } else {
          throw new Error("Projet non trouvé");
        }

        setLoading(false); // Fin du chargement
      } catch (error) {
        console.error("Erreur lors du chargement du projet:", error);
        setError(error.message); // Gérer l'erreur
        setLoading(false);
      }
    };

    loadProjectDetails(); // Charger les détails du projet
  }, [id]);

  if (loading) {
    return <p className="text-center text-white">Chargement du projet...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Erreur: {error}</p>;
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-800 text-white p-6"
      initial={{ opacity: 0, y: 50 }} // Animation au départ
      animate={{ opacity: 1, y: 0 }} // Animation à l'arrivée
      exit={{ opacity: 0, y: -50 }} // Animation en quittant
      transition={{ duration: 0.5, ease: "easeInOut" }} // Durée et type d'animation
    >
      {/* Navbar */}
      <nav className="bg-gray-900 p-4">
        <h1 className="text-xl font-bold text-center text-white">
          Détails du projet
        </h1>
      </nav>

      {/* Bouton de retour */}
      <div className="flex justify-start items-center p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white text-lg bg-blue-500 px-4 py-2 rounded hover:bg-blue-400 transition-colors"
        >
          ← Retour
        </button>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex items-start justify-center gap-6 mt-6">
          {/* Image */}
          <img
            src={project.image}
            alt={project.title}
            className="rounded-md h-auto max-w-sm object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg mb-4">{project.description}</p>

            {/* Détails du projet */}
            <div className="bg-gray-700 p-4 rounded-md">
              <h2 className="text-xl text-blue-300">Détails du projet</h2>
              <p className="text-gray-300">
                Technologies: {project.details?.technologies || "Non spécifié"}
              </p>
              <p className="text-gray-300">
                Objectif: {project.details?.objectif || "Non spécifié"}
              </p>
              <p className="text-gray-300">
                Date de début: {project.details?.date || "Non spécifié"}
              </p>
            </div>

            {/* Affichage des documents associés */}
            {project.docs && project.docs.length > 0 && (
              <div className="bg-gray-700 p-4 rounded-md mt-6">
                <h2 className="text-xl text-blue-300">Documents associés</h2>
                <ul className="space-y-2">
                  {project.docs.map((doc, index) => (
                    <li key={index} className="text-gray-300">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        {doc.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectPage;
