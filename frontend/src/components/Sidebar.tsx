import React from 'react';
import '../styles/Sidebar.css'; // Archivo CSS

// 1. Define Interface para las props que recibe el componente
interface SidebarProps {
  menuItems?: { name: string; path: string }[];

  activeItem?: string; 

}

// 2. Usamos React.FC<SidebarProps> para aplicar el tipado
const Sidebar: React.FC<SidebarProps> = ({ menuItems = [], activeItem }) => {
  return (
    <aside className="sidebar">
        <h2>Categorías</h2>
        <ul>
            {menuItems.map((item) => (
                <li key={item.name}>
                    <button 
                        className={`sidebar-button ${activeItem === item.name ? 'active' : ''}`}
                        onClick={() => console.log(`Filtrar por: ${item.name}`)}
                    >
                        {item.name}
                    </button>
                </li>
            ))}
        </ul>
        <p>Aplica filtros aquí (Próximamente)</p>
    </aside>
  );
};

export default Sidebar;