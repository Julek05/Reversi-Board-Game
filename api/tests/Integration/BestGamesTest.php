<?php

declare(strict_types=1);

namespace Tests\Integration;

use App\Game;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;
use Tests\UtilsTests\UtilsTests;

class BestGamesTest extends TestCase
{
    public function test_amount_of_best_games(): void
    {
        $user = UtilsTests::initDatabase();

        foreach (Game::LEVELS as $level) {
            $response = $this->actingAs($user)->get("/api/games/$level");

            $this->assertSame(Response::HTTP_OK, $response->getStatusCode());

            $this->assertCount(Game::AMOUNT_OF_GAMES_TO_LEVEL, json_decode($response->getContent()));
        }

        UtilsTests::clearDatabase();
    }

    public function test_levels_of_best_games(): void
    {
        $user = UtilsTests::initDatabase();

        foreach (Game::LEVELS as $level) {
            $response = $this->actingAs($user)->get("/api/games/$level");

            $this->assertSame(Response::HTTP_OK, $response->getStatusCode());

            $responseDecodedContent = json_decode($response->getContent(), true);

            foreach ($responseDecodedContent as $game) {
                $this->assertEquals($level, $game['level']);
            }
        }

        UtilsTests::clearDatabase();
    }

    public function test_keys_of_best_games(): void
    {
        $user = UtilsTests::initDatabase();

        foreach (Game::LEVELS as $level) {
            $response = $this->actingAs($user)->get("/api/games/$level");

            $this->assertSame(Response::HTTP_OK, $response->getStatusCode());

            $responseDecodedContent = json_decode($response->getContent(), true);

            $this->checkAllKeysOfGame($responseDecodedContent);
        }

        UtilsTests::clearDatabase();
    }

    private function checkAllKeysOfGame(array $bestGames): void
    {
        $keys = ['id', 'level', 'player_points', 'computer_points',
            'image_path', 'created_at'];

        /** @var array $bestGame */
        foreach ($bestGames as $bestGame) {
            foreach ($keys as $key) {
                $this->assertArrayHasKey($key, $bestGame);
            }
        }
    }
}
