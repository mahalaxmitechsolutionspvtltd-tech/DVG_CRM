<?php

use App\Http\Controllers\UserAuthController;
use Illuminate\Support\Facades\Route;

// default route
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('signup', [UserAuthController::class, 'signUp']);
Route::post('signin', [UserAuthController::class, 'signIn']);