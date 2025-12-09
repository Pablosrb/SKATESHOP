
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('used_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');

            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);

            // Mejoras añadidas
            $table->string('condition')->default('used'); // Estado del producto
            $table->string('image')->nullable(); // Imagen principal
            $table->enum('status', ['active', 'sold', 'archived'])->default('active');

            $table->timestamps();

            // Relación mejorada
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('used_items');
    }
};


//
//use Illuminate\Database\Migrations\Migration;
//use Illuminate\Database\Schema\Blueprint;
//use Illuminate\Support\Facades\Schema;
//
//return new class extends Migration {
//    public function up(): void {
//        Schema::create('used_items', function (Blueprint $table) {
//            $table->id();
//            $table->unsignedBigInteger('user_id');
//            $table->string('title',255);
//            $table->text('description')->nullable();
//            $table->decimal('price',10,2);
//            $table->boolean('is_sold')->default(false);
//            $table->timestamps();
//
//            $table->foreign('user_id')->references('id')->on('users');
//        });
//    }
//
//    public function down(): void {
//        Schema::dropIfExists('used_items');
//    }
//};
