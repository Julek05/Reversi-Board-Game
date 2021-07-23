<?php

namespace Tests\Unit;

use App\Http\Controllers\GamesController;
use App\Game;
use App\Repositories\GameRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Tests\UtilsTests\UtilsTests;

class StoreGameTest extends TestCase
{
    public function test_store_game()
    {
        DB::setDefaultConnection(UtilsTests::TESTING_DB_CONNECTION_NAME);

        Auth::shouldReceive('id')->andReturn(1);

        $storeRequest = new Request();
        $storeRequest->setMethod('POST');

        $fillable = (new Game())->getFillable();

        $values = ['latwy', 20, 17, '', 1];

        $gameToStore = array_combine($fillable, $values);

        $storeRequest->request->add($gameToStore);

        (new GamesController(new GameRepository(new Game())))->store($storeRequest);

        $storedGame = Game::select($fillable)
            ->orderByDesc('id')
            ->first()
            ->toArray();

        $gameToStore['level'] = 'easy';

        $this->assertSame($gameToStore, $storedGame);

        UtilsTests::clearDatabase();
    }
}
