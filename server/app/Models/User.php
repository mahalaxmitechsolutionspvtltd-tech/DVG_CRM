<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;


class User extends Model
{
    protected $hidden = [
        'password',
    ];
    use HasFactory, HasApiTokens, HasUlids;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'full_name',
        'email',
        'mobile_no',
        'password',
        'role',
    ];

}
