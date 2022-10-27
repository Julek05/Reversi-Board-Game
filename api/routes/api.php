<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\JWTAuthController;

Route::group([
    'prefix' => 'auth'
], function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('logout', [JWTAuthController::class, 'logout']);
        Route::post('refresh', [JWTAuthController::class, 'refresh']);
        Route::get('profile', [JWTAuthController::class, 'profile']);
    });
    Route::post('login', [JWTAuthController::class, 'login']);
    Route::post('register', [JWTAuthController::class, 'register']);
});

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'games'
], function () {
    Route::post('', [GamesController::class, 'store']);
    Route::get('', [GamesController::class, 'show']);
    Route::put('', [GamesController::class, 'saveImage']);
});
