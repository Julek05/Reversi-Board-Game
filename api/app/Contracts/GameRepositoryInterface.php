<?php

declare(strict_types=1);

namespace App\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

interface GameRepositoryInterface
{
    public function getBestGames(string $level): Collection;

    public function getLastGameId(int $userId): ?int;

    public function saveImage(UploadedFile $image): bool;

    public function create(array $game): void;
}
