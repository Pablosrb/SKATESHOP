<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['name' => 'Element', 'country' => 'USA'],
            ['name' => 'Santa Cruz', 'country' => 'USA'],
            ['name' => 'Plan B', 'country' => 'USA'],
            ['name' => 'Enjoi', 'country' => 'Canada'],
            ['name' => 'Blind', 'country' => 'Australia'],
        ];

        foreach ($brands as $brand) {
            Brand::create($brand);
        }
    }
}
