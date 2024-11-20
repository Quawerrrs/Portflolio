import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importer Link pour les navigations internes

// Liste des fichiers JSON des projets
const projectFiles = [
  "/projects/project1.json",
  "/projects/project2.json",
  "/projects/project3.json",
];

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Pour afficher un message de chargement
  const [error, setError] = useState(null); // Pour afficher les erreurs

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectPromises = projectFiles.map((file) =>
          fetch(file).then((res) => res.json())
        );
        const projectsData = await Promise.all(projectPromises);
        setProjects(projectsData.flat());
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error);
        setError(error.message); // Afficher l'erreur
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return <p className="text-center text-white">Chargement des projets...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Erreur: {error}</p>;
  }

  // Séparer les projets en "Formation" et "Entreprise"
  const formationProjects = projects.filter(
    (project) => project.category === "Formation"
  );
  const entrepriseProjects = projects.filter(
    (project) => project.category === "Entreprise"
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-300">
        Découvrez mes projets
      </h1>

      {/* Section Formation */}
      <div className="w-full max-w-6xl mb-8">
        <h2 className="text-2xl font-semibold text-blue-300 mb-4">
          Projets de Formation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {formationProjects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`} // Naviguer vers la page de détails du projet
              className="bg-gray-700 rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-600"
            >
              {/* Afficher l'image du projet */}
              <img
                src={project.image}
                alt={project.title}
                className="mb-4 rounded-md h-48 w-full object-cover"
              />
              <h2 className="text-xl font-semibold mb-2 text-blue-300">
                {project.title}
              </h2>
              <p className="text-gray-300 mb-4">{project.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Section Entreprise */}
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold text-blue-300 mb-4">
          Projets d'Entreprise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {entrepriseProjects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`} // Naviguer vers la page de détails du projet
              className="bg-gray-700 rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-600"
            >
              {/* Afficher l'image du projet */}
              <img
                src={project.image}
                alt={project.title}
                className="mb-4 rounded-md h-48 w-full object-cover"
              />
              <h2 className="text-xl font-semibold mb-2 text-blue-300">
                {project.title}
              </h2>
              <p className="text-gray-300 mb-4">{project.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
