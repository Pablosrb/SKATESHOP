import React from 'react';
import '../styles/HomePage.css'; // <--- IMPORTANTE: Descomenta esto para importar los estilos

const HomePage: React.FC = () => {
  return (
    <div className="home-content">
      
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          RIDE OR <span className="highlight">DIE</span>
        </h1>
        <p className="hero-subtitle">
          Las mejores tablas, ejes y rodamientos para dominar la calle.
        </p>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
         <h2 className="section-title">
            Novedades de la semana
         </h2>
         
         <div className="product-grid">
            {/* Cards simuladas */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="product-card">
                <div className="card-image-placeholder"></div>
                <h3>Tabla Pro Model {item}</h3>
                <p className="card-price">85.00 €</p>
              </div>
            ))}
         </div>
      </section>
      
    </div>
  );
};

export default HomePage;

// // src/pages/HomePage.tsx
// import React from 'react';
// /*import '../styles/HomePage.css'; */

// const HomePage: React.FC = () => {
//   return (
//     <div className="home-content">
      

//       <section className="hero-section">
//         <h1>Bienvenido a SkateShop</h1>
//         <p>Tu tienda de confianza para tablas, ruedas y estilo urbano.</p>
//       </section>

//       {/* Aquí podrías poner banners, categorías destacadas, etc. */}
//       <section className="featured-section">
//          <h2>Novedades de la semana</h2>
//          <p>Echa un vistazo a nuestro catálogo para ver lo último.</p>
//          {/* Puedes poner un Link al catálogo aquí más adelante */}
//       </section>
//     </div>
//   );
// };

// export default HomePage;