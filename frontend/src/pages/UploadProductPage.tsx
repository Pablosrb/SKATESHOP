import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUsedItem } from '@/services/usedItemService'; 
import '@/styles/UploadProduct.css';

const UploadProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    condition: 'used',
    status: 'active',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userStr = localStorage.getItem('user_data');
      if (!userStr) throw new Error("Usuario no identificado");

      const dataToSend = new FormData();
      // dataToSend.append('user_id', user.id);
      dataToSend.append('title', formData.title);
      dataToSend.append('price', formData.price);
      dataToSend.append('description', formData.description);
      dataToSend.append('condition', formData.condition);
      dataToSend.append('status', formData.status);
      
      if (imageFile) {
        dataToSend.append('image', imageFile);
      }

      await createUsedItem(dataToSend);

      const mensaje = formData.status === 'active' 
        ? '¡Anuncio publicado correctamente!' 
        : '¡Producto guardado en tus archivos!';
      
      alert(mensaje);
      navigate('/segunda-mano'); 

    } catch (error: any) {
      console.error('Error:', error);
      alert(error.message || 'Hubo un error al guardar el producto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Vender mi Material</h2>
        <p className="upload-subtitle">Publica tu anuncio en Skateshop</p>

        <form onSubmit={handleSubmit} className="upload-form">
          
          {/* NOMBRE */}
          <div className="form-group">
            <label>Título</label>
            <input 
              type="text" 
              name="title" 
              placeholder="Ej: Tabla Element casi nueva" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              maxLength={255}
            />
          </div>

          <div className="form-row">
            {/* PRECIO */}
            <div className="form-group">
              <label>Precio (€)</label>
              <input 
                type="number" 
                name="price" 
                placeholder="0.00" 
                min="0"
                step="0.01"
                value={formData.price} 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* ESTADO */}
            <div className="form-group">
              <label>Estado del producto</label>
              <select name="condition" value={formData.condition} onChange={handleChange}>
                <option value="new">Nuevo (Sin usar)</option>
                <option value="like_new">Como nuevo</option>
                <option value="used">Usado</option>
                <option value="worn">Muy usado</option>
              </select>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              name="description" 
              rows={4} 
              placeholder="Detalles..."
              value={formData.description} 
              onChange={handleChange}
            ></textarea>
          </div>

          {/* ESTADO DE LA PUBLICACIÓN */}
          <div className="form-group" style={{background: '#f9f9f9', padding: '10px', borderRadius: '6px'}}>
            <label>Visibilidad del anuncio</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="active">🟢 Publicar ahora (Visible)</option>
              <option value="archived">🔒 Guardar como borrador (Oculto)</option>
            </select>
            <small style={{color: '#666', marginTop: '5px', display: 'block'}}>
              {formData.status === 'archived' 
                ? 'El producto se guardará pero nadie podrá verlo todavía.' 
                : 'El producto aparecerá inmediatamente en la tienda.'}
            </small>
          </div>

          {/* IMAGEN */}
          <div className="form-group">
            <label>Foto</label>
            <div className="file-upload-wrapper">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                id="file-input"
                className="file-input"
              />
              <label htmlFor="file-input" className="file-label">
                {imageFile ? 'Cambiar imagen' : 'Seleccionar imagen...'}
              </label>
            </div>
            
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Vista previa" />
              </div>
            )}
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading 
              ? 'Guardando...' 
              : (formData.status === 'active' ? 'Publicar Anuncio' : 'Guardar Borrador')
            }
          </button>

        </form>
      </div>
    </div>
  );
};

export default UploadProductPage;