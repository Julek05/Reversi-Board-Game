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

        $fillable = (new Game())->getFillable();

        $values = ['easy', 20, 17, '', 1];

        $gameToStore = array_combine($fillable, $values);

        $response = $this->actingAs($user)->postJson("/api/games", $gameToStore);

        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());

        $game = Game::select('level', 'player_points', 'computer_points', 'image_path', 'user_id')
            ->firstOrFail()
            ->toArray();

        $this->assertSame($gameToStore, $game);

        UtilsTests::clearDatabase();
    }
}
