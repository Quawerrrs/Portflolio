import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const projectFiles = ["/projects/project1.json", "/projects/project2.json"]; // Liste des fichiers JSON

function ProjectPage() {
  const { id } = useParams(); // Récupère l'ID du projet à partir de l'URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isImageModalOpen, setImageModalOpen] = useState(false); // Pour gérer l'ouverture/fermeture du modal image

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

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement du projet:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    loadProjectDetails();
  }, [id]);

  const handleImageClick = () => {
    setImageModalOpen(true); // Ouvre le modal lorsque l'image est cliquée
  };

  const closeImageModal = () => {
    setImageModalOpen(false); // Ferme le modal
  };

  if (loading) {
    return (
      <p className="text-center text-white">
        Chargement des détails du projet...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Erreur: {error}</p>;
  }

  if (!project) {
    return <p className="text-center text-red-500">Projet non trouvé</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

      {/* Afficher l'image en petite taille, cliquable pour ouvrir le modal */}
      <img
        src={project.image}
        alt={project.title}
        className="mb-4 rounded-md h-48 w-full object-cover cursor-pointer"
        onClick={handleImageClick} // Ouvrir le modal au clic
      />

      <p className="text-lg mb-4">{project.description}</p>

      {/* Conteneur flex pour les deux blocs côte à côte */}
      <div className="flex gap-4 w-full mb-4">
        {/* Détails du projet */}
        <div className="bg-gray-700 p-4 rounded-md w-full sm:w-1/2">
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

        {/* Liste des documents */}
        {project.docs && project.docs.length > 0 && (
          <div className="bg-gray-700 p-4 rounded-md w-full sm:w-1/2">
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

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 text-blue-400 hover:text-blue-300"
      >
        Voir le projet en ligne →
      </a>

      {/* Modal pour afficher l'image en grand */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg">
            <span
              className="absolute top-0 right-0 p-4 text-white text-xl cursor-pointer"
              onClick={closeImageModal} // Ferme le modal au clic
            >
              &times;
            </span>
            <img
              src={project.image}
              alt={project.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
