<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Order;


// Hay que tener en cuenta que cada usuario puede hacer lo que sea con sus PROPIOS order, pero un admin puede hacerlo con TODOS
// esto implica que vamos a tener que controlarlo aquí, simplemente revisamos el auth()->user()->role
// Mirar ultima conversación sale explicado brevemente el flujo que tiene que seguir

// metodos que tenemos que completar que estan en el api.php
// only(['index', 'store', 'show', 'destroy'], porque el update no lo vamos a contemplar, si se quiere hacer un update va a tener que eliminar el pedido y volver a hacerlo, eso no se contempla
// También solo se podrá hacer destroy de un order cuando este pedido este "pending",ya que es el status que tiene
// el pedido cuando se acaba de ralizar, si tiene cualquier otra cosa, como por ejemplo en preparación o enviado
// no se va a poder hacer el destroy del order.
// (Contemplar si hace falta cambiar algo en el migration para solo tener 3 estados, pending, preparation, send), aunque se vaya a controlar mediante un select en el panel del admin.

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userRole = auth()->user()->role;

        if ($userRole == "user") { // Si es user muestra solo los order de ese user

            $userOrders = auth()->user()->orders()->with('items.product')->get();

            return response()->json([
                'message' => 'Tus pedidos',
                'orders' => $userOrders,
                'role' => auth()->user()->role,
                'usuario' => auth()->user()->name
            ], 200);
        }


        if ($userRole === "admin") { // Todos los pedidos

            $allOrders = Order::with('items.product')->get();

            return response()->json([
                'message' => 'Lista completa de pedidos',
                'orders' => $allOrders,
                'role' => auth()->user()->role,
                'usuario' => auth()->user()->name
            ], 200);
        }

        return response()->json([
            'message' => 'No puedes acceder a los pedidos'
        ], 401);


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userRole = auth()->user()->role;

        // VALIDACIÓN BASE PARA TODOS
        $rules = [
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ];

        // SI ES ADMIN → PERMITIR user_id
        if ($userRole === 'admin') {
            $rules['user_id'] = 'required|exists:users,id';
        }

        $validated = $request->validate($rules);

        // DEFINIR EL USER_ID FINAL
        $finalUserId = ($userRole === 'admin')
            ? $validated['user_id']
            : auth()->id(); // USER normal → se asigna solo

        // 1 CREAR EL PEDIDO
        $order = Order::create([
            'user_id' => $finalUserId,
            'total_price' => 0, // se actualiza luego
            'status' => 'pending',
        ]);

        // 2 AÑADIR LOS PRODUCTOS (order_items)
        $total = 0;

        foreach ($validated['items'] as $item) {
            $product = Product::find($item['product_id']); // buscamos el producto en la tabla product mediante el id para coger el precio  y saber si existe

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,  // guardamos precio actual del producto
            ]);

            // sumar al total
            $total += $product->price * $item['quantity'];
        }

        // 3 ACTUALIZAR EL TOTAL DEL PEDIDO
        $order->update(['total_price' => $total]);

        // 4 RESPUESTA
        return response()->json([
            'message' => 'Pedido creado correctamente',
            'order' => $order->load('items.product'),
        ], 201);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }



    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::with('items.product')->find($id);

        if (!$order) {
            return response()->json(['message' => 'Pedido no encontrado'], 404);
        }

        // Validar que el usuario solo vea su pedido si no es admin
        if (auth()->user()->role !== 'admin' && $order->user_id !== auth()->id()) {
            return response()->json(['message' => 'Pedido no encontrado'], 403);
        }

        return response()->json([
            'message' => 'Detalle del pedido',
            'order' => $order
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // TODO: Validacion da error no sabemos porque
        $request->validate([
            'status' => 'required|string',
        ]);

        // Buscar pedido o fallar con 404
        $order = Order::findOrFail($id);

        // Actualizar solo status
        $order->update($request->only('status'));


        return response()->json([
            'message' => 'Estado del pedido actualizado',
            'order_id' => $order->id,
            'status' => $order->status
        ], 200);
    }



    /**
     * Remove the specified resource from storage.
     */
//    public function destroy(string $id)
//    {
//        //
//    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = auth()->user();
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Pedido no encontrado.'], 404);
        }

        // Validar que solo el propietario o admin pueda eliminar
        if ($user->role !== 'admin' && $order->user_id !== $user->id) {
            return response()->json(['message' => 'No tienes permisos para eliminar este pedido.'], 403);
        }

        // Solo permitir eliminar si está pendiente
        if ($order->status !== 'pending') {
            return response()->json(['message' => 'No se puede eliminar un pedido que no esté pendiente.'], 403);
        }

        // Eliminar items asociados primero
        $order->items()->delete();

        // Luego eliminar el pedido
        $order->delete();

        return response()->json(['message' => 'Pedido eliminado correctamente.'], 200);
    }

}
