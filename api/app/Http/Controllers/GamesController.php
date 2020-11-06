<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Game;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

final class GamesController extends Controller
{
    public function store(Request $request) : JsonResponse
    {
        try {
            $game = $request->all();
            $game['level'] = Game::LEVELS_DICTIONARY[$game['level']];
            $lastGameId = Game::getLastId();

            if (self::isEmptyPlayerNameField($game['player_name'])) {
                $game['player_name'] = Game::PLAYER_DEFAULT_NAME . (1 + $lastGameId);
            }

            $game['user_id'] = 1;
            Game::create($game);
        } catch (\Exception $e) {
            Log::info('store game failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Błąd przy zapisie gry'
            ], 500);
        }
        
        return response()->json([
            'lastGameId' => $lastGameId
        ], 200);
    }

    private static function isEmptyPlayerNameField($playerName): bool
    {
        return $playerName === null || trim($playerName) === '';
    }

    public function show(string $level) : JsonResponse
    {
        return response()->json([
            'bestGames' => Game::getBestGames(Game::LEVELS_DICTIONARY[$level])
        ], 200);
    }

    public function saveImage(Request $request, int $gameId) : JsonResponse
    {
        [$message, $status] = Game::saveImage($request->file('image'), $gameId) 
            ? [200, 'Screen dodany prawidłowo']
            : [500, 'Błąd przy dodawaniu screena'];

        return response()->json([
            'message' => $message
        ], $status); 
    }
}
