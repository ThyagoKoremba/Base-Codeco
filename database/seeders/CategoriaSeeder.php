<?php

namespace Database\Seeders;

use App\Models\Categorias;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categorias::create([
            'descripcion'=> 'Nivel 1',
            'abreviatura'=> 'N 1',
            'sn_registrosistema' => true,
            'sn_activo'=> true,
        ]);
        Categorias::create([
            'descripcion'=> 'Nivel 2',
            'abreviatura'=> 'N 2',
            'sn_registrosistema' => true,
            'sn_activo'=> true,
        ]);
        Categorias::create([
            'descripcion'=> 'Nivel 3',
            'abreviatura'=> 'N 3',
            'sn_registrosistema' => true,
            'sn_activo'=> true,
        ]);
        Categorias::create([
            'descripcion'=> 'Nivel 4',
            'abreviatura'=> 'N 4',
            'sn_registrosistema' => true,
            'sn_activo'=> true,
        ]);
        Categorias::create([
            'descripcion'=> 'Contacto',
            'abreviatura'=> 'Contacto',
            'sn_registrosistema' => true,
            'sn_activo'=> true,
        ]);
        Categorias::create([
            'descripcion'=> 'Banco / Financiera',
            'abreviatura'=> 'Bco./Fin.',
            'sn_registrosistema' => true,
            'sn_activo'=> true,
        ]);
        Categorias::create([
            'descripcion'=> 'Proveedor',
            'abreviatura'=> 'Proveed',
            'sn_registrosistema' => true,
            'sn_activo'=> true,
        ]);
        Categorias::create([
            'descripcion'=> 'Personal de la firma',
            'abreviatura'=> 'Pers.Firma',
            'sn_registrosistema' => true,
            'sn_activo'=> true,
        ]);

    }
}
