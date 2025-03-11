import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar-border bg-black bg-opacity-90 text-white py-4 shadow-lg border-b-2 border-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="navbar-brand">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide text-shadow-bright"
          >
            Mon Portfolio
          </Link>
        </div>
        <ul className="navbar-links flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-105 text-shadow-bright"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/veille"
              className="hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-105 text-shadow-bright"
            >
              Veille Informationnelle
            </Link>
          </li>
          <li>
            <Link
              to="/excel"
              className="hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-105 text-shadow-bright"
            >
              Tableau E4
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
