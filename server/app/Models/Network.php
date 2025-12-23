<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class Network extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        "full_name",
        "email",
        "mobile",
        "remarks",
        "type_of_industries"
    ];
    protected $casts = [
        'type_of_industries' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

}
