import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css'; 

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      
      <Header />

      <main className="content-area">
        <Outlet />
      </main>
      
    </div>
  );
};

export default MainLayout;