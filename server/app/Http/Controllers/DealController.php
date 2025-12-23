<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Deal;
use App\Models\Lead;
use Illuminate\Http\Request;

class DealController extends Controller
{

    function getDeals()
    {
        $deals = Deal::get();
        return ApiResponse::success(true, $deals, "Deals fetched....", 200);
    }

    function addDeals(Request $request)
    {
        try {

            $rules = [
                "company_name" => 'required|min:2',
                "contact_name" => 'required|min:2',
                "contact_number" => 'required|min:10',
                "email" => 'required|email:rfc,dns',
                "deal_amount" => 'required',
                "quotation_type" => 'required',
                "pan_number" => 'required |regex:/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/',
            ];

            $validation = validator($request->all(), $rules);

            if ($validation->fails()) {
                return response()->json($validation->errors(), 405);
            }


            $resp = Deal::create($request->all());

            if (!$resp) {
                return ApiResponse::error(message: $resp, status: 450);
            } else {
                return ApiResponse::success(success: true, data: $resp, message: "Deal added in db", status: 200);
            }

        } catch (\Throwable $th) {
            return ApiResponse::error("somting went wrong", 500, $th);
        }
    }

    function repeatDeal(Request $request)
    {
        try {

            $rules = [
                "company_name" => 'required|min:2',
                "contact_name" => 'required|min:2',
                "contact_number" => 'required|min:10',
                "deal_amount" => 'required',
                "quotation_type" => 'required',
            ];

            $validation = validator($request->all(), $rules);

            if ($validation->fails()) {
                return response()->json($validation->errors(), 405);
            }

            $lead_id = $request['lead_sr_no'];

            $isLeadExists = Lead::where('sr_no', $lead_id)->first();

            if (!$isLeadExists) {
                return ApiResponse::error(message: "Ther is no data found", status: 450);
            }

            $deal = Deal::create($request->all());

            if ($deal) {
                $deal->update(['status' => 'Repeat']);
            }


            if (!$deal) {
                return ApiResponse::error(message: $deal, status: 450);
            } else {
                return ApiResponse::success(success: true, data: $deal, message: "Repeat deal added successfully", status: 200);
            }


        } catch (\Throwable $th) {
            return ApiResponse::error("somting went wrong", 500, $th);
        }
    }

    function updateDeal(Request $request, $dealId)
    {


        try {

            $deal = Deal::where('id', $dealId)->first();
            if ($deal) {
                $deal->update([
                    'deal_stage' => $request['deal_stage'],
                    'service_requirements' => $request['service_requirements'],
                    'problem_statement' => $request['problem_statement'],
                    'deal_amount' => $request['deal_amount'],
                    'quotation_type' => $request['quotation_type'],
                ]);
                return ApiResponse::success(true, $deal, "Deal updated successfully...", 200);
            }
            return ApiResponse::error("Something went wrong", 404, $deal);

        } catch (\Throwable $th) {
            return ApiResponse::error("Something went wrong..", 500, $th);
        }
    }

}
