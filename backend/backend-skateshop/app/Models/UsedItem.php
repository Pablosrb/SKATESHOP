<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsedItem extends Model
{
    use HasFactory;

    // Campos que se pueden rellenar masivamente
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'price',
        'condition',
        'image',
        'status',
    ];

    // Relación con usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
