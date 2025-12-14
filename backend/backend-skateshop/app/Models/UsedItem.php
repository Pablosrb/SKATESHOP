<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsedItem extends Model
{
    use HasFactory;

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

    //  CREAMOS EL "ACCESSOR" (GetImageUrlAttribute)
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            // Esto genera: http://localhost:8000/storage/used_items/foto.jpg
            return asset('storage/' . $this->image);
        }

        return null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
