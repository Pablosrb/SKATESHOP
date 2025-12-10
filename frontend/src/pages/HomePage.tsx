import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/productService'; 
import { type Product } from '../types/product';
import ProductCard from '../components/ProductCard'; 
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const STORAGE_URL = 'http://localhost:8000/storage';

  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const allProducts = await getProducts();
        const sortedNews = [...allProducts].sort((a, b) => b.id - a.id).slice(0, 4);
        setNewArrivals(sortedNews);
      } catch (error) {
        console.error("Error cargando novedades", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNovedades();
  }, []);

  return (
    <div className="home-content">
      
      {/* HERO SECTION */}
      <div className="hero-split-container">
        
        {/* IZQUIERDA */}
        <div className="hero-half left" onClick={() => navigate('/catalogo')}>
          <div className="hero-overlay">
            <h2 className="split-title">RIDE</h2>
            <span className="split-subtitle">Ir al Catálogo</span>
          </div>
        </div>

        {/* CENTRO: LÍNEA VERTICAL QUE CONTIENE EL CÍRCULO */}
        <div className="hero-divider">
            <div className="or-circle">OR</div>
        </div>

        {/* DERECHA */}
        <div className="hero-half right" onClick={() => navigate('/events')}>
          <div className="hero-overlay">
            <h2 className="split-title highlight">DIE</h2>
            <span className="split-subtitle">Próximos Eventos</span>
          </div>
        </div>

      </div>

      {/* NOVEDADES */}
      <section className="featured-section">
         <h2 className="section-title">Novedades de la semana</h2>
         {loading ? (
            <p style={{textAlign: 'center'}}>Cargando novedades...</p>
         ) : (
            <div className="product-grid">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
         )}
      </section>
      
    </div>
  );
};

export default HomePage;