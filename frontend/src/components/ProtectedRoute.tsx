import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    // Buscamos si existe el token en la memoria del navegador
    const token = localStorage.getItem('user_token');
    
    // Lo convertimos en booleano para hacer la comprobacion sencilla
    const isAuthenticated = !!token; 

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;