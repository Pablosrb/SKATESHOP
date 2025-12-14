import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // 👈 Importante
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './router' // 👈 Importamos nuestro router nuevo
import './index.css'

import { CartProvider } from '@/context/CartContext';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <CartProvider>
        {/* Eliminamos <App /> y ponemos el RouterProvider */}
        <RouterProvider router={router} />
      </CartProvider>

    </QueryClientProvider>
  </React.StrictMode>,
)


// import { StrictMode } from 'react'
// import { createRoot }from 'react-dom/client'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import App from './App' // Dejaremos App como punto de entrada por ahora
// import './index.css'

// // Creamos el cliente de gestión de datos
// const queryClient = new QueryClient()

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </StrictMode>,
// )