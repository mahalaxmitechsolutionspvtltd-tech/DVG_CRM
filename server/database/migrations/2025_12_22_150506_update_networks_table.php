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
        Schema::table('networks', function (Blueprint $table) {
            $table->string('full_name')->nullable();
            $table->string('mobile', 20)->nullable();
            $table->string('email')->nullable();
            $table->json('type_of_industries')->nullable();
            $table->text('remarks')->nullable();

            $table->dropColumn([
                'name',
                'number',
                'type_of_connect',
                'industry_connects'
            ]);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
