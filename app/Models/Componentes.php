<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Componentes extends Model
{
    protected $table = 'componentes';
    protected $fillable = [
        'nombre',
        'componente_item_proceso',
        'informacion',
        'url',
        'sn_modal',
        'sn_activo'
    ];
    public function usersExcepcion()
    {
        return $this->belongsToMany(User::class, 'users_componentes_excepcion', 'id_componente', 'id_user');
    }
}
