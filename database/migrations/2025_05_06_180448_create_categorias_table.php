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
        Schema::create('categorias', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion',45)->index('IDX_descripcion_categoria')->unique();
            $table->string('abreviatura',15)->index('IDX_abreviatura_categorias')->unique();
            $table->boolean('sn_registrosistema')->default(0);
            $table->boolean('sn_activo')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorias');
    }
};