import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom'; // Usamos NavLink para detectar la ruta activa
import '../styles/Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); //Para detectar si cambiamos de ruta y asi checkear el user
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Menú usuario 
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1. Buscamos la llave exacta que usaste en Login.tsx ('user_data')
    const storedUser = localStorage.getItem('user_data');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al leer datos del usuario", error);
        setUser(null);
      }
    } else {
      // Si no hay datos, aseguramos que el estado esté limpio
      setUser(null);
    }
  }, [location]);

  const toggleMenu = () => {setIsMenuOpen(!isMenuOpen);}; // Menu movil abrir
  const closeMenu = () => {setIsMenuOpen(false);}; // Menu movil cerrar
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Usuario menu


  const handleProfileClick = () => {
    navigate('/perfil'); // Ajusta la ruta si es diferente
    setIsDropdownOpen(false); // Cerramos el menú
  };

  // cerrar sesion
  const handleLogout = () => {
    // 2. Limpiamos EXACTAMENTE lo que guardaste en el Login
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    
    setUser(null);
    navigate('/login');
    closeMenu();
  };

  const handleMyItems = () => {
    navigate('/mis-anuncios'); 
  };

  return (
    <header className="header">
      
      {/* 1. LOGO */}
      <div className="header-logo" onClick={() => navigate('/')}>
        <h1>SKATE<span className="accent">SHOP</span></h1>
      </div>

      {/* 2. NAVEGACIÓN */}
      {/* Añadimos la clase 'open' dinámicamente si el estado es true */}
      <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {/* NavLink nos permite saber si el link está activo automáticamente */}
          <li> <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }onClick={closeMenu}> Inicio </NavLink> </li>
          <li> <NavLink to="/catalogo" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}> Catálogo </NavLink> </li>
          <li> <NavLink to="/segunda-mano" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}> 2da Mano </NavLink> </li>
          <li> <NavLink to="/skatesparks" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}> Skatesparks </NavLink> </li> 
          
          {/* Mostrar Logout dentro del menú móvil también */}
          {/* {isMenuOpen && user && (
            <li className="mobile-only-logout" onClick={handleLogout}>
              <span className="nav-link" style={{color: 'red'}}>Cerrar Sesión</span>
            </li>
          )} */}

          </ul>
      </nav>

      {/* 3. ACCIONES */}
      <div className="header-actions">
        
        <button className="btn-icon" aria-label="Buscar">🔍</button>

        <button className="btn-cart" onClick={() => navigate('/carrito')}>
           🛒 <span className="cart-count">0</span>
        </button>

        {/* LÓGICA DE USUARIO */}
        {/* --- LÓGICA DE USUARIO CON DESPLEGABLE --- */}
        {user ? (
          <div className="user-dropdown-container">
            {/* El botón que muestra el nombre */}
            <div className="user-trigger" onClick={toggleDropdown}>
              <span className="user-name">{user.name}</span>
              <span className="arrow">▼</span>
            </div>

            {/* El menú desplegable (Solo se ve si isDropdownOpen es true) */}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleProfileClick}>
                  👤 Perfil
                </button>
                <button className="dropdown-item" onClick={handleMyItems}>
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


        {/* <button className="btn-login" onClick={() => navigate('/login')}>
           Login
        </button> */}

        {/* Botón Móvil: Ahora ejecuta toggleMenu al hacer clic */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

    </header>
  );
};

export default Header;