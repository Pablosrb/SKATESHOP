<?php
//
//use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\Api\{
//    ProductController,
//    OrderController,
//    UserController,
//    EventController,
//    CustomSkateController,
//    AuthController
//};
//
//// Rutas públicas (sin JWT)
//// Auth
//
//Route::get('adios', [AuthController::class, 'adios']);
//
//Route::post('login', [AuthController::class, 'login']);
//Route::post('register', [AuthController::class, 'register']);
//
//// Catálogo público (solo ver productos)
//Route::apiResource('products', ProductController::class)->only(['index', 'show']);
//
////  Rutas protegidas (requieren JWT)
//Route::middleware('auth:api')->group(function () {
//
//    // Perfil de usuario
//    Route::get('me', [UserController::class, 'me']);
//    Route::apiResource('users', UserController::class)->only(['show', 'update', 'destroy']); // Solo puede ver, editar o eliminar su propio usuario desde el controlador
//
//    // Órdenes de compra
//    Route::apiResource('orders', OrderController::class)->only(['index', 'store', 'show', 'destroy']); // → El usuario puede crear (comprar), ver sus pedidos, listar los suyos y cancelarlos (destroy)
//
//    // Eventos
//    Route::get('events', [EventController::class, 'index']); // listar eventos
//    Route::post('events/{event}/join', [EventController::class, 'join']); // unirse a evento
//
//    // Skates personalizados
//    Route::apiResource('custom-skates', CustomSkateController::class); // El usuario puede crear, editar, eliminar sus propios diseños
//
//    // Cerrar sesión
//    Route::post('logout', [AuthController::class, 'logout']);
//
//
//    // Rutas solo para ADMIN
//    Route::middleware('role:admin')->group(function () {
//
//        Route::apiResource('products', ProductController::class)->except(['index', 'show']); // Catálogo de la tienda (CRUD completo)
//
//        Route::apiResource('users', UserController::class)->except(['show', 'update', 'destroy']); // Gestión de usuarios (ver todos, eliminar, editar)
//
//        Route::apiResource('events', EventController::class)->except(['index']); // Gestión de eventos (crear, editar, eliminar)
//
//
//    });
//});
