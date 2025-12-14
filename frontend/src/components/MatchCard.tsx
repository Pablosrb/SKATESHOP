import React from 'react';
import { type CustomMatchProps } from '@/types/customMatchProps';
import '@/styles/MatchCard.css'; 


export const MatchCard: React.FC<CustomMatchProps> = ({ 
    match, topParty, bottomParty, isAdmin, onDeclareWinner 
}) => {
    
    const renderParty = (party: any) => {
        const isWinner = party.isWinner;
        const hasPlayer = party.name !== 'TBD' && party.name !== 'Esperando...';
        const showAdminBtn = isAdmin && hasPlayer && match.state !== 'DONE';

        return (
            <div className={`party-row ${isWinner ? 'winner' : ''}`}>
                <span className="party-name">
                    {party.name}
                </span>
                
                {showAdminBtn && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onDeclareWinner) onDeclareWinner(match.id, party.id);
                        }}
                        className="admin-winner-btn"
                        title="Dar victoria"
                    >
                        👑
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="match-card">
            <div className="match-card-header-bar"></div>

            {renderParty(topParty)}
            {renderParty(bottomParty)}
        </div>
    );
};