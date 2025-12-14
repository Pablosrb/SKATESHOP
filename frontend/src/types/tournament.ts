// src/types/tournament.ts

export interface Participant {
    id: number;
    name: string;
    email?: string;

    pivot?: {
        event_id: number;
        user_id: number;
        created_at: string;
    };
}

export interface Tournament {
    id: number;
    name: string;
    description: string;
    start_date: string;
    location: string;
    status: 'open' | 'ongoing' | 'finished';
    max_participants: number;
    
    participants_count: number; 
    
    winner_id?: number | null;
    image?: string;
    
    participants?: Participant[];
    matches?: any[]; 
}