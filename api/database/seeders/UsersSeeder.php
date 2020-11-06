<?php

namespace Database\Seeders;

use App\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    public function run() : void
    {
        $users = [[
                'name' => 'julek',
                'email' => 'julian.przedwojski@gmail.com',
                'password' => bcrypt('julek123'),
            ], [
                'name' => 'kamil',
                'email' => 'kamil.zejmowski@gmail.com',
                'password' => bcrypt('kamil123'),
            ], [
                'name' => 'marek',
                'email' => 'marek.turski@gmail.com',
                'password' => bcrypt('marek123'),
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
