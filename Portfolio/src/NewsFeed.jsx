import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Récupérer des projets GitHub populaires
  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        const response = await axios.get('https://api.github.com/search/repositories', {
          params: {
            q: 'flutter',  // Utiliser un mot-clé ou un langage comme 'flutter'
            sort: 'stars',  // Trier par nombre d'étoiles
            order: 'desc',  // Trier dans l'ordre décroissant
          },
        });
        console.log(response.data.items);  // Afficher les résultats dans la console
        setProjects(response.data.items);  // Définir les projets récupérés
      } catch (error) {
        console.error('Erreur API GitHub : ', error);
        setError('Erreur lors de la récupération des projets GitHub');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  // Affichage pendant le chargement
  if (loading) {
    return <div className="text-center text-lg font-semibold">Chargement des projets...</div>;
  }

  // Affichage en cas d'erreur
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Affichage des projets GitHub récupérés
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Projets GitHub Populaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              src={project.owner.avatar_url || 'https://via.placeholder.com/150'}
              alt={project.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-3">{project.name}</h3>
              <p className="text-gray-700 mb-4">{project.description || 'Pas de description disponible'}</p>
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Voir sur GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
