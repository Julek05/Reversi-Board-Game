<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Contracts\GameRepositoryInterface;
use App\Game;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

final class GamesController extends Controller
{
    private GameRepositoryInterface $gameRepository;

    public function __construct(GameRepositoryInterface $gameRepository)
    {
        $this->middleware('auth:api');
        $this->gameRepository = $gameRepository;
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $data = $request->all();
            $data['image_path'] = $data['image_path'] ?? '';

            $this->gameRepository->create($data);
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
        return response()->json($this->gameRepository->getBestGames($level), 200);
    }

    public function saveImage(Request $request): JsonResponse
    {
        [$message, $status] = $this->gameRepository->saveImage($request->file('image'))
            ? ['Screen dodany prawidłowo', 200]
            : ['Błąd przy dodawaniu screena', 500];

        return response()->json([
            'message' => $message
        ], $status);
    }
}
