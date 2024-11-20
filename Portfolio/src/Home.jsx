import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importation de Link pour gérer la navigation

// Liste des fichiers JSON des projets
const projectFiles = ["/projects/project1.json", "/projects/project2.json"];

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectPromises = projectFiles.map((file) =>
          fetch(file).then((res) => {
            if (!res.ok) {
              throw new Error(`Erreur de chargement du fichier: ${file}`);
            }
            return res.json();
          })
        );

        const projectsData = await Promise.all(projectPromises);
        setProjects(projectsData.flat()); // Aplatir les projets si plusieurs fichiers
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error);
        setError(error.message);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-300">
        Découvrez mes projets
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-700 rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-600"
          >
            <img
              src={project.image}
              alt={project.title}
              className="mb-4 rounded-md h-48 w-full object-cover"
            />
            <h2 className="text-xl font-semibold mb-2 text-blue-300">
              {project.title}
            </h2>
            <p className="text-gray-300 mb-4">{project.description}</p>

            {/* Correctement formater le Link pour rediriger vers la page projet */}
            <Link
              to={`/project/${project.id}`} // Lien dynamique vers la page de détails
              className="inline-block text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Voir le projet →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
