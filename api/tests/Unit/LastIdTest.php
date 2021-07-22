<?php

namespace Tests\Unit;

use App\Game;
use App\Repositories\GameRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UtilsTests\UtilsTests;

class LastIdTest extends TestCase
{
    use RefreshDatabase;

    public function test_when_0_records_in_database()
    {
        $this->assertSame(null, (new GameRepository(new Game()))->getLastGameId(1));
    }

    public function test_when_40_records_in_database()
    {
        UtilsTests::initDatabase();

        $this->assertSame(45, (new GameRepository(new Game()))->getLastGameId(1));

        UtilsTests::clearDatabase();
    }
}
