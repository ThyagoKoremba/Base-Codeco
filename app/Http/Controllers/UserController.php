<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\Usuario\UsuarioRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /*
    * 
    * Retorna: los perfiles del usuario junto con los menus del perfil y los componentes exceptuados para el usuario
    *
    */
    public function vista(){
        $usuarios = User::all();
        return Inertia::render('Usuarios/Vista', compact('usuarios'));
    }

    public function store(UsuarioRequest $request){
        
        $usuario = new User;
        $usuario->name = $request->name;
        $usuario->email = $request->email;
        $usuario->password= Hash::make($request->password);
        $usuario->save();

        return redirect()->route('usuario.vista');

    }

    public function update(Request $request, User $usuario){
        $data = $request->all();
        $usuario->update($data);
        return to_route('usuario.vista');
    }

    public function cambiarEstado(User $usuario){
        $usuario->sn_activo = !$usuario->sn_activo;
        $usuario->save();
        return to_route('usuario.vista');
    }




    
    public function getExcepcionesPorUser(): JsonResponse {
        $usuarioSesion = Auth::user();

        $usuario = User::with([
            'componentesExcepcion' => function ($query) {
                $query->where('sn_habilitado', 0);
            },
        ])->findOrFail($usuarioSesion->id);

        $response = $usuario->componentesExcepcion->map(function ($excepcion) {
            return [
                'componente' => $excepcion->nombre,
            ];
        })->toArray();

        return response()->json($response);
    }


    public function getPerfilesMenusComponentesByUser(): JsonResponse
    {
        $usuarioSesion = Auth::user();

        $usuario = User::with([
            'perfiles' => function ($query) {
                $query->where('perfiles.sn_activo', 1); // Solo perfiles activos
            },
            'perfiles.menus' => function ($query) {
                $query->where('menus.sn_activo', 1); // Solo menús activos
            },
            'perfiles.menus.componentes' => function ($query) use ($usuarioSesion) {
                $query->where('componentes.sn_activo', 1) // Solo componentes activos
                    ->whereDoesntHave('usersExcepcion', function ($subQuery) use ($usuarioSesion) {
                        $subQuery->where('users_componentes_excepcion.id_user', $usuarioSesion->id)
                            ->where(function ($condition) {
                                $condition->whereNull('users_componentes_excepcion.sn_habilitado')
                                    ->orWhere('users_componentes_excepcion.sn_habilitado', '!=', 1);
                            });
                    });
            }
        ])->findOrFail($usuarioSesion->id);

        // Filtrar perfiles que tengan al menos un menú sn_activo
        $response = $usuario->perfiles->filter(function ($perfil) {
            return $perfil->menus->contains('sn_activo', 1);
        })->map(function ($perfil) {
            return [
                'menus' => $perfil->menus->filter(function ($menu) {
                    return $menu->sn_activo == 1;
                })->map(function ($menu) {
                    return [
                        'menu' => $menu->nombre,
                        'menu-info' => $menu->informacion,
                        'componentes' => $menu->componentes->pluck('url', 'nombre')->toArray(),
                    ];
                })->toArray(),
            ];
        });

        return response()->json($response);
    }
}
