import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTournament } from '@/services/tournamentService';
import '@/styles/Login.css'; // Reutilizamos estilos del login

const CreateTournamentPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        location: '',
        max_participants: 8 // Por defecto
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createTournament(formData);
            alert('Torneo creado con éxito');
            navigate('/events'); // Volver a la lista
        } catch (error) {
            alert('Error al crear el torneo');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Nuevo Torneo 🏆</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre del Evento</label>
                        <input name="name" onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Ubicación (Skatepark)</label>
                        <input name="location" onChange={handleChange} required placeholder="Ej: Skatepark Málaga" />
                    </div>

                    <div className="form-group">
                        <label>Fecha</label>
                        <input type="date" name="start_date" onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Máx. Participantes</label>
                        <select name="max_participants" onChange={handleChange} value={formData.max_participants}>
                            <option value="4">4 (Semifinales directas)</option>
                            <option value="8">8 (Cuartos de final)</option>
                            <option value="16">16 (Octavos de final)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea name="description" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn-primary">Crear Torneo</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTournamentPage;