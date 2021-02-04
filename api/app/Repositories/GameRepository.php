<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\GameRepositoryInterface;
use App\Game;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GameRepository implements GameRepositoryInterface
{
    private Game $model;

    public function __construct(Game $model)
    {
        $this->model = $model;
    }

    public function getBestGames(string $level): Collection
    {
        return $this->model->select('games.*', 'users.name as user_name')
            ->leftJoin('users', 'games.user_id', '=', 'users.id')
            ->where('level', $level)
            ->orderByRaw('player_points - computer_points DESC')
            ->take(Game::AMOUNT_OF_GAMES_TO_LEVEL)
            ->get();
    }

    public function getLastGameId($userId): int
    {
        return $this->model->select('id')
            ->where('user_id', $userId)
            ->orderByDesc('id')
            ->firstOrFail()
            ->id;
    }

    public function saveImage(UploadedFile $image): bool
    {
        DB::beginTransaction();
        try {
            $lastGameId = $this->getLastGameId(auth()->id());

            $imagePath = Storage::disk(Game::BASE_UPLOAD_DIRECTORY)
                ->put(Game::UPLOAD_IMAGES_DIRECTORY, $image);
            $this->model->where('id', $lastGameId)->update(['image_path' => $imagePath]);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            Storage::disk(Game::BASE_UPLOAD_DIRECTORY)
                ->delete(Game::UPLOAD_IMAGES_DIRECTORY . '/' .  $image);
            Log::info("save image failed: {$e->getMessage()}");
            return false;
        }
    }

    public function create(array $game): void
    {
        $game['level'] = Game::LEVELS_DICTIONARY[$game['level']];

        $game['user_id'] = auth()->id();

        $this->model->create($game);
    }
}
