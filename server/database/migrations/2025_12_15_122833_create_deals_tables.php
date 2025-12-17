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
        Schema::create('deals', function (Blueprint $table) {
            $table->uuid('id')->primary();


            // Reference to Lead
            $table->string('lead_sr_no');


            // Company & Contact Info
            $table->string('company_name')->nullable();
            $table->string('contact_name')->nullable();
            $table->string('email');
            $table->string('city')->nullable();


            // Deal Core
            $table->string('deal_title')->nullable();
            $table->string('deal_stage'); // Discovery, Proposal, Negotiation, Closed
            $table->decimal('deal_amount', 12, 2)->nullable();
            $table->string('quotation_type')->nullable(); // Annual, One-time, etc


            // Business Context
            $table->text('problem_statement')->nullable();
            $table->json('service_requirements')->nullable();


            // Status & Tracking
            $table->string('status');
            $table->bigInteger('last_updated')->nullable();


            // Laravel timestamps
            $table->timestamps();


            // Indexes (performance matters later)
            $table->index('lead_sr_no');
            $table->index('deal_stage');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deals');
    }
};
