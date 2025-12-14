import React from 'react';

interface AdminToolbarProps {
    isAdmin: boolean;
    status: string;
    onStart: () => void;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({ isAdmin, status, onStart }) => {
    if (!isAdmin) return null;

    return (
        <div style={{ border: '1px dashed #ef4444', padding: '15px', marginBottom: '20px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)' }}>
            <strong style={{color: '#ef4444', display: 'block', marginBottom: '10px'}}> PANEL DE ADMIN</strong>
            {status === 'open' && (
                <button 
                    onClick={onStart} 
                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    CERRAR INSCRIPCIONES E INICIAR BRACKET
                </button>
            )}
            {status !== 'open' && <span style={{color: '#aaa'}}>El torneo está en curso. Pulsa las coronas 👑 para avanzar ronda.</span>}
        </div>
    );
};