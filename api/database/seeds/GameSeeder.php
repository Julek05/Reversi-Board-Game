<?php

use App\Models\Game;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for ($i = 0; $i < 10; $i++) {
            Game::create([
                'player_name' => 'Gracz' . Arr::random($numbers) . Arr::random($numbers) . Arr::random($numbers),
                'level' => 'easy',
                'player_points' => $i + 20,
                'computer_points' => $i + 17,
                'image_path' => 'photos/plansza.PNG'
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            Game::create([
                'player_name' => 'Gracz' . Arr::random($numbers) . Arr::random($numbers) . Arr::random($numbers),
                'level' => 'middle',
                'player_points' => $i + 30,
                'computer_points' => $i + 10,
                'image_path' => 'photos/plansza.PNG'
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            Game::create([
                'player_name' => 'Gracz' . Arr::random($numbers) . Arr::random($numbers) . Arr::random($numbers),
                'level' => 'hard',
                'player_points' => $i + 10,
                'computer_points' => $i + 30,
                'image_path' => 'photos/plansza.PNG'
            ]);
        }
    }
}
