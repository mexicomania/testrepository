<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'first_name'=>'ahmed',
            'email'=>'ahmed@gmail.com',
            'last_name' => '1',
            'is_active' => true,
            'password'=>bcrypt('123123')
        ]);

        $user->assignRole('user');

        $admin = User::create([
            'first_name'=>'waqas',
            'email'=>'waqas@gmail.com',
            'last_name' => '1',
            'is_active' => true,
            'password'=>bcrypt('123123')
        ]);
        $admin->assignRole('admin');

    }
}
