<?php 

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\PersonalAccessToken;

class AuthenticateWithCookie
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $token = $request->cookie('auth_token');

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated. Token not found.'
            ], 401);
        }


        $accessToken = PersonalAccessToken::findToken($token);

        if (!$accessToken || $accessToken->tokenable === null) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid token or user not found.'
            ], 401);
        }


        $request->setUserResolver(function () use ($accessToken) {
            return $accessToken->tokenable;
        });

        return $next($request);
    }
}
