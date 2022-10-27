<?php

declare(strict_types=1);

namespace App\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface GameRepositoryInterface
{
    public function getBestGames(string $level): Collection;

    public function create(array $game): void;
}
