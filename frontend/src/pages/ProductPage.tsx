import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { type Product } from '../types/product';
import '../styles/ProductPage.css';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Captura el ID de la URL
  const navigate = useNavigate();
  
  // Estados de datos
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados visuales
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Imagen por defecto si el producto no tiene imagen o es null
  const placeholderImage = "https://images.unsplash.com/photo-1520045864981-8fee18241669?auto=format&fit=crop&q=80";

  // Tallas simuladas (Ya que no vienen en tu BD, las ponemos fijas para que quede bonito)
  const sizes = ['7.75"', '8.0"', '8.125"', '8.25"', '8.5"'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        setLoading(true);
        setError(null);

        // 1. Llamada real a tu API
        const data = await getProductById(id);
        setProduct(data);

      } catch (err) {
        console.error("Error cargando producto:", err);
        setError('No se pudo cargar el producto. Inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // --- RENDERIZADO DE ESTADOS DE CARGA ---

  if (loading) {
    return (
      <div className="product-page-container" style={{ padding: '100px', textAlign: 'center' }}>
        <h2>Cargando tabla... 🛹</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-page-container" style={{ padding: '100px', textAlign: 'center' }}>
        <h2 style={{ color: 'red' }}>{error || 'Producto no encontrado'}</h2>
        <a href="/" style={{ textDecoration: 'underline' }}>Volver al inicio</a>
      </div>
    );
  }

  // --- RENDERIZADO DEL PRODUCTO REAL ---

  return (
    <div className="product-page-container">
      
      {/* Miga de pan */}
      <div className="breadcrumbs">
        {/* Aquí preguntamos: ¿Existe product.category? Si sí, pon su nombre. Si no, pon "Catálogo" */}
        Inicio <span>/</span> {product.category?.name || 'Catálogo'} <span>/</span> {product.name}
      </div>

      <button onClick={() => navigate('/catalogo')} style={{ marginBottom: '20px', cursor: 'pointer', background:'none', border:'none', textDecoration:'underline' }}>
        ← Volver al catálogo
      </button>

      <div className="product-main-grid">
        
        {/* COLUMNA IZQUIERDA: FOTO */}
        <div className="product-gallery">
          <div className="main-image-container">
            {/* Si product.image es null, usa el placeholder */}
            <img 
              src={product.image ? product.image : placeholderImage} 
              alt={product.name} 
              className="main-image" 
            />
          </div>
        </div>

        {/* COLUMNA DERECHA: INFO */}
        <div className="product-info">
          {/* Usamos un texto fijo o mapeamos el ID si quisieras, 
              porque mostrar "Marca: 4" queda feo */}
          <h4 className="product-brand">
            {product.brand?.name || 'MARCA DESCONOCIDA'}
          </h4>

          <h1 className="product-title">{product.name}</h1>
          
          {/* El precio viene como string, le añadimos el euro */}
          <span className="product-price">{product.price} €</span>
          
          <p className="product-description">
            {product.description || "Sin descripción disponible para este producto."}
          </p>

          {/*STOCK*/}
          <div style={{ marginBottom: '20px', fontSize: '0.9rem' }}>
            <strong style={{ color: product.stock > 10 ? 'green' : 'red' }}>
              {product.stock > 10 
                ? 'DISPONIBLE' 
                : product.stock > 0 
                  ? 'POCAS UNIDADES' 
                  : 'AGOTADO'
              }
            </strong>
          </div>

          {/* SELECTOR DE TALLAS (VISUAL) */}
          <div className="size-selector-container">
            <label className="size-selector-label">Selecciona el ancho:</label>
            <div className="size-options">
              {sizes.map((size) => (
                <button 
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BOTONES */}
          <div className="action-buttons">
            <button 
              className="add-to-cart-btn"
              disabled={product.stock === 0} // Desactiva si no hay stock
              style={product.stock === 0 ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {}}
            >
              {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;