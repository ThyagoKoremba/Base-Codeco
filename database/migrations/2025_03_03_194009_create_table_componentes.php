<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('componentes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre',180)->unique();
            $table->string('componente_item_proceso',100)->nullable()->comment('Información del componente por ejemplo "Nuevo Contacto - Rapido" o "Pagina en blanco", "401: No autorizada"');
            $table->string('informacion',180)->nullable();
            $table->text('url')->nullable();
            $table->boolean('sn_modal')->default(false);
            $table->boolean('sn_activo')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('componentes');
    }
};
