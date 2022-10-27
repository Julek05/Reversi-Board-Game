<?php

namespace Tests\Integration;

use App\Game;
use App\User;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;
use Tests\UtilsTests\UtilsTests;

class StoreGameTest extends TestCase
{
    public function test_store_game()
    {
        DB::setDefaultConnection(UtilsTests::TESTING_DB_CONNECTION_NAME);
        $user = User::factory()->create();

        $gameToStore = [
            'level' => 'easy',
            'player_points' => 20,
            'computer_points' => 17
        ];

        $response = $this->actingAs($user)->postJson("/api/games", $gameToStore);

        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());

        $game = Game::select('level', 'player_points', 'computer_points', 'user_id')
            ->where('user_id', '=', $user->id)
            ->firstOrFail()
            ->toArray();

        $this->assertSame(array_merge($gameToStore, ['user_id' => $user->id]), $game);

        UtilsTests::clearDatabase();
    }
}
