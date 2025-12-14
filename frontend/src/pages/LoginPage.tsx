import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '@/services/authService';
import '@/styles/Login.css';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    
    // Estados del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setLoading(true);
        setError(null);

        try {
            const data = await loginUser(email, password);

            const token = data.token || data.access_token; 
            
            if (!token) {
                throw new Error('No se recibió el token de seguridad.');
            }

            localStorage.setItem('user_token', token);
            
            if (data.user) {
                localStorage.setItem('user_data', JSON.stringify(data.user));
            }

            console.log('Login exitoso, redirigiendo...');
            navigate('/catalogo'); 

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Iniciar Sesión</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
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
                            placeholder="********"
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? 'Cargando...' : 'Entrar'}
                    </button>
                </form>
                
                <p>
                    ¿No tienes cuenta?{' '}
                    <Link to="/register">
                        Regístrate aquí
                    </Link>
                </p>    
            </div>
        </div>
    );
};

export default LoginPage;