import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext'; 
import '../styles/Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [user, setUser] = useState<any>(null);

  // Sincronizar usuario con LocalStorage al cambiar de ruta
  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  // Handlers
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const { refreshCartUser } = useCart();

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    setUser(null);

    refreshCartUser();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      
      {/* LOGO */}
      <div className="header-logo" onClick={() => navigate('/')}>
        <h1>SKATE<span className="accent">SHOP</span></h1>
      </div>

      {/* NAVEGACIÓN */}
      <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalogo" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
              Catálogo
            </NavLink>
          </li>
          <li>
            <NavLink to="/segunda-mano" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
              2da Mano
            </NavLink>
          </li>
          <li>
            <NavLink to="/skatesparks" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
              Skatesparks
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* ACCIONES DERECHA */}
      <div className="header-actions">
        
        <button className="btn-cart" onClick={() => navigate('/carrito')}>
          🛒 <span className="cart-count">{cartCount}</span>
        </button>

        {user ? (
          <div className="user-dropdown-container">
            <div className="user-trigger" onClick={toggleDropdown}>
              <span className="user-name">{user.name}</span>
              <span className="arrow">▼</span>
            </div>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => handleNavigation('/perfil')}>
                  👤 Perfil
                </button>
                <button className="dropdown-item" onClick={() => handleNavigation('/mis-anuncios')}>
                  📂 Mis Anuncios  
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  🚪 Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="btn-login" onClick={() => navigate('/login')}>
             Iniciar Sesión
          </button>
        )}

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

    </header>
  );
};

export default Header;