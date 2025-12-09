<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'country',
    ];

    // Relación: una marca tiene muchos productos
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
