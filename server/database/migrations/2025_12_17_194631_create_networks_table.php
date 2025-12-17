<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('networks', function (Blueprint $table) {
            $table->id();

            // Basic details
            $table->string('name')->nullable();
            $table->string('number', 20)->nullable();
            $table->string('email')->nullable();

            // Type of Connect
            $table->enum('type_of_connect', ['HVT', 'HII', 'BA'])->nullable();

            // Multiple industry verticals
            $table->json('industry_connects')->nullable();

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
