<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/excepciones', [UserController::class, 'getExcepcionesPorUser'])->middleware(['auth', 'verified']);
Route::get('/user/perfil-menu-componentes', [UserController::class, 'getPerfilesMenusComponentesByUser'])->middleware(['auth', 'verified']);


Route::prefix('usuario')->middleware('auth')->group(function () {
    Route::get('/', [UserController::class, 'vista'])->name('usuario.vista');
    Route::put('/', [UserController::class, 'store'])->name('usuario.store');
    Route::put('/update/{usuario}', [UserController::class, 'update'])->name('usuario.update');
    Route::get('/cambiarEstado/{usuario}', [UserController::class, 'cambiarEstado'])->name('usuario.cambiarEstado');
});
