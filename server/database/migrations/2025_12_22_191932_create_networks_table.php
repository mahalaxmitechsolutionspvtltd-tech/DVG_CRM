<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('networks', function (Blueprint $table) {
          
            $table->uuid('id')->primary();
            $table->string('full_name')->nullable();
            $table->string('email')->nullable();
            $table->string('mobile')->nullable();
            $table->text('remarks')->nullable();
            $table->json('type_of_industries')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('networks');
    }
};
