import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <Link to="/" className="logo">OptiCV.AI</Link>
        <ul className="nav-links">
          <li><Link to="/cv-generator">Générateur CV</Link></li>
          <li><Link to="/pricing">Tarifs</Link></li>
        </ul>
        <div className="auth-buttons">
          <Link to="/login">
            <button className="btn-login">Connexion</button>
          </Link>
          <Link to="/register">
            <button className="btn-register">Inscription</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;