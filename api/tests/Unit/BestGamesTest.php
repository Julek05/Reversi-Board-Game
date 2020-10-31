<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Game;
use Tests\TestCase;
use Tests\UtilsTests\UtilsTests;

class BestGamesTest extends TestCase
{
    public function test_amount_of_best_games()
    {
        UtilsTests::initDatabase();

        $bestGames = Game::getBestGames('middle');
        $this->assertCount(Game::AMOUNT_OF_BEST_PLAYERS_TO_LEVEL, $bestGames);

        $bestGames = Game::getBestGames('hard');
        $this->assertCount(Game::AMOUNT_OF_BEST_PLAYERS_TO_LEVEL, $bestGames);

        $bestGames = Game::getBestGames('easy');
        $this->assertCount(Game::AMOUNT_OF_BEST_PLAYERS_TO_LEVEL, $bestGames);

        UtilsTests::clearDatabase();
    }

    public function test_levels_of_best_games()
    {
        UtilsTests::initDatabase();

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

        UtilsTests::clearDatabase();
    }

    public function test_keys_of_best_games()
    {
        UtilsTests::initDatabase();

        $bestGames = Game::getBestGames('middle');

        $this->checkAllKeysOfGame($bestGames);

        $bestGames = Game::getBestGames('hard');

        $this->checkAllKeysOfGame($bestGames);

        $bestGames = Game::getBestGames('easy');

        $this->checkAllKeysOfGame($bestGames);

        UtilsTests::clearDatabase();
    }

    private static function getAllKeys() : array
    {
        return ['id', 'player_name', 'level', 'player_points', 'computer_points',
            'image_path', 'created_at'];
    }

    private function checkAllKeysOfGame($bestGames)
    {
        $keys = BestGamesTest::getAllKeys();

        foreach ($bestGames as $bestGame) {
            foreach ($keys as $key) {
                $this->assertArrayHasKey($key, $bestGame);            
            }
        }
    }

    public function test_order_of_best_games()
    {
        UtilsTests::initDatabase();

        $bestGames = Game::getBestGames('easy');
        $sortedBestGames = $bestGames->toBase()->sortByDesc(fn($game) => $game['player_points'] - $game['computer_points']);

        $this->assertSame($bestGames->all(), $sortedBestGames->all());

        UtilsTests::clearDatabase();
    }
}
