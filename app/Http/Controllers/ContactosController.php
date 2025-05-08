<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contacto\ContactoRequest;
use App\Http\Requests\Contacto\ContactoUpdate;
use App\Models\CondicionTributarias;
use App\Models\ContactoRadicaciones;
use App\Models\contactos;
use App\Models\FisicoJuridicos;
use App\Models\geopais;
use App\Models\Identidades;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\GeoLugares;
use App\Models\GeoProvinciasRegiones;
use App\Models\vista_contactos;

class ContactosController extends Controller
{
    public function create () {
        $fisicojuridico=Fisicojuridicos::orderBy('id')->get();
        $identidades=Identidades::orderBy('id')->get();
        $condicionestributarias=Condiciontributarias::orderBy('id')->get();
        return Inertia::render('Contacto/Create',compact('fisicojuridico','identidades','condicionestributarias'));
    }

    public function store (ContactoRequest $contacto) {
        $contactos = new contactos();
        $contactos->id_fisicojuridico = $contacto->id_fisicojuridico;
        $contactos->id_pais=$contacto->id_pais;
        $contactos->car= $contacto->car;
        $contactos->apellidorazonsocial=$contacto->apellidorazonsocial;
        $contactos->nombrefantasia=$contacto->nombrefantasia;
        $contactos->nombresegundo=$contacto->nombresegundo;
        if($contacto->id_fisicojuridico == 2){
            $contactos->apellidoynombre=$contacto->apellidorazonsocial . '-' . $contacto->nombrefantasia;
        }else{
            $contactos->apellidoynombre=$contacto->apellidorazonsocial. ' ' . $contacto->nombresegundo . ' ' . $contacto->nombrefantasia;
        }
        $contactos->patronbusqueda=$contactos->apellidoynombre . ' ' . $contacto->id . ' ' . $contacto->id_personal_dato;
        $contactos->id_personal=$contacto->id_personal;
        $contactos->id_personal_dato=$contacto->id_personal_dato;
        $contactos->id_condiciontributaria=$contacto->id_condiciontributaria;
        $contactos->id_identidadtributaria=$contacto->id_identidadtributaria;
        $contactos->id_identidadtributaria_dato=$contacto->id_identidadtributaria_dato;
        $contactos->mail_direccion=$contacto->mail_direccion;
        $contactos->telefono_numero=$contacto->telefono_numero;
        $contactos->telefono_sn_movil=$contacto->telefono_sn_movil;
        $contactos->observacion=$contacto->observacion;
        $contactos->id_provincia=$contacto->id_provincia;
        $contactos->id_subregion=$contacto->id_subregion;
        $contactos->direccion_calle=$contacto->direccion_calle;
        $contactos->codigo_postal=$contacto->codigo_postal;
        $contactos->save();

        $radicaciones = new Contactoradicaciones();
        $radicaciones->id_contacto=$contactos->id;
        $radicaciones->id_pais=$contacto->id_pais;
        $radicaciones->id_provincia=$contacto->id_provincia;
        $radicaciones->id_subregion=$contacto->id_subregion;
        $radicaciones->direccion_calle=$contacto->direccion_calle;
        $radicaciones->codigo_postal=$contacto->codigo_postal;
        $radicaciones->mail_direccion=$contacto->mail_direccion;
        $radicaciones->telefono_numero=$contacto->telefono_numero;
        $radicaciones->telefono_sn_movil=$contacto->telefono_sn_movil;
        $radicaciones->nota=$contacto->observacion;
        $radicaciones->save();

        return to_route('contacto.create');
    }



    public function index () {
        
        $contactos=contactos::orderby('id')->get();
        return Inertia::render('Contacto/Index',['contactos'=>$contactos,]);
    }

    public function edit (contactos $contacto) {
        $fisicojuridico=Fisicojuridicos::orderBy('id')->get();
        $pais=Geopais::orderBy('id')->get();
        $identidades=Identidades::orderBy('id')->get();
        $condicionestributarias=Condiciontributarias::orderBy('id')->get();
        return Inertia::render('Contacto/Edit',compact('contacto'));
    }

    public function update (ContactoUpdate $request, contactos $contacto) {
        $data=$request->all();
        $contacto->update($data);
        return to_route('contato.index');
    }

    public function cambiarEstado (contactos $contacto) {
        $contacto->sn_activo=!$contacto->sn_activo;
        $contacto->save();

        return to_route('contacto.index');
    }


    public function searchPaises(Request $request)
{
    $query = $request->input('query');
    $page = $request->input('page', 1);

    $results = Geopais::where('nombre', 'like', "%$query%")
        ->paginate(5, ['*'], 'page', $page)
        ->appends(['query' => $query]);

        return response()-> json($results);


}
public function searchRegiones(Request $request)
{
    $query = $request->input('query');
    $page = $request->input('page', 1);

    $results = Geolugares::where('descripcion', 'like', "%$query%")
        ->paginate(5, ['*'], 'page', $page)
        ->appends(['query' => $query]);

        return response()-> json($results);

}

public function searchProv(Request $request)
{
    $query = $request->input('query');
    $page = $request->input('page', 1);

    $results = Geoprovinciasregiones::where('descripcion', 'like', "%$query%")
        ->paginate(5, ['*'], 'page', $page)
        ->appends(['query' => $query]);

        return response()-> json($results);

}

public function search($term)
{
    $contactos = Contactos::where('apellidoynombre', 'like', "%$term%")
        ->orWhere('car', 'like', "%$term%")
        ->orWhere('nombrefantasia', 'like', "%$term%")
        ->get();

    return response()->json($contactos);


}
}
