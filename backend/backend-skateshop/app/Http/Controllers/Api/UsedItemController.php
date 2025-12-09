<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UsedItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsedItemController extends Controller
{
    /**
     * Listar solo los artículos del usuario logueado
     */
    public function myItems()
    {
        $userId = auth()->id();

        $items = UsedItem::with('user')
            ->where('user_id', $userId)
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Mis artículos de segunda mano',
            'data' => $items
        ]);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = UsedItem::with('user')->where('status', 'active')->latest()->get();
        return response()->json([
            'message' => 'Lista de artículos de segunda mano',
            'data' => $items
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'condition'   => 'nullable|string|max:50',
            // Importante: validar que es una imagen real
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status'      => 'nullable|in:active,sold,archived'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('used_items', 'public');
            $validatedData['image'] = $path;
        } else {
            $validatedData['image'] = null;
        }

        // La validación no incluye el user_id, así que lo añadimos manualmente
        $validatedData['user_id'] = Auth::id();
        $validatedData['condition'] = $request->condition ?? 'used';
        $validatedData['status'] = $request->status ?? 'active';

        $item = UsedItem::create($validatedData);

        return response()->json([
            'message' => 'Producto de segunda mano creado',
            'data' => $item
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $item = UsedItem::with('user')->find($id);

        if (!$item) {
            return response()->json(['message' => 'Artículo no encontrado'], 404);
        }

        return response()->json(['data' => $item]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $item = UsedItem::find($id);

        if (!$item) {
            return response()->json(['message' => 'Artículo no encontrado'], 404);
        }

        // Verificar ownership
        if ($item->user_id !== Auth::id()) {
            return response()->json(['message' => 'No tienes permiso para actualizar este artículo'], 403);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'condition' => 'nullable|string|max:50',
            'image' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,sold,archived'
        ]);

        $item->update($request->all());

        return response()->json([
            'message' => 'Artículo actualizado correctamente',
            'data' => $item
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $item = UsedItem::find($id);

        if (!$item) {
            return response()->json(['message' => 'Artículo no encontrado'], 404);
        }

        // Verificar ownership
        if ($item->user_id !== Auth::id()) {
            return response()->json(['message' => 'No tienes permiso para eliminar este artículo'], 403);
        }

        $item->delete();

        return response()->json(['message' => 'Artículo eliminado correctamente']);
    }
}
