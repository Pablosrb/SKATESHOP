<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('event_matches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_id');

            $table->integer('round');

            $table->unsignedBigInteger('player1_id')->nullable();
            $table->unsignedBigInteger('player2_id')->nullable();
            $table->unsignedBigInteger('winner_id')->nullable();

            $table->unsignedBigInteger('next_match_id')->nullable();

            $table->timestamps();

            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
            $table->foreign('player1_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('player2_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('winner_id')->references('id')->on('users')->onDelete('set null');

            $table->foreign('next_match_id')->references('id')->on('event_matches')->onDelete('set null');
        });
    }

    public function down(): void {
        Schema::dropIfExists('event_matches');
    }
};
