import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <Link to="/" className="logo">OptiCV.AI</Link>
        <ul className="nav-links">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/cv-generator">Générateur CV</Link></li>
          <li><Link to="/pricing">Tarifs</Link></li>
          <li><Link to="/login">Connexion</Link></li>
          <li><Link to="/register">Inscription</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;