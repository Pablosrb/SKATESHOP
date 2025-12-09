<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->string('name', 255);
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10,2);
            $table->integer('stock')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('brand_id')->references('id')->on('brands');

//            $table->foreignId('category_id')->constrained('categories');
//            $table->foreignId('brand_id')->nullable()->constrained('brands');


        });
    }

    public function down(): void {
        Schema::dropIfExists('products');
    }
};
