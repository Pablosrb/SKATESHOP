import api from '@/lib/axios';
import { type Tournament } from '@/types/tournament';

// 1. OBTENER TODOS
export const getTournaments = async (): Promise<Tournament[]> => {
    const response = await api.get('/events');
    return response.data.data || response.data;
};

// 2. OBTENER UNO (CON DETALLES Y PARTICIPANTES)
export const getTournamentById = async (id: string): Promise<Tournament> => {
    const response = await api.get(`/events/${id}`);
    return response.data.data || response.data;
};

// 3. CREAR TORNEO (SOLO ADMIN)
export const createTournament = async (data: any) => {
    const response = await api.post('/events', data);
    return response.data;
};

// 4. INSCRIBIRSE
export const joinTournament = async (tournamentId: number) => {
    const response = await api.post(`/events/${tournamentId}/join`);
    return response.data;
};

export const startTournament = async (id: number) => {
    const response = await api.post(`/events/${id}/start`);
    return response.data;
};

export const setMatchWinner = async (matchId: number, winnerId: number) => {
    const response = await api.post(`/matches/${matchId}/winner`, { winner_id: winnerId });
    return response.data;
};

export const deleteTournament = async (id: number) => {
    await api.delete(`/events/${id}`);
};