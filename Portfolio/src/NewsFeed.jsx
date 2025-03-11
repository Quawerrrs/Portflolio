import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            q: 'PhP',
            apiKey: 'e469cb3939414fee85c5a55f2f8ffcc9',
          },
        });
        console.log(response.data); // Ajouter cette ligne pour voir la réponse dans la console
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Erreur API : ", error); // Log des erreurs API
        setError('Erreur lors de la récupération des articles');
      } finally {
        setLoading(false);
      }
    };
  
    fetchNews();
  }, []);
  
  // Affichage pendant le chargement
  if (loading) {
    return <div className="text-center text-lg font-semibold">Chargement des actualités...</div>;
  }

  // Affichage en cas d'erreur
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Affichage des articles récupérés
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Veille Informationnelle</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              src={article.urlToImage || 'https://via.placeholder.com/150'}
              alt={article.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
              <p className="text-gray-700 mb-4">{article.description || 'Pas de description disponible'}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Lire l'article
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
