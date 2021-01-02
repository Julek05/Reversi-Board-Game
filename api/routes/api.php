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
    'middleware' => 'api'
], function ($router) {
    Route::post('game', [GamesController::class, 'store']);
    Route::get('game/{level}', [GamesController::class, 'show']);
    Route::post('game/image/{lastGameId}', [GamesController::class, 'saveImage']);
});
