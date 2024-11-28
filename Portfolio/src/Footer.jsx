import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
      <p>
        &copy; {new Date().getFullYear()} Mon Portfolio. Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
