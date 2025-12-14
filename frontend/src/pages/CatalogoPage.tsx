import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import '@/styles/CatalogoPage.css';

const CatalogoPage: React.FC = () => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) return <div className="loading-spinner">Cargando productos...</div>;
  
  if (isError) return <div className="error-message">Error: {error.message}</div>;

  return (
    <div className="catalogo-container">
      <h1>Nuestros Productos</h1>
      
      <div className="products-grid">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No hay productos disponibles actualmente.</p>
        )}
      </div>
    </div>
  );
};

export default CatalogoPage;