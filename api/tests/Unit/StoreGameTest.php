<?php

namespace Tests\Unit;

use App\Http\Controllers\GamesController;
use App\Game;
use Illuminate\Http\Request;
use Tests\TestCase;
use Tests\UtilsTests\UtilsTests;

class StoreGameTest extends TestCase
{
    public function test_store_game()
    {
        $storeRequest = new Request();
        $storeRequest->setMethod('POST');

        $gameToStore = [
            'player_name' => 'Gracz1',
            'level' => 'latwy',
            'player_points' => 20,
            'computer_points' => 17,
            'image_path' => 'photos/plansza.PNG'
        ];
        $storeRequest->request->add($gameToStore);

        (new GamesController())->store($storeRequest);

        $storedGame = Game::select('player_name', 'level', 'player_points',
            'computer_points', 'image_path')->orderByDesc('id')->first()->toArray();

        $gameToStore['level'] = 'easy';

        $this->assertSame($gameToStore, $storedGame);

        UtilsTests::clearDatabase();
    }
}
