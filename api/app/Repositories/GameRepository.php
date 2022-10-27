<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\GameRepositoryInterface;
use App\Game;
use Illuminate\Database\Eloquent\Collection;

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

    public function create(array $game): void
    {
        $this->model->create(array_merge($game, ['user_id' => auth()->id()]));
    }
}
