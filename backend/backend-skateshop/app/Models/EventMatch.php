<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventMatch extends Model
{

    protected $fillable = [
        'event_id',
        'round',
        'player1_id',
        'player2_id',
        'winner_id', '
        next_match_id'
    ];

    // Relación: Un partido pertenece a un evento
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    // Relación: Jugador 1 es un Usuario
    public function player1()
    {
        return $this->belongsTo(User::class, 'player1_id');
    }

    // Relación: Jugador 2 es un Usuario
    public function player2()
    {
        return $this->belongsTo(User::class, 'player2_id');
    }

    // Relación: Ganador es un Usuario
    public function winner()
    {
        return $this->belongsTo(User::class, 'winner_id');
    }
}
