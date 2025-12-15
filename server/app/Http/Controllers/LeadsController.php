<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadsController extends Controller
{
    function addLead(Request $request)
    {

        try {

            $rules = [
                "company_name" => 'required|min:2',
                "contact1_name" => 'required|min:4',
                "email" => 'required|email:rfc,dns',
            ];

            $validation = validator($request->all(), $rules);

            if ($validation->fails()) {
                return response()->json($validation->errors());
            }

            // return response()->json($request->all());

            $resp = Lead::create($request->all());

            if (!$resp) {
                return ApiResponse::error(message: $resp, status: 450);
            } else {
                return ApiResponse::success(success: true, data: $resp, message: "lead added in db", status: 200);
            }

        } catch (\Throwable $th) {
            return ApiResponse::error("somting went wrong", 500, $th);
        }
    }

    function getAllLeads(Request $request)
    {
        try {
            $resp = Lead::get();
            return ApiResponse::success(success: true, data: $resp, message: "Data fetched successfully...", status: 200);

        } catch (\Throwable $th) {
            return response()->json(data: $th, status: 500);
        }
    }

    function updateLead(Request $request, $sr_no)
    {
        try {

            $rules = [
                "company_name" => 'required|min:2',
                "contact1_name" => 'required|min:4',
                "email" => 'required|email:rfc,dns',
            ];

            $validation = validator($request->all(), $rules);

            if ($validation->fails()) {
                return response()->json($validation->errors());
            }


            $lead = Lead::where('sr_no', $sr_no)->first();
            // return response()->json($lead);
            if (!$lead) {
                return response()->json("No result found...", 450);
            }

            $resp = $lead->update($request->input());


            return ApiResponse::success(success: true, data: $resp, message: "Updated successfully...", status: 200);

        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
    }
}


