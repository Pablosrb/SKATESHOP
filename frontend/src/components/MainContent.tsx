import React from 'react';
import '../styles/MainContent.css'; // Archivo CSS

const MainContent: React.FC = () => {
  const quienesSomosText: string = `
    Bienvenido a nuestra plataforma. Somos una empresa dedicada a [Descripción breve de la actividad]. 
    Nuestra misión es [Misión de la empresa]. Desde nuestro inicio en [Año], nos hemos esforzado por 
    ofrecer [Valores/Productos/Servicios]. ¡Explora nuestro catálogo, encuentra tesoros de segunda mano 
    y únete a nuestros eventos!
  `;

  return (
    <main className="main-content">
      <h2>👋 Quiénes Somos</h2>
      <p>{quienesSomosText}</p>
    </main>
  );
};

export default MainContent;