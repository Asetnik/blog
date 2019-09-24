<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserRolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_roles')->insert([
            'role' => 'Пользователь'
        ]);
        DB::table('user_roles')->insert([
            'role' => 'Модератор'
        ]);
        DB::table('user_roles')->insert([
            'role' => 'Администратор'
        ]);
    }
}
