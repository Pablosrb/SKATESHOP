<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('custom_skate_parts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('custom_skate_id');
            $table->unsignedBigInteger('product_id');
            $table->string('part_type', 100);
            $table->timestamps();

            $table->foreign('custom_skate_id')->references('id')->on('custom_skates');
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    public function down(): void {
        Schema::dropIfExists('custom_skate_parts');
    }
};
