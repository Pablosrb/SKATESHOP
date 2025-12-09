<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'category_id' => 1,
                'brand_id' => 1,
                'name' => 'Tabla Element 8.0',
                'description' => 'Tabla de skate de 8.0 pulgadas fabricada en arce canadiense.',
                'price' => 89.99,
                'stock' => 10,
                'is_active' => true,
            ],
            [
                'category_id' => 2,
                'brand_id' => 2,
                'name' => 'Ruedas Santa Cruz 54mm',
                'description' => 'Ruedas de uretano de alta resistencia para todo tipo de terreno.',
                'price' => 34.50,
                'stock' => 25,
                'is_active' => true,
            ],
            [
                'category_id' => 3,
                'brand_id' => 3,
                'name' => 'Trucks Plan B Pro',
                'description' => 'Trucks ligeros de aluminio con ejes reforzados.',
                'price' => 59.99,
                'stock' => 15,
                'is_active' => true,
            ],
            [
                'category_id' => 4,
                'brand_id' => 4,
                'name' => 'Sudadera Enjoi Classic',
                'description' => 'Sudadera con capucha y logotipo bordado Enjoi.',
                'price' => 49.90,
                'stock' => 20,
                'is_active' => true,
            ],
            [
                'category_id' => 5,
                'brand_id' => 5,
                'name' => 'Llavero Blind Logo',
                'description' => 'Llavero metálico con logo Blind Skateboards.',
                'price' => 9.99,
                'stock' => 50,
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
