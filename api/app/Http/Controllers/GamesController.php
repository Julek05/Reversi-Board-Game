<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Game;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

final class GamesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $game = $request->all();
            $game['level'] = Game::LEVELS_DICTIONARY[$game['level']];

            $game['user_id'] = auth()->id();
            Game::create($game);
        } catch (\Exception $e) {
            Log::info("store game failed: {$e->getMessage()}");
            return response()->json([
                'message' => 'Błąd przy zapisie gry'
            ], 500);
        }

        return response()->json();
    }

    public function show(string $level): JsonResponse
    {
        return response()->json([
            'bestGames' => Game::getBestGames(Game::LEVELS_DICTIONARY[$level])
        ], 200);
    }

    public function saveImage(Request $request): JsonResponse
    {
        [$message, $status] = Game::saveImage($request->file('image'))
            ? ['Screen dodany prawidłowo', 200]
            : ['Błąd przy dodawaniu screena', 500];

        return response()->json([
            'message' => $message
        ], $status);
    }
}
