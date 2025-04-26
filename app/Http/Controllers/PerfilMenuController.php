<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Perfil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PerfilMenuController extends Controller
{
    public function tratamientoPerfilMenu(){
        return Inertia::render('PerfilMenu/Tratamiento');
    }

    public function searchMenus(Request $request)
    {
        $query = $request->input('query');
        $page = $request->input('page', 1);

        $results = Menu::where('nombre', 'like', "%$query%")
            ->paginate(5, ['*'], 'page', $page)
            ->appends(['query' => $query]);
        return response()->json($results);
    }
    
    public function searchPerfil(Request $request)
    {
        $query = $request->input('query');
        $page = $request->input('page', 1);
    
        $results = Perfil::leftJoin('perfiles_menus', 'perfiles.id', '=', 'perfiles_menus.id_perfil')
            ->select(
                'perfiles.id',
                'perfiles.nombre',
                'perfiles.abreviatura',
                'perfiles.sn_activo',
                DB::raw('CASE WHEN perfiles_menus.id_perfil IS NULL THEN NULL ELSE perfiles_menus.id_perfil END as relacion')
            )
            ->where('perfiles.nombre', 'like', "%$query%") // Corrige la posición del where
            ->paginate(5, ['*'], 'page', $page)
            ->appends(['query' => $query]);
    
        return response()->json($results);
    }


    public function store(Request $request){
        $perfilID= $request->input('id_perfil');
        $menuID= $request->input('id_menu');
        
        DB::table('perfiles_menus')->insert([
            'id_perfil' => $perfilID,
            'id_menu' => $menuID,
            'sn_activo' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function getAllPerfilMenuData()
    {

            $data = DB::table('perfiles_menus')
                ->join('perfiles', 'perfiles_menus.id_perfil', '=', 'perfiles.id')
                ->join('menus', 'perfiles_menus.id_menu', '=', 'menus.id')
                ->select(
                    'perfiles.id as perfil_id',
                    'perfiles.nombre as perfil_nombre',
                    'perfiles.abreviatura as perfil_abreviatura',
                    'perfiles.sn_activo as perfil_activo',
                    'menus.id as menu_id',
                    'menus.nombre as menu_nombre',
                    'menus.abreviatura as menu_abreviatura',
                    'menus.sn_activo as menu_activo',
                    'perfiles_menus.sn_activo as relacion_activa',
                    'perfiles_menus.created_at',
                    'perfiles_menus.updated_at'
                )
                ->orderBy('perfiles.nombre')
                ->get();
            return response()->json(['data' => $data]);
    }

}
