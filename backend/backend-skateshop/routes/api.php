<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AuthController,
    ProductController,
    EventController,
    UserController,
    OrderController,
    UsedItemController
};

/*
|--------------------------------------------------------------------------
| RUTAS PÚBLICAS (Sin Token)
|--------------------------------------------------------------------------
*/

// Autenticación
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Catálogos (Solo lectura)
Route::apiResource('products', ProductController::class)->only(['index', 'show']);
Route::apiResource('events', EventController::class)->only(['index', 'show']);

/*
|--------------------------------------------------------------------------
| RUTAS PROTEGIDAS (Requieren Token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // --- ACCIONES DE USUARIO ---

    // Perfil y Sesión
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [UserController::class, 'me']);

    // El usuario solo puede ver/editar su propio perfil (controlado en el Controller)
    Route::apiResource('users', UserController::class)->only(['show', 'update', 'destroy']);

    // Compras y Pedidos
    Route::apiResource('orders', OrderController::class)->only(['index', 'store', 'show', 'destroy']);

    // Segunda Mano
    Route::get('used-items/my-items', [UsedItemController::class, 'myItems']);
    Route::apiResource('used-items', UsedItemController::class);

    // Torneos (Unirse)
    Route::post('events/{id}/join', [EventController::class, 'join']);


    // --- ZONA DE ADMIN ---
    Route::middleware('role:admin')->group(function () {

        // Gestión de Tienda
        Route::apiResource('products', ProductController::class)->except(['index', 'show']); // Crear, Editar, Borrar

        // Gestión de Usuarios
        Route::apiResource('users', UserController::class)->except(['show', 'update', 'destroy']); // Ver todos

        // Gestión de Pedidos (Solo actualizar estado)
        Route::apiResource('orders', OrderController::class)->only(['update']);

        // Gestión de Torneos (Crear, Editar, Borrar y Jugar)
        Route::apiResource('events', EventController::class)->except(['index', 'show']);
        Route::post('/events/{id}/start', [EventController::class, 'startTournament']);
        Route::post('/matches/{id}/winner', [EventController::class, 'setWinner']);
    });

});
