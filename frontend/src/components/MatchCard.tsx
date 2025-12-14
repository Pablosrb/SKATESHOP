import React from 'react';

// Props que nos envía la librería automáticamente
interface CustomMatchProps {
    match: any;        // Datos del partido
    onMatchClick: any; // Click genérico
    onPartyClick: any; // Click en participante
    onMouseEnter: any;
    onMouseLeave: any;
    topParty: any;     // Datos Jugador 1 (Arriba)
    bottomParty: any;  // Datos Jugador 2 (Abajo)
    // Props NUESTRAS extras
    isAdmin?: boolean;
    onDeclareWinner?: (matchId: number, winnerId: number) => void;
}

export const MatchCard: React.FC<CustomMatchProps> = ({ 
    match, topParty, bottomParty, isAdmin, onDeclareWinner 
}) => {
    
    // Función auxiliar para pintar una fila de jugador
    const renderParty = (party: any) => {
        const isWinner = party.isWinner;
        // Si el nombre es "TBD" o "Esperando...", no mostramos botón
        const hasPlayer = party.name !== 'TBD' && party.name !== 'Esperando...';
        
        // Mostrar botón si: Es admin, hay jugador real, y el partido NO tiene ganador aún
        const showAdminBtn = isAdmin && hasPlayer && match.state !== 'DONE';

        return (
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '8px 12px',
                borderBottom: '1px solid #444',
                background: isWinner ? '#dcfce7' : '#2a2a2a', // Verde si gana, oscuro si no
                color: isWinner ? '#166534' : 'white',
                fontWeight: isWinner ? 'bold' : 'normal'
            }}>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                    {party.name}
                </span>
                
                {showAdminBtn && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // Evita que la librería detecte click en el partido
                            if (onDeclareWinner) onDeclareWinner(match.id, party.id);
                        }}
                        style={{ cursor: 'pointer', border: 'none', background: 'none', fontSize: '1.2rem' }}
                        title="Dar victoria"
                    >
                        👑
                    </button>
                )}
            </div>
        );
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            background: '#1a1a1a', 
            borderRadius: '8px', 
            width: '250px', 
            overflow: 'hidden',
            border: '1px solid #555',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
            {/* 👇 CAMBIO AQUÍ: Barra decorativa vacía en lugar del ID */}
            <div style={{ height: '8px', background: '#000' }}></div>

            {renderParty(topParty)}
            {renderParty(bottomParty)}
        </div>
    );
};