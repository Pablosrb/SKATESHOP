import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTournaments, deleteTournament } from '@/services/tournamentService'; // 👈 Importamos delete
import { type Tournament } from '@/types/tournament';
import '@/styles/TournamentsPage.css';

const TournamentsPage: React.FC = () => {
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false); 

    useEffect(() => {
        getTournaments()
            .then((data) => {
                const list = Array.isArray(data) ? data : (data as any).data || [];
                setTournaments(list);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
        
        const user = JSON.parse(localStorage.getItem('user_data') || '{}');
        if (user.role === 'admin') setIsAdmin(true);
    }, []);  

    // --- FUNCIÓN DE BORRADO ---
    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // 👈 IMPORTANTE: Evita entrar al torneo al hacer click en borrar
        
        if (!confirm("⚠️ ¿Estás seguro de ELIMINAR este torneo?\nSe borrarán todos los partidos y registros asociados de la base de datos.")) {
            return;
        }

        try {
            await deleteTournament(id);
            // Actualizamos la lista visualmente quitando el torneo borrado
            setTournaments(prev => prev.filter(t => t.id !== id));
            alert("Torneo eliminado.");
        } catch (error) {
            alert("Error al eliminar el torneo.");
        }
    };

    const openTournaments = tournaments.filter(t => t.status === 'open');
    const ongoingTournaments = tournaments.filter(t => t.status === 'ongoing');
    const finishedTournaments = tournaments.filter(t => t.status === 'finished');

    // --- TARJETA MODIFICADA ---
    const TournamentCard = ({ t }: { t: Tournament }) => (
        <div className="tournament-card" onClick={() => navigate(`/events/${t.id}`)}>
            <div className={`status-badge ${t.status}`}>
                {t.status === 'open' && 'INSCRIPCIONES ABIERTAS'}
                {t.status === 'ongoing' && 'EN JUEGO'}
                {t.status === 'finished' && 'FINALIZADO'}
            </div>

            {/* 👇 BOTÓN DE BORRAR (Solo para Admin) */}
            {isAdmin && (
                <button 
                    className="btn-delete-card" 
                    onClick={(e) => handleDelete(e, t.id)}
                    title="Eliminar torneo"
                >
                    🗑️
                </button>
            )}

            <h3>{t.name}</h3>

            <div className="card-info">
                <p>📅 {new Date(t.start_date).toLocaleDateString()}</p>
                <p>📍 {t.location}</p>
            </div>

            {t.status !== 'finished' && (
                <div className="participants-bar">
                    <span>👥 {t.participants_count || 0} / {t.max_participants}</span>
                    <progress value={t.participants_count || 0} max={t.max_participants}></progress>
                </div>
            )}

            {t.status === 'finished' && (
                <div className="winner-banner">
                    {t.winner_id ? '🏆 Ver Ganador' : '🏁 Ver Resultados'}
                </div>
            )}
        </div>
    );

    if (loading) return <div className="loading-container">Cargando torneos...</div>;

    return (
        <div className="tournaments-container">
            <div className="page-header">
                <h1>🏆 Torneos Skate</h1>
                {isAdmin && (
                    <button className="btn-create" onClick={() => navigate('/admin/crear-torneo')}>
                        + Crear Torneo
                    </button>
                )}
            </div>

            {/* SECCIONES (Igual que antes) */}
            {openTournaments.length > 0 && (
                <section className="section-block">
                    <h2 className="section-title open">🔥 Inscripciones Abiertas</h2>
                    <div className="tournament-grid">{openTournaments.map(t => <TournamentCard key={t.id} t={t} />)}</div>
                </section>
            )}

            {ongoingTournaments.length > 0 && (
                <section className="section-block">
                    <h2 className="section-title ongoing">⚔️ Torneos En Curso</h2>
                    <div className="tournament-grid">{ongoingTournaments.map(t => <TournamentCard key={t.id} t={t} />)}</div>
                </section>
            )}

            {finishedTournaments.length > 0 && (
                <section className="section-block">
                    <h2 className="section-title finished">🏁 Torneos Finalizados</h2>
                    <div className="tournament-grid">{finishedTournaments.map(t => <TournamentCard key={t.id} t={t} />)}</div>
                </section>
            )}

            {tournaments.length === 0 && <p className="no-data">No hay torneos disponibles.</p>}
        </div>
    );
};

export default TournamentsPage;