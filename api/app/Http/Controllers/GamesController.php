<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Contracts\GameRepositoryInterface;
use App\FilesHandlers\ImageSaver;
use App\Http\Requests\GetBestGamesRequest;
use App\Http\Requests\StoreGameRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

final class GamesController extends Controller
{
    private GameRepositoryInterface $gameRepository;

    private ImageSaver $imageSaver;

    public function __construct(GameRepositoryInterface $gameRepository, ImageSaver $imageSaver)
    {
        $this->gameRepository = $gameRepository;
        $this->imageSaver = $imageSaver;
    }

    public function show(GetBestGamesRequest $request): JsonResponse
    {
        return response()->json($this->gameRepository->getBestGames($request->get('level')), 200);
    }

    public function store(StoreGameRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            if (env('UPLOADING_IMAGES_ENABLED') && $request->hasFile('image')) {
                $this->imageSaver->save($request->file('image'));

                $data['image_path'] = $this->imageSaver->getImagePath();
            } else {
                $data['image_path'] = '';
            }

            $this->gameRepository->create($data);
        } catch (\Throwable $e) {
            Log::info("store game failed: {$e->getMessage()}");

            return response()->json([
                'message' => 'Błąd przy zapisie gry'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json();
    }
}
