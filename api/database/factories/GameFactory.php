<?php

/** @var Factory $factory */

use App\Game;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(Game::class, function (Faker $faker) {
    return [
        'player_name' => $faker->name,
        'player_points' => rand(0, 64),
        'computer_points' => rand(0, 64),
        'image_path' => ''
    ];
});

