<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;


class UserAuthController extends Controller
{

    //User signin
    function signUp(Request $request)
    {



        try {

            $rules = [
                "full_name" => "required|min:2",
                "email" => "required|email:rfc,dns|unique:users,email",
                "password" => "required|min:8|max:14",
                "mobile_no" => "required|min:10",
            ];


            $validation = validator($request->all(), $rules);


            if ($validation->fails()) {
                return ApiResponse::error("fill blanks..", 400, $validation->errors());
            } else {


                $input = $request->all();

                $input["password"] = bcrypt($input["password"]);
                $user = User::create($input);

                if ($user) {
                    return ApiResponse::success($user, "User registerd successfully..", 200, );

                } else {
                    return ApiResponse::error($user, false, 400, );
                }

            }
        } catch (\Throwable $th) {
            return ApiResponse::error($th, "someting went wrong", 500, );
        }

    }

    // user login
    function signIn(Request $request)
    {

        try {

            $rules = [
                "email" => "required|email:rfc,dns|exists:users,email",
                "password" => "required|min:8|max:14",
            ];


            $input = $request->only('email', 'password');

            $validationChek = validator($input, $rules);

            if ($validationChek->fails()) {
                return ApiResponse::error("fill blanks..", 400, $validationChek->errors());
            }


            $user = User::where('email', $input['email'])->first();

            if (!$user)
                return ApiResponse::error(message: "Invalid email and password", status: 450);

            $validUser = Hash::check($request->password, $user['password']);

            if (!$validUser)
                return ApiResponse::error(message: "Invalid password", status: 450);

            $user->tokens()->delete();

            $token = $user->createToken(
                name: 'auth-token',
                abilities: ['*'],
                expiresAt: now()->addHours(1) // 1-hour expiry
            )->plainTextToken;

            $cookie = cookie(
                name: 'auth_token',
                value: $token,
                minutes: 60 * 24,
                path: '/',
                domain: null,
                secure: true,
                httpOnly: true,
                sameSite: 'None'
            );

            $data = [
                "username" => $user->full_name,
                "email" => $user->email,
                "moblie_no" => $user->mobile_no,
                "message" => "user logged in successfully.."
            ];

            if (!$user || !$validUser) {
                return ApiResponse::error(message: "Invalid email and password, status: 450");
            } else {
                return ApiResponse::success(true, $data, "Login in successfully..", 200)->withCookie($cookie);

            }

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th
            ], 500);
        }
    }
}
