<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactoCategorias extends Model
{
    use HasFactory;

    protected $table = 'contacto_categorias';
    protected $primaryKey = ['id_contacto', 'id_categoria', 'id_entidad','id_dato'];
    public $incrementing = false;
    protected $fillable = [
        'id_contacto',
        'id_categoria',
        'id_entidad',
        'id_dato',
        'fecha_alta',
        'sn_activo',
        'id_user_created_at',
        'id_user_updated_at'
    ];

    public function categoria()
    {
        return $this->belongsTo(Categorias::class, 'id_categoria', 'id');
    }

    public function contacto()
    {
        return $this->belongsTo(Contactos::class, 'id_contacto', 'id');
    }
}