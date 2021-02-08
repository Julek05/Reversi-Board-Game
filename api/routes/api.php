<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\JWTAuthController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('register', [JWTAuthController::class, 'register']);
    Route::post('login', [JWTAuthController::class, 'login']);
    Route::post('logout', [JWTAuthController::class, 'logout']);
    Route::post('refresh', [JWTAuthController::class, 'refresh']);
    Route::get('profile', [JWTAuthController::class, 'profile']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'games'
], function () {
    Route::post('', [GamesController::class, 'store']);
    Route::get('{level}', [GamesController::class, 'show']);
    Route::put('', [GamesController::class, 'saveImage']);
});
