// Traductor entre el back y la libreria

export const transformDataForGloot = (laravelMatches: any[]) => {
    if (!laravelMatches || laravelMatches.length === 0) return [];

    
    const maxRound = Math.max(...laravelMatches.map(m => m.round));

    const getRoundName = (roundNumber: number, totalRounds: number) => {
        const diff = totalRounds - roundNumber;

        switch (diff) {
            case 0: return '🏆 GRAN FINAL';
            case 1: return 'Semifinales';
            case 2: return 'Cuartos de Final';
            case 3: return 'Octavos de Final';
            default: return `Ronda ${roundNumber}`;
        }
    };

    return laravelMatches.map((match) => {
        const participants = [];
        
        if (match.player1) {
             participants.push({
                 id: match.player1.id,
                 name: match.player1.name,
                 isWinner: match.winner_id === match.player1.id,
                 resultText: match.winner_id === match.player1.id ? 'WIN' : null,
                 status: match.winner_id ? 'PLAYED' : 'NO_SHOW' 
             });
        } else {
             participants.push({ id: `tbd1-${match.id}`, name: 'Esperando...', isWinner: false });
        }

        if (match.player2) {
             participants.push({
                 id: match.player2.id,
                 name: match.player2.name,
                 isWinner: match.winner_id === match.player2.id,
                 resultText: match.winner_id === match.player2.id ? 'WIN' : null,
                 status: match.winner_id ? 'PLAYED' : 'NO_SHOW'
             });
        } else {
             participants.push({ id: `tbd2-${match.id}`, name: 'Esperando...', isWinner: false });
        }

        return {
            id: match.id,
            name: getRoundName(match.round, maxRound), 
            nextMatchId: match.next_match_id,
            tournamentRoundText: match.round.toString(),
            startTime: match.created_at,
            state: match.winner_id ? 'DONE' : 'SCHEDULED',
            participants: participants
        };
    });
};