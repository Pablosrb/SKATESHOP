export interface CustomMatchProps {
    match: any;        // Datos del partido
    onMatchClick: any; // Click genérico
    onPartyClick: any; // Click en participante
    onMouseEnter: any;
    onMouseLeave: any;
    topParty: any;     // Datos Jugador 1 (Arriba)
    bottomParty: any;  // Datos Jugador 2 (Abajo)

    isAdmin?: boolean;
    onDeclareWinner?: (matchId: number, winnerId: number) => void;
}