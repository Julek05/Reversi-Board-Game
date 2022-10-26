<?php

namespace Database\Seeders;

use App\Game;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class GamesSeeder extends Seeder
{
    public function run() : void
    {
        $numbers = range(0, Game::AMOUNT_OF_GAMES_TO_LEVEL);

        $levels = [
            'easy' => [
                'addPlayerPoints' => 20,
                'addComputerPoints' => 17,
                'userId' => 1
            ],
            'middle' => [
                'addPlayerPoints' => 30,
                'addComputerPoints' => 10,
                'userId' => 2
            ],
            'hard' => [
                'addPlayerPoints' => 10,
                'addComputerPoints' => 37,
                'userId' => 3
            ]
        ];

        foreach ($levels as $level => $values) {
            for ($i = 0; $i < Game::AMOUNT_OF_GAMES_TO_LEVEL; $i++) {
                Game::create([
                    'level' => $level,
                    'player_points' => $i + $values['addPlayerPoints'],
                    'computer_points' => $i + $values['addComputerPoints'],
                    'image_path' => $i % 2 === 0 ? Game::UPLOAD_IMAGES_DIRECTORY . '/plansza.PNG' : '',
                    'user_id' => $values['userId']
                ]);
            }
        }
    }
}
