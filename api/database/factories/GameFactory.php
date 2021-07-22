<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Game;
use App\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class GameFactory extends Factory
{
    protected $model = Game::class;

    public function definition()
    {
        return [
            'player_points' => rand(0, 64),
            'computer_points' => rand(0, 64),
            'level' => 'easy',
            'image_path' => '',
            'user_id' => User::findOrFail(1)->first()->id
        ];
    }
}


