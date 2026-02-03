import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} OptiCV.AI | Tous droits réservés | Réalisé par B3ANQ</p>
    </footer>
  );
};

export default Footer;