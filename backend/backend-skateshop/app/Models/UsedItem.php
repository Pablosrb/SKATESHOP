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

    protected $appends = ['image_url'];

    // 2. CREAMOS EL "ACCESSOR" (GetImageUrlAttribute)
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            // Esto genera: http://localhost:8000/storage/used_items/foto.jpg
            return asset('storage/' . $this->image);
        }

        return null;
    }

    // Relación con usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
