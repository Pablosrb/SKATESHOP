import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '@/services/authService';
import '@/styles/Login.css'; // Reutilizamos estilos

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
            // Registrar usuario
            const data = await registerUser(name, email, password);

            // Guardar tken
            const token = data.access_token;

            if (token) {
                localStorage.setItem('user_token', token);
                
                if (data.data) { 
                    localStorage.setItem('user_data', JSON.stringify(data.data));
                }

                console.log('Registro exitoso, redirigiendo...');
                navigate('/catalogo'); 
            } else {
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
                
                <p>
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;