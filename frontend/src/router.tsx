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
import UploadProductPage from './pages/UploadProductPage';
import UsedProductPage from './pages/UsedProductPage';
import MyUsedItemsPage from './pages/MyUsedItemsPage';
import SkateparksPage from './pages/SkateparksPage';



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
                path: '/skatesparks', // El nombre que querías
                element: <SkateparksPage />,
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
                        element: <UploadProductPage />,
                    },
                    {
                        path: '/segunda-mano/:id',
                        element: <UsedProductPage />,
                    },
                    {
                        path: '/mis-anuncios',
                        element: <MyUsedItemsPage />,
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