<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        
        $this->call(GeopaisSeeder::class);
        $this->call(GeolugaresSeeder::class);
        $this->call(GeoprovinciasregionesSeeder::class);
        $this->call(CondiciontributariasSeeder::class);
        $this->call(ContactoestadoSeeder::class);
        $this->call(ContactosituacioncivilesSeeder::class);
        $this->call(FisicojuridicosSeeder::class);
        $this->call(GeoprovinciasregionesSeeder::class);
        $this->call(IdentidadesSeeder::class);
        $this->call(ContactosSeeder::class);
        $this->call(UserSeeder::class);
   

        //Seeders para configurar componentes-menu por usuario, sumar en orden. En el caso que se quiera crear otro usuario asegurarnos de tenerlo arriba o sumarlo en el seed
        //NO PURAMENTE DESDE DB porque se rompen las relaciones
        $this->call(PerfilSeed::class);
        $this->call(ComponenteSeed::class);

        $this->call(PerfilComponentesSeed::class); //por el momento no lo usamos
        
        $this->call(UserPerfilSeed::class);
        $this->call(UserComponenteExcepcionSeed::class);
        $this->call(MenuSeed::class);
        $this->call(MenuComponenteSeed::class);
        $this->call(PerfilMenuSeed::class);
        $this->call(CategoriaSeeder::class);
    }
}
