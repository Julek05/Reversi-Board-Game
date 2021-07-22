<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Game;
use App\Repositories\GameRepository;
use Tests\TestCase;
use Tests\UtilsTests\UtilsTests;

class BestGamesTest extends TestCase
{
    public function test_amount_of_best_games(): void
    {
        UtilsTests::initDatabase();

        foreach (Game::getLevelsEng() as $level) {
            $bestGames = (new GameRepository(new Game()))->getBestGames($level);
            $this->assertCount(Game::AMOUNT_OF_GAMES_TO_LEVEL, $bestGames);
        }

        UtilsTests::clearDatabase();
    }

    public function test_levels_of_best_games(): void
    {
        UtilsTests::initDatabase();

        foreach (Game::getLevelsEng() as $level) {
            $bestGamesLevels = (new GameRepository(new Game()))
                ->getBestGames($level)
                ->pluck('level');

            foreach ($bestGamesLevels as $bestGameLevel) {
                $this->assertEquals($level, $bestGameLevel);
            }
        }

        UtilsTests::clearDatabase();
    }

    public function test_keys_of_best_games(): void
    {
        UtilsTests::initDatabase();

        foreach (Game::getLevelsEng() as $level) {
            $bestGames = (new GameRepository(new Game()))
                ->getBestGames($level)
                ->toArray();

            $this->checkAllKeysOfGame($bestGames);
        }

        UtilsTests::clearDatabase();
    }

    private function checkAllKeysOfGame(array $bestGames): void
    {
        $keys = self::getAllKeys();

        /** @var array $bestGame */
        foreach ($bestGames as $bestGame) {
            foreach ($keys as $key) {
                $this->assertArrayHasKey($key, $bestGame);
            }
        }
    }

    private static function getAllKeys(): array
    {
        return ['id', 'level', 'player_points', 'computer_points',
            'image_path', 'created_at'];
    }

    public function test_order_of_best_games()
    {
        UtilsTests::initDatabase();

        $bestGames = (new GameRepository(new Game()))->getBestGames('easy');
        $sortedBestGames = $bestGames->toBase()
            ->sortByDesc(fn($game) => $game['player_points'] - $game['computer_points']);

        $this->assertSame($bestGames->all(), $sortedBestGames->all());

        UtilsTests::clearDatabase();
    }
}
