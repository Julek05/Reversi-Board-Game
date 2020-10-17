<?php

namespace Tests\Unit;

use App\Models\Game;
use Tests\TestCase;

class BestGamesTest extends TestCase
{
    private function initDatabase()
    {
        factory(Game::class, 13)->create(['level' => 'easy']);
        factory(Game::class, 12)->create(['level' => 'middle']);
        factory(Game::class, 14)->create(['level' => 'hard']);
    }

    private function clearDatabase()
    {
        Game::truncate();
    }

    public function test_amount_of_best_games()
    {
        $this->initDatabase();

        $bestGames = Game::getBestGames('middle');
        $this->assertCount(10, $bestGames);

        $bestGames = Game::getBestGames('hard');
        $this->assertCount(10, $bestGames);

        $bestGames = Game::getBestGames('easy');
        $this->assertCount(10, $bestGames);

        $this->clearDatabase();
    }

    public function test_levels_of_best_games()
    {
        $this->initDatabase();

        $bestGames = Game::getBestGames('middle');

        foreach ($bestGames as $bestGame) {
            $this->assertEquals('middle', $bestGame['level']);
        }

        $bestGames = Game::getBestGames('hard');

        foreach ($bestGames as $bestGame) {
            $this->assertEquals('hard', $bestGame['level']);
        }

        $bestGames = Game::getBestGames('easy');

        foreach ($bestGames as $bestGame) {
            $this->assertEquals('easy', $bestGame['level']);
        }

        $this->clearDatabase();
    }

    public function test_keys_of_best_games()
    {
        $this->initDatabase();

        $bestGames = Game::getBestGames('middle');

        $this->checkAllKeysOfGame($bestGames);

        $bestGames = Game::getBestGames('hard');

        $this->checkAllKeysOfGame($bestGames);

        $bestGames = Game::getBestGames('easy');

        $this->checkAllKeysOfGame($bestGames);

        $this->clearDatabase();
    }

    private function checkAllKeysOfGame($bestGames)
    {
        foreach ($bestGames as $bestGame) {
            $this->assertArrayHasKey('id', $bestGame);
            $this->assertArrayHasKey('player_name', $bestGame);
            $this->assertArrayHasKey('level', $bestGame);
            $this->assertArrayHasKey('player_points', $bestGame);
            $this->assertArrayHasKey('computer_points', $bestGame);
            $this->assertArrayHasKey('image_path', $bestGame);
            $this->assertArrayHasKey('created_at', $bestGame);
        }
    }

    public function test_order_of_best_games()
    {
        $this->initDatabase();

        $bestGames = Game::getBestGames('easy');
        $sortedBestGames = $bestGames->toBase()->sortByDesc(fn($game) => $game['player_points'] - $game['computer_points']);

       $this->assertSame($bestGames->all(), $sortedBestGames->all());

       $this->clearDatabase();

    }
}
