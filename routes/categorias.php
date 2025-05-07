<?php

use App\Http\Controllers\CategoriasController;
use Illuminate\Support\Facades\Route;

Route::prefix('categoria')->middleware('auth')->group(function () {
    Route::get('/index',[CategoriasController::class,'index'])->name('categoria.index');
    Route::get('/create',[CategoriasController::class,'create'])->name('categoria.create');
    Route::post('/',[CategoriasController::class,'store'])->name('categoria.store');
    Route::get('/edit/{categoria}',[CategoriasController::class,'edit'])->name('categoria.edit');
    Route::put('/update/{categoria}',[CategoriasController::class,'update'])->name('categoria.update');
    Route::get('/cambiarEstado/{categoria}',[CategoriasController::class,'cambiarEstado'])->name('categoria.cambiarEstado');
    Route::get('/getCategoriasByUserId/{userId}',[CategoriasController::class,'getCategoriasByUserId'])->name('categoria.getCategoriasByUserId');
    Route::get('/list', [CategoriasController::class, 'listar']);
    Route::post('/asignarCategoria', [CategoriasController::class, 'assignCategoryToUser']);
});