<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role): Response
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        if ($user->role !== $role) {
            return response()->json(['message' => 'No tienes permisos suficientes, habla con soporte.'], 403);
        }

        return $next($request);
    }



}
