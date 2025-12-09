import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // AHORA COMPROBAMOS DE VERDAD
    // Buscamos si existe el token en la memoria del navegador
    const token = localStorage.getItem('user_token');
    
    // Truco: Convertimos el string a booleano (si hay texto es true, si es null es false)
    const isAuthenticated = !!token; 

    if (!isAuthenticated) {
        // Si no hay token, lo mandamos al Login
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;