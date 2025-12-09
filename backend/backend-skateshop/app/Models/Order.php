<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    // Tabla asociada (opcional si tu tabla se llama 'orders')
    protected $table = 'orders';

    // Campos que se pueden rellenar masivamente
    protected $fillable = [
        'user_id',
        'total_price',
        'status'
    ];

    /**
     * Relación: un pedido tiene muchos OrderItems
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    protected static function booted()
    {
        static::deleting(function ($order) {
            $order->items()->delete();
        });
    }

    /**
     * Relación: un pedido pertenece a un usuario
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
