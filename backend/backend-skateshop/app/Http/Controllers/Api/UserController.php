<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() //Listar todos los usuarios (solo admins)
    {

        $user = auth()->user(); // comprobamos si esta la sesion iniciada

        if ($user && $user->role === 'admin') { //si es admin lista los usuarios

            return response()->json([
                'message' => 'Admin: Lista de todos los usuarios',
                'user' => User::all()
            ],200);

        }

        return response()->json([
            'message' => 'No se permite esta accion',
        ], 404);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $authUser = auth()->user();
        $requestedUser = User::find($id);

        if (!$requestedUser) {
            return response()->json([
                'message' => 'Usuario no encontrado.'
            ], 404);
        }

        // Admin puede ver a cualquiera
        if ($authUser->role === 'admin') {
            return response()->json([
                'message' => 'Datos del usuario:',
                'user' => $requestedUser
            ], 200);
        }

        // Usuario normal solo puede ver su propio perfil
        if ($authUser->id == $requestedUser->id) {
            return response()->json([
                'message' => 'Tu perfil:',
                'user' => $requestedUser
            ], 200);
        }

        return response()->json([
            'message' => 'No tienes permisos para ver este usuario.'
        ], 403);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) // Editar datos de un usuario
    {
        $authUser = auth()->user();
        $userToUpdate = User::find($id);


        if (!$userToUpdate) {
            return response()->json([
                'message' => 'Usuario no encontrado.'
            ], 404);
        }

        // Admin puede editar a cualquiera
        // Usuario normal solo su propio perfil
        if ($authUser->role !== 'admin' && $authUser->id != $userToUpdate->id) {
            return response()->json([
                'message' => 'No tienes permisos para editar este usuario.'
            ], 403);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $userToUpdate->id, //solo le dice a Laravel que ignore este usuario al comprobar
            'password' => 'sometimes|string|min:6',
            'role' => 'sometimes|string|in:admin,user'
        ]);


        // Si el usuario NO es admin, no permitir editar roles
        if ($authUser->role !== 'admin') {
            $request->request->remove('role');
        }

        if ($request->has('password')) {
            $request->merge([
                'password' => bcrypt($request->password)
            ]);
        }

        $userToUpdate->update($request->all());

        return response()->json([
            'message' => 'Usuario actualizado correctamente.',
            'user' => $userToUpdate
        ], 200);
    }


}
