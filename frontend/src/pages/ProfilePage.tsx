import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile, type UserProfile } from '@/services/userService';
import '@/styles/ProfilePage.css';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    
    // Estado de la UI
    const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    // Datos del Usuario (Estado local)
    const [user, setUser] = useState<UserProfile | null>(null);

    // Formulario de Datos Personales
    const [formData, setFormData] = useState({
        name: '',
        email: '', // Solo visualización
    });

    // Formulario de Contraseña
    const [passData, setPassData] = useState({
        current_password: '', 
        password: '',         
        password_confirmation: '' 
    });

    // 1. CARGAR DATOS AL INICIAR
    useEffect(() => {
        const fetchUserData = async () => {
            // Obtenemos el ID del localStorage (guardado en el Login)
            const storedToken = localStorage.getItem('user_token');
            // A veces guardamos el objeto user entero, si no, hay que decodificar token o llamar a /me
            // Asumiremos que guardaste el objeto user o al menos el ID al hacer login.
            const storedUserStr = localStorage.getItem('user_data');

            if (!storedToken || !storedUserStr) {
                navigate('/login');
                return;
            }

            try {
                const localUser = JSON.parse(storedUserStr);
                
                // Llamamos a la API para tener los datos frescos de la BD
                const dbUser = await getUserProfile(localUser.id);
                
                setUser(dbUser);
                setFormData({
                    name: dbUser.name,
                    email: dbUser.email,
                });
            } catch (error) {
                console.error('Error cargando perfil:', error);
                // Si falla el token, al login
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    // 2. MANEJAR CAMBIOS INPUTS
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassData({ ...passData, [e.target.name]: e.target.value });
    };

    // 3. ACTUALIZAR NOMBRE
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!user) return;

        try {
            // Enviamos solo el name (el email no se toca)
            await updateUserProfile(user.id, { name: formData.name });
            
            setMessage({ type: 'success', text: 'Perfil actualizado correctamente.' });
            
            // Actualizamos el user local para refrescar la UI
            setUser({ ...user, name: formData.name });

            // Opcional: Actualizar localStorage para el Header
            const storedUser = JSON.parse(localStorage.getItem('user_data') || '{}');
            storedUser.name = formData.name;
            localStorage.setItem('user_data', JSON.stringify(storedUser));

        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error al actualizar.' });
        }
    };

    // 4. ACTUALIZAR PASSWORD
    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!user) return;

        if (passData.password !== passData.password_confirmation) {
            setMessage({ type: 'error', text: 'Las contraseñas nuevas no coinciden.' });
            return;
        }

        if (passData.password.length < 6) {
            setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres.' });
            return;
        }

        try {
            await updateUserProfile(user.id, passData);
            setMessage({ type: 'success', text: 'Contraseña cambiada con éxito.' });
            setPassData({ current_password: '', password: '', password_confirmation: '' });
        } catch (error: any) {
            // Laravel suele devolver 422 si la current_password está mal
            const msg = error.response?.data?.message || 'Error al cambiar contraseña. Verifica tu clave actual.';
            setMessage({ type: 'error', text: msg });
        }
    };

    if (loading) return <div className="profile-container" style={{textAlign:'center', marginTop:'50px'}}>Cargando...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header-section">
                <h1 className="profile-title">Mi Cuenta</h1>
                {user?.role === 'admin' && (
                    <span style={{ 
                        backgroundColor: '#000', color: '#fff', 
                        padding: '4px 8px', borderRadius: '4px', 
                        fontSize: '0.8rem', marginLeft: '10px', verticalAlign: 'middle' 
                    }}>
                        ADMINISTRADOR
                    </span>
                )}
            </div>

            {/* PESTAÑAS */}
            <div className="profile-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    DATOS PERSONALES
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    HISTORIAL DE PEDIDOS
                </button>
            </div>

            {/* ALERTAS */}
            {message && (
                <div className={`alert-msg ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="tab-content">
                {/* --- PESTAÑA 1: PERFIL --- */}
                {activeTab === 'profile' && (
                    <div className="profile-forms">
                        
                        {/* DATOS BÁSICOS */}
                        <div className="form-section">
                            <h3>Información Personal</h3>
                            <form onSubmit={handleUpdateProfile}>
                                <div className="form-group">
                                    <label>Nombre completo</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email (No modificable)</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        disabled 
                                        style={{ backgroundColor: '#f5f5f5', color: '#666', cursor: 'not-allowed' }}
                                    />
                                </div>
                                <button type="submit" className="btn-save">Guardar Cambios</button>
                            </form>
                        </div>

                        <hr className="divider" />

                        {/* SEGURIDAD */}
                        <div className="form-section">
                            <h3>Cambiar Contraseña</h3>
                            <form onSubmit={handleUpdatePassword}>
                                <div className="form-group">
                                    <label>Contraseña Actual</label>
                                    <input 
                                        type="password" 
                                        name="current_password" 
                                        placeholder="••••••••"
                                        value={passData.current_password}
                                        onChange={handlePassChange}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nueva Contraseña</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            placeholder="Nueva clave"
                                            value={passData.password}
                                            onChange={handlePassChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Repetir Nueva</label>
                                        <input 
                                            type="password" 
                                            name="password_confirmation" 
                                            placeholder="Repetir clave"
                                            value={passData.password_confirmation}
                                            onChange={handlePassChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn-save btn-black">Actualizar Contraseña</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* --- PESTAÑA 2: PEDIDOS --- */}
                {activeTab === 'orders' && (
                    <div className="orders-placeholder">
                        <div className="wip-icon">📦</div>
                        <h2>Historial de Pedidos</h2>
                        <p>Aquí aparecerán tus compras próximamente.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;