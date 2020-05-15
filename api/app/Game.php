<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'player_name',
        'level',
        'player_points',
        'computer_points',
        'image_path',
        'created_at'
    ];

    public static function getBestGames($level)
    {
        return Game::where('level', $level)
            ->orderByRaw('player_points - computer_points DESC')
            ->take(10)
            ->get();
    }

    public static function getLastId()
    {
        if (Game::count() == 0) {
            return 0;
        } else {
            return Game::select('id')
                ->orderByDesc('id')
                ->first()
                ->id;
        }
    }
}
