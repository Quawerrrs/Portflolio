import React from "react";

const Projets = () => {
  // Exemple de données de projets en entreprise et en cours
  const projetsEntreprise = [
    {
      titre: "Projet A en entreprise",
      description: "Développement d'une application de gestion des stocks.",
    },
    {
      titre: "Projet B en entreprise",
      description: "Refonte du site web corporate.",
    },
  ];

  const projetsEnCours = [
    {
      titre: "Projet A en cours",
      description: "Application de suivi des performances en temps réel.",
    },
    {
      titre: "Projet B en cours",
      description: "Développement d'une plateforme e-learning.",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Projets</h1>

      {/* Section des projets en entreprise */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Projets en entreprise</h2>
        <ul className="space-y-4">
          {projetsEntreprise.map((projet, index) => (
            <li
              key={index}
              className="p-4 bg-gray-800 text-white rounded shadow-md"
            >
              <h3 className="text-xl font-bold">{projet.titre}</h3>
              <p>{projet.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section des projets en cours */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Projets en cours</h2>
        <ul className="space-y-4">
          {projetsEnCours.map((projet, index) => (
            <li
              key={index}
              className="p-4 bg-gray-800 text-white rounded shadow-md"
            >
              <h3 className="text-xl font-bold">{projet.titre}</h3>
              <p>{projet.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Projets;
