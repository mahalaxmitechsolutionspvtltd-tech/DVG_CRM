<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    use HasFactory;
    protected $table = 'deals';
    protected $fillable = [
        'sr_no',
        'company_name',
        'company_type',
        'nature_of_business',
        'gst_no',

        'contact_person',
        'email',

        'address_line1',
        'city',

        'problem_statement',
        'service_requirements',

        'quotation_amount',
        'quotation_type',

        'status',
        'last_updated',
    ];

    /**
     * Casts
     */
    protected $casts = [
        'service_requirements' => 'array',
        'quotation_amount' => 'decimal:2',
        'last_updated' => 'integer',
    ];
}
