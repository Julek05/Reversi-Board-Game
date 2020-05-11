<?php

use Illuminate\Database\Seeder;
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
        for ($i = 0; $i < 10; $i++) {
            DB::table('games')->insert([
                'player_name' => Str::random(8),
                'level' => 'łatwy',
                'player_points' => $i + 20,
                'computer_points' => $i + 17,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            DB::table('games')->insert([
                'player_name' => Str::random(8),
                'level' => 'średni',
                'player_points' => $i + 30,
                'computer_points' => $i + 10,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            DB::table('games')->insert([
                'player_name' => Str::random(8),
                'level' => 'trudny',
                'player_points' => $i + 10,
                'computer_points' => $i + 30,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            DB::table('games')->insert([
                'player_name' => Str::random(8),
                'level' => 'ekspert',
                'player_points' => $i + 25,
                'computer_points' => $i + 15,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }
    }
}
