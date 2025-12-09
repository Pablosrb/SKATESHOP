import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // Definición de los elementos del menú principal
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: '2da Mano', path: '/segunda-mano' },
    { name: 'Eventos', path: '/eventos' },
    { name: 'Skateparks', path: '/skateparks' },
    { name: 'Quiénes Somos', path: '/quienes-somos' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navItems.map((item) => (
          <li key={item.name} className="navbar-item">
            <button 
              className="navbar-link" 
              onClick={() => handleNavClick(item.path)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;