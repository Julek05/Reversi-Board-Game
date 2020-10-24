<?php

namespace Tests\Unit;

use App\Models\Game;
use Tests\TestCase;
use Tests\UtilsTests\UtilsTests;

class LastIdTest extends TestCase
{
    public function test_when_0_records_in_database()
    {
        $this->assertSame(0, Game::getLastId());
    }

    public function test_when_40_records_in_database()
    {
        UtilsTests::initDatabase();
        $this->assertSame(40, Game::getLastId());
        UtilsTests::clearDatabase();
    }
}
