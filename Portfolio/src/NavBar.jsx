import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar-border bg-black bg-opacity-90 text-white py-4 shadow-lg border-b-2 border-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="navbar-brand">
          <a
            href="/"
            className="text-2xl font-bold tracking-wide text-shadow-bright"
          >
            Mon Portfolio
          </a>
        </div>
        <ul className="navbar-links flex space-x-6">
          <li>
            <a
              href="/"
              className="hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-105 text-shadow-bright"
            >
              Accueil
            </a>
          </li>
          <li>
            <a
              href="/projets"
              className="hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-105 text-shadow-bright"
            >
              Projets
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-105 text-shadow-bright"
            >
              À propos
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-105 text-shadow-bright"
            >
              Tableau E4
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
