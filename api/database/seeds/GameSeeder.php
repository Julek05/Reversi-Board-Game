<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
            DB::table('games')->insert([
                'player_name' => 'gracz' . Arr::random($numbers) . Arr::random($numbers) . Arr::random($numbers),
                'level' => 'łatwy',
                'player_points' => $i + 20,
                'computer_points' => $i + 17,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            DB::table('games')->insert([
                'player_name' => 'gracz' . Arr::random($numbers) . Arr::random($numbers) . Arr::random($numbers),
                'level' => 'średni',
                'player_points' => $i + 30,
                'computer_points' => $i + 10,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            DB::table('games')->insert([
                'player_name' => 'gracz' . Arr::random($numbers) . Arr::random($numbers) . Arr::random($numbers),
                'level' => 'trudny',
                'player_points' => $i + 10,
                'computer_points' => $i + 30,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            DB::table('games')->insert([
                'player_name' => 'gracz' . Arr::random($numbers) . Arr::random($numbers) . Arr::random($numbers),
                'level' => 'ekspert',
                'player_points' => $i + 25,
                'computer_points' => $i + 15,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }
    }
}
