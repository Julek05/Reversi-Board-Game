<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class GamesController extends Controller
{
    final public function store(Request $request) : int
    {
        $game = $request->all();
        $game['level'] = Game::LEVELS_DICTIONARY[$game['level']];
        $lastGameId = Game::getLastId();

        if ($game['player_name'] === null || trim($game['player_name']) === '') {
            $game['player_name'] = Game::PLAYER . (1 + $lastGameId);
        }
        Game::create($game);

        return $lastGameId;
    }

    final public function show(string $level) : Collection
    {
        return Game::getBestGames(Game::LEVELS_DICTIONARY[$level]);
    }

    final public function saveImage(Request $request, int $gameId) : void
    {
        Game::saveImage($request->file('image'), $gameId);
    }
}
