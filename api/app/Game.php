<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'player_name',
        'level',
        'player_points',
        'computer_points'
    ];

    public static function getBestGames($level)
    {
        return Game::where('level', $level)
            ->orderBy('player_points', 'desc')
            ->take(10)
            ->get();
    }
}
