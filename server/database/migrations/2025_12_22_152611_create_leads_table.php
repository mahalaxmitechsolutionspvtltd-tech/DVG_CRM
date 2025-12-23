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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();

            // Basic lead info
            $table->string('sr_no')->nullable();
            $table->date('date')->nullable();

            $table->string('company_name')->nullable();
            $table->string('company_type')->nullable();
            $table->string('nature_of_business')->nullable();

            $table->string('gst_no')->nullable();
            $table->string('pan_number')->nullable();

            // Primary contact (REQUIRED at app level)
            $table->string('primary_person_name');
            $table->string('primary_person_contact');
            $table->string('primary_person_email');

            // Secondary contact
            $table->string('secondary_person_name')->nullable();
            $table->string('secondary_person_contact')->nullable();
            $table->string('secondary_person_email')->nullable();

            // Tertiary contact
            $table->string('tertiary_person_name')->nullable();
            $table->string('tertiary_person_contact')->nullable();
            $table->string('tertiary_person_email')->nullable();

            // Address
            $table->string('address_line1')->nullable();
            $table->string('city')->nullable();

            // Business details
            $table->text('problem_statement')->nullable();
            $table->json('service_requirements')->nullable();
            $table->text('remarks')->nullable();

            // Lead tracking
            $table->string('status');
            $table->decimal('quotation_amount', 12, 2)->nullable();
            $table->string('quotation_type')->nullable();

            // Follow-ups (array of objects)
            $table->json('follow_ups')->nullable();

            // Other
            $table->string('expenses')->nullable();
            $table->bigInteger('last_updated')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
