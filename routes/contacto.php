<?php

use App\Http\Controllers\ContactosController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactoradicacionesController;

Route::prefix('contacto')->middleware('auth')->group(function () {
    Route::get('/index',[ContactosController::class,'index'])->name('contacto.index');
    Route::get('/create',[ContactosController::class,'create'])->name('contacto.create');
    Route::post('/',[ContactosController::class,'store'])->name('contacto.store');
    Route::get('/edit/{actividad}',[ContactosController::class,'edit'])->name('contacto.edit');
    Route::put('/update/{actividad}',[ContactosController::class,'update'])->name('contacto.update');
    Route::get('/cambiarEstado/{actividad}',[ContactosController::class,'cambiarEstado'])->name('contacto.cambiarEstado');


    Route::get('/search-paises', [ContactosController::class, 'searchPaises']);
    Route::get('/search-regiones', [ContactosController::class, 'searchRegiones']);
    Route::get('/search-prov', [ContactosController::class, 'searchProv']);

    Route::get('/{id_contacto}/radicaciones', [ContactoradicacionesController::class, 'index'])->name('contacto.radicaciones');

    Route::get('/search/{term}', [ContactosController::class, 'search']);
});