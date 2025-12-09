// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import CatalogoPage from '@/pages/CatalogoPage';
import ProductPage from '@/pages/ProductPage';
import SecondHandPage from '@/pages/SecondHandPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';



import ProtectedRoute from '@/components/ProtectedRoute';



export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />, 
        children: [
            {
                index: true, 
                element: <HomePage />,
            },
            {
                path: 'catalogo',
                element: <CatalogoPage />,
            },
            { 
                path: 'producto/:id', 
                element: <ProductPage /> 
            },
            {
                path: '/login',
                element: <LoginPage />, 
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
            {
                element: <ProtectedRoute />, 
                children: [
                    {
                        path: '/segunda-mano',
                        element: <SecondHandPage />, 
                    },
                    {
                        path: '/vender',
                        element: <div>Formulario de Venta (Próximamente)</div>
                    }
                ]
            }
        ],
    },
    {
        path: '*',
        element: <h1>404 - Página no encontrada</h1>,
    }
]);