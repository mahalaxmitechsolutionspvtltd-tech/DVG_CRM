<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{

    protected $primaryKey = 'sr_no';
    protected $fillable = [
        "company_name",
        "company_type",
        "nature_of_business",
        "contact1_name",
        "contact2_name",
        "contact3_name",
        "email",
        "gst_no",
        "address_line1",
        "service_requirements",
        "problem_statement",
        "remarks",
        "follow_ups",
        "status",
        "date",
    ];

    protected $casts = [
        "follow_ups" => "array",
        "service_requirements" => "array",
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($lead) {
            // Auto-fill date column
            if (empty($lead->date)) {
                $lead->date = now()->toDateString();  // YYYY-MM-DD
            }
        });
    }
}
