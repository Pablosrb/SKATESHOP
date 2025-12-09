import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import '../styles/Login.css'; // Reutilizamos estilos

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    
    // Estados
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Registrar usuario
            const data = await registerUser(name, email, password);

            // 2. Guardar token (Auto-Login)
            // Tu backend devuelve 'access_token' en el registro también
            const token = data.access_token;

            if (token) {
                localStorage.setItem('user_token', token);
                
                // Si quieres guardar datos del usuario:
                if (data.data) { // Nota: en el register de Laravel lo llamaste 'data' al user
                    localStorage.setItem('user_data', JSON.stringify(data.data));
                }

                console.log('Registro exitoso, redirigiendo...');
                navigate('/catalogo'); // O a donde prefieras
            } else {
                // Si por alguna razón no llega el token, mándalo al login
                navigate('/login');
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Crear Cuenta</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* CAMPO NOMBRE (Nuevo) */}
                    <div className="form-group">
                        <label>Nombre</label>
                        <input 
                            type="text" 
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tony Hawk"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="skater@ejemplo.com"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 8 caracteres"
                            minLength={8}
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
                
                <p style={{marginTop: '20px', fontSize: '0.9rem'}}>
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}}>
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;