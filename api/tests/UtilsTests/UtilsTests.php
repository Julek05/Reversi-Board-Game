<?php

declare(strict_types=1);

namespace Tests\UtilsTests;

use App\Game;
use App\User;
use Illuminate\Support\Facades\DB;

class UtilsTests
{
    public const TESTING_DB_CONNECTION_NAME = 'reversi_testing';
    public const PRODUCTION_DB_CONNECTION_NAME = 'mysql';

    public static function initDatabase(): void
    {
        DB::setDefaultConnection(self::TESTING_DB_CONNECTION_NAME);

        User::factory()->create();

        foreach (Game::getLevelsEng() as $level) {
            Game::factory()->count(15)->create(['level' => $level]);
        }
    }

    public static function clearDatabase(): void
    {
        Game::truncate();
        User::truncate();

        DB::setDefaultConnection(self::PRODUCTION_DB_CONNECTION_NAME);
    }
}
