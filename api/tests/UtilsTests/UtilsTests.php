<?php

namespace Tests\UtilsTests;

use App\Game;

class UtilsTests
{
    public static function initDatabase()
    {
        factory(Game::class, 13)->create(['level' => 'easy']);
        factory(Game::class, 12)->create(['level' => 'middle']);
        factory(Game::class, 15)->create(['level' => 'hard']);
    }

    public static function clearDatabase()
    {
        Game::truncate();
    }
}
