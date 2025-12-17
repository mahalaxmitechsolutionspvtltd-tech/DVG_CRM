<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Lead;
use Illuminate\Http\Request;

class DealController extends Controller
{

    function getDeals()
    {
        $deals = Lead::where('status', 'Quotation Sent')->where('quotation_amount', '>', 0)->get();
        return ApiResponse::success(true, $deals, "Deals fetched....", 200);
    }
}
