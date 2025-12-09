// // src/App.tsx (Código actualizado para usar el Router)

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import CatalogoPage from './pages/CatalogoPage'; // ¡Importamos el Catálogo!
// import './styles/App.css'; 

// const App: React.FC = () => {
//   return (
//     // <Router> envuelve toda la aplicación para manejar la navegación
//     <Router>
//       <div className="App">
//         {/* <Routes> define las diferentes vistas (páginas) */}
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/catalogo" element={<CatalogoPage />} />

//           {/* Aquí añadiríamos otras rutas: /segunda-mano, /eventos, /producto/:id, etc. */}








//           {/* Ruta de fallback si la URL no coincide */}
//           <Route path="*" element={<h1>404 | Página no encontrada</h1>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;