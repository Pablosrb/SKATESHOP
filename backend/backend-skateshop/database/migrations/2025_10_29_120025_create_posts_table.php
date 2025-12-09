<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();

            $table->string('title', 255);
            $table->text('content');
            $table->string('category', 100)->nullable();

            $table->timestamps();

            // Relación mejorada
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};


//
//use Illuminate\Database\Migrations\Migration;
//use Illuminate\Database\Schema\Blueprint;
//use Illuminate\Support\Facades\Schema;
//
//return new class extends Migration {
//    public function up(): void {
//        Schema::create('posts', function (Blueprint $table) {
//            $table->id();
//            $table->unsignedBigInteger('user_id')->nullable();
//            $table->string('title',255);
//            $table->text('content');
//            $table->string('category',100)->nullable();
//            $table->timestamps();
//
//            $table->foreign('user_id')->references('id')->on('users');
//        });
//    }
//
//    public function down(): void {
//        Schema::dropIfExists('posts');
//    }
//};
