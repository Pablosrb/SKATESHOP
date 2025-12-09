import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/App.css'; 

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      
      {/* 1. EL HEADER VA ARRIBA DEL TODO (Ocupará todo el ancho) */}
      <Header />

      {/* 2. CONTENEDOR INFERIOR (Aquí van Sidebar + Contenido lado a lado) */}
      <div className="layout-body">
        
        {/* Sidebar a la izquierda */}
        <Sidebar />
        
        {/* Contenido cambiante a la derecha */}
        <main className="content-area">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default MainLayout;