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
        Schema::create('contacto_categorias', function (Blueprint $table) {
            $table->unsignedBigInteger('id_contacto')->default(1);
            $table->foreign('id_contacto','FK_id_contacto_contactocategoria')->references('id')->on('contactos');
            $table->index('id_contacto','IDX_id_contacto_contactocategoria');
            $table->unsignedBigInteger('id_categoria')->default(1);
            $table->foreign('id_categoria','FK_id_categoria_contactocategoria')->references('id')->on('categorias');
            $table->index('id_categoria','IDX_id_categoria_contactocategoria');
            $table->unsignedBigInteger('id_entidad')->default(1);
            $table->foreign('id_entidad','FK_id_entidad_contactocategoria')->references('id')->on('contactos');
            $table->index('id_entidad','IDX_id_entidad_contactocategoria');
            $table->primary(['id_contacto','id_categoria','id_entidad']);
            $table->string('id_dato',10);
            $table->date('fecha_alta');
            $table->boolean('sn_activo')->default(true);
            $table->unsignedBigInteger('id_user_created_at')->default(1);
            $table->foreign('id_user_created_at','FK_id_user_created_at_contactocategoria')->references('id')->on('users');
            $table->index('id_user_created_at','IDX_id_user_created_at_contactocategoria');
            $table->unsignedBigInteger('id_user_updated_at')->default(1);
            $table->foreign('id_user_updated_at','FK_id_user_updated_at_contactocategoria')->references('id')->on('users');
            $table->index('id_user_updated_at','IDX_id_user_updated_at_contactocategoria');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacto_categorias');
    }
};
