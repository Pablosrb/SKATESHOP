<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    protected $fillable = [
        'name', 'description', 'start_date', 'location',
        'status', 'max_participants', 'winner_id'
    ];

    public function participants()
    {
        return $this->belongsToMany(User::class, 'event_participants', 'event_id', 'user_id')
            ->withPivot('id')
            ->withTimestamps();
    }

    public function matches()
    {
        return $this->hasMany(EventMatch::class);
    }
}
