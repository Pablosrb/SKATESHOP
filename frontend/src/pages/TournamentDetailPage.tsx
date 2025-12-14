import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleEliminationBracket, SVGViewer } from '@g-loot/react-tournament-brackets';
import { getTournamentById, startTournament, setMatchWinner } from '@/services/tournamentService';
import { transformDataForGloot } from '@/utils/bracketTransform';
import { MatchCard } from '@/components/MatchCard'; 
import { AdminToolbar } from '@/components/AdminToolbar';
import { type Tournament } from '@/types/tournament';

const TournamentDetailPage: React.FC = () => {
    const { id } = useParams();
    // const navigate = useNavigate(); // Quitamos navigate si no lo usamos abajo
    
    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [loading, setLoading] = useState(true);
    const [matchesForBracket, setMatchesForBracket] = useState<any[]>([]);
    
    // const [userId, setUserId] = useState<number | null>(null); // Quitamos si no lo usamos
    const [isAdmin, setIsAdmin] = useState(false);

    const loadData = async () => {
        try {
            if (!id) return;
            // Forzamos el tipo aquí para que TS sepa que trae matches
            const data = await getTournamentById(id);
            setTournament(data);

            if (data.matches) {
                const glootData = transformDataForGloot(data.matches);
                setMatchesForBracket(glootData);
            }

            const userStr = localStorage.getItem('user_data');
            if (userStr) {
                const user = JSON.parse(userStr);
                // setUserId(user.id);
                setIsAdmin(user.role === 'admin');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, [id]);

    const handleStart = async () => {
        if (!confirm("¿Iniciar torneo? Esto cerrará inscripciones.")) return;
        try { await startTournament(Number(id)); loadData(); } catch (e) { alert("Error al iniciar"); }
    };

    const handleWin = async (matchId: number, winnerId: number) => {
        if (!confirm("¿Confirmar ganador?")) return;
        try { await setMatchWinner(matchId, winnerId); loadData(); } catch (e) { alert("Error al declarar ganador"); }
    };

    if (loading) return <div style={{padding: 50, color: 'white'}}>Cargando...</div>;
    if (!tournament) return <div>No encontrado</div>;

    // Calculamos ancho para el zoom
    const bracketWidth = tournament.max_participants > 8 ? 1500 : 1000;

    return (
        <div style={{ padding: 20, maxWidth: '100%', overflowX: 'auto', background: '#222', minHeight: '100vh', color: 'white' }}>
            
            <div style={{ marginBottom: 30, textAlign: 'center' }}>
                <h1 style={{margin: 0}}>{tournament.name}</h1>
                <p>📍 {tournament.location}</p>
            </div>

            {/* Componente AdminToolbar arreglado */}
            <AdminToolbar isAdmin={isAdmin} status={tournament.status} onStart={handleStart} />

            {tournament.status === 'open' ? (
                <div style={{ textAlign: 'center', marginTop: 50 }}>
                     <h2>⏳ Inscripciones Abiertas</h2>
                     <p>{tournament.participants_count || 0} / {tournament.max_participants} Jugadores</p>
                     <p style={{color: '#aaa'}}>Esperando a que un administrador inicie el torneo...</p>
                </div>
            ) : (
                <div style={{ height: 600 }}>
                    <SingleEliminationBracket
                        matches={matchesForBracket}
                        matchComponent={(props: any) => ( // 👈 Añadido :any para silenciar el error
                            <MatchCard 
                                {...props} 
                                isAdmin={isAdmin} 
                                onDeclareWinner={handleWin} 
                            />
                        )}
                        svgWrapper={({ children, ...props }: any) => ( // 👈 Añadido :any para silenciar el error
                            <SVGViewer width={bracketWidth} height={600} background="#222" SVGBackground="#222" {...props}>
                                {children}
                            </SVGViewer>
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default TournamentDetailPage;