<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
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

    const Guest = 'Gość';
    const uploadPath = 'public_uploads';
    const uploadPhotosFolder = 'photos';

    public static function getBestGames(string $level) : Collection
    {
        return Game::where('level', $level)
            ->orderByRaw('player_points - computer_points DESC')
            ->take(10)
            ->get();
    }

    public static function getLastId() : int
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
