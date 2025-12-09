<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role): Response
    {
        $user = $request->user(); // obtiene el usuario autenticado

        if (!$user) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        if ($user->role !== $role) {
            return response()->json(['message' => 'No tienes permisos suficientes, habla con soporte.'], 403);
        }

        return $next($request);
    }


    // No hace falta controlar cuando un usuario no esta auth porque lo controla sanctum, aunq en el postman de el error entero de laravel, desde el front vamos a pedir siempre que nos de un json,
    // y ahí ya nos dará el error de auth sin mas en un json,
    // Aunque también se ha controlador en este archvo por tener más control, pero supuestamente nunca tiene que llegar a este archivo.



}
