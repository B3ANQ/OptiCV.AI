import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [theme, setTheme] = useState<'bright' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'bright' || saved === 'dark' ? saved : 'bright';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <header>
      <nav>
        <Link to="/" className="logo">OptiCV.AI</Link>
        <ul className="nav-links">
          <li><Link to="/cv-generator">Générateur CV</Link></li>
          <li><Link to="/subscription">Tarifs</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="auth-buttons">
          <Link to="/login">
            <button className="btn-login">Connexion</button>
          </Link>
          <Link to="/register">
            <button className="btn-register">Inscription</button>
          </Link>
          <button
            className="theme-toggle"
            onClick={() => setTheme(isDark ? 'bright' : 'dark')}
            aria-label="Basculer le thème"
            title={isDark ? 'Bright' : 'Dark'}
          >
            <span className="theme-icon">{isDark ? '🌙' : '☀️'}</span>
            <span className="theme-label">{isDark ? 'Sombre' : 'Clair'}</span>
          </button>
          <Link to="/profile">
            <button className="btn-profile" aria-label="Profil" title="Mon profil">
              👤
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;