<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\LeadsController;
use App\Http\Controllers\NetworkController;
use App\Http\Middleware\AuthenticateWithCookie;

Route::post("signup", [UserAuthController::class, "signUp"]);
Route::post("signin", [UserAuthController::class, "signIn"]);

// ✅ protected routes


Route::middleware([AuthenticateWithCookie::class])->group(function () {
    Route::get("user", [UserAuthController::class, "checkAuth"]);
    Route::post("logout", [UserAuthController::class, "logout"]);

    Route::post("addlead", [LeadsController::class, "addLead"]);
    Route::get("getleads", [LeadsController::class, "getAllLeads"]);
    Route::put("updatelead/{sr_no}", [LeadsController::class, "updateLead"]);

    Route::post("createdeal/{sr_no}", [LeadsController::class, "convetLeadIntoDeal"]);
    Route::get("getdeals", [DealController::class, "getDeals"]);
    Route::post("createdeal", [DealController::class, "addDeals"]);
    Route::post("repeatdeal", [DealController::class, "repeatDeal"]);
    Route::post("updatedeal/{dealId}", [DealController::class, "updateDeal"]);

    Route::get("getnetworks", [NetworkController::class, "getNetworks"]);
    Route::post("addnetwork", [NetworkController::class, "addNetwork"]);
});
