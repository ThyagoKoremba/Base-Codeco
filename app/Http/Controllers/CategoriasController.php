<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categoria\CategoriaRequest;
use App\Http\Requests\Categoria\CategoriaUpdate;

use App\Models\Contactos;
use App\Models\Categorias;
use App\Models\ContactoCategorias;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriasController extends Controller
{
    public function create()
    {
        return Inertia::render('Categoria/Create');
    }

    public function store(CategoriaRequest $request)
    {
        $data = $request->all();
        Categorias::create($data);
        return to_route('categoria.index');
    }

    public function index()
    {
        $categorias = Categorias::orderBy('id')->get();
        return Inertia::render('Categoria/Index', compact('categorias'));
    }

    public function edit(Categorias $categoria)
    {
        return Inertia::render('Categoria/Edit', compact('categoria'));
    }

    public function update(CategoriaUpdate $request, Categorias $categoria)
    {
        $data = $request->all();
        $categoria->update($data);
        return to_route('categoria.index');
    }

    public function cambiarEstado(Categorias $categoria)
    {
        $categoria->sn_activo = !$categoria->sn_activo;
        $categoria->save();
        return to_route('categoria.index');
    }

    public function getCategoriasByUserId($userId)
    {
        $categorias = ContactoCategorias::select('contacto_categorias.*')
            ->where('contacto_categorias.id_contacto', $userId)
            ->join('categorias', 'contacto_categorias.id_categoria', '=', 'categorias.id')
            ->join('contactos', 'contacto_categorias.id_entidad', '=', 'contactos.id')
            ->select('contacto_categorias.id_entidad','contacto_categorias.id_dato','categorias.descripcion','contactos.apellidoynombre')
            ->get();
    
        return response()->json(['data' => $categorias]);
    }

    public function getCategorias(): JsonResponse
    {
        $categorias = Categorias::where('sn_activo', 1)
            ->orderBy('id')
            ->get();

        return response()->json(['data' => $categorias]);
    }

    public function assignCategoryToUser(Request $request)
    {
        $contactoCategoria = new ContactoCategorias();
        $contactoCategoria->id_contacto = $request->id_contacto;
        $contactoCategoria->id_categoria = $request->id_categoria;
        $contactoCategoria->id_entidad = $request->id_entidad;
        $contactoCategoria->id_dato = $request->id_dato;
        $contactoCategoria->fecha_alta = now();
        $contactoCategoria->sn_activo = $request->sn_activo;
    
        $contactoCategoria->save();
    
        return response()->json(['ok' => true, 'message' => 'La categoría se ha asignado correctamente.']);
    }
}