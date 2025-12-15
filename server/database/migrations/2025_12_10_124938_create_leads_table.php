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
            $table->bigIncrements('sr_no'); // <-- your custom PK

            // Basic fields
            $table->date('date');
            $table->string('company_name')->nullable();
            $table->string('company_type')->nullable();
            $table->string('nature_of_business')->nullable();
            $table->string('gst_no')->nullable();

            // Contacts
            $table->string('contact1_name')->nullable();
            $table->string('contact2_name')->nullable();
            $table->string('contact3_name')->nullable();
            $table->string('email')->nullable();

            // Address
            $table->string('address_line1')->nullable();
            $table->string('city')->nullable();

            // Requirements & details
            $table->text('problem_statement')->nullable();
            $table->json('service_requirements')->nullable();

            $table->text('remarks')->nullable();

            // Status & quotation
            $table->string('status')->nullable();
            $table->decimal('quotation_amount', 12, 2)->nullable();
            $table->string('quotation_type')->nullable();

            // Follow-ups stored as JSON array
            $table->json('follow_ups')->nullable();

            // Unix timestamp (ms)
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
