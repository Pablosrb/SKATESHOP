<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() // Mostrar el catalogo entero
    {

        $user = auth()->user(); // miramos a ver si hay alguna sesion iniciada
        $products = Product::with(['brand', 'category'])->get();


        if ($user && $user->role === 'admin') {
            return response()->json([
                'message' => 'Eres administrador, puedes editar los productos.',
                'products' => $products/*Product::all()*/
            ]);
        }
        return response()->json([
            'message' => 'No has iniciado sesion o eres un cliente, solo puedes ver el catalogo.',
            'products' => $products/*Product::all()*/
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Buscar el producto por ID e incluir categoría y marca
        $product = Product::with('category', 'brand')->find($id);

        // Si no existe, devolver error 404
        if (!$product) {
            return response()->json([
                'message' => 'Producto no encontrado.'
            ], 404);
        }

        // Devolver detalles del producto
        return response()->json([
            'message' => 'Detalles del producto.',
            'product' => $product
        ]);


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|min:8',
            'image' => 'nullable|string',
            'description' => 'required|string|min:8',
            'price' => 'required|numeric',
            'stock' => 'required|integer|min:1',
            'is_active' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product = Product::create([
            'category_id' => $request->category_id,
            'brand_id' => $request->brand_id,
            'name' => $request->name,
            'image' => $request->image,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'is_active' => $request->is_active
        ]);

        return response()->json(['data' => $product], 201);



    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Esto se usa para mostrar un formulario html en la api no se usa.
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $validator = Validator::make($request->all(), [
            'category_id' => 'sometimes|exists:categories,id',
            'brand_id' => 'sometimes|exists:brands,id',
            'name' => 'sometimes|string|min:3',
            'image' => 'sometimes|string',
            'description' => 'sometimes|string|min:3',
            'price' => 'sometimes|numeric|min:1',
            'stock' => 'sometimes|integer|min:1',
            'is_active' => 'sometimes|boolean',
        ]);

        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $product->update($request->only([
            'category_id', 'brand_id', 'name','image', 'description', 'price', 'stock', 'is_active'
        ]));

        return response()->json(['data' => $product], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Producto no encontrado.'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'message' => 'Producto eliminado correctamente.'
        ], 200);
    }

}
