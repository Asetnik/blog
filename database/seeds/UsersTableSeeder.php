<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'role_id' => 1,
            'name' => 'Роман',
            'surname' => 'Дристайло',
            'patronymic' => 'Сверстайлович',
            'email' => 'dristailo@mail.ru',
            'description' => 'Король ягермейстера',
            'photo' => 'https://pp.userapi.com/c852220/v852220631/1595c5/jkfh6p9pQ5c.jpg',
            'status_id' => '1',
            'password' => 'password',
            'created_at' => Carbon::now()
        ]);
        DB::table('users')->insert([
            'role_id' => 2,
            'name' => 'Митчелл',
            'surname' => 'Яблонский',
            'patronymic' => 'Кириллович',
            'email' => 'mitch@mail.ru',
            'photo' => 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
            'status_id' => '1',
            'password' => 'password',
            'created_at' => Carbon::now()
        ]);
        DB::table('users')->insert([
            'role_id' => 3,
            'name' => 'admin',
            'surname' => 'admin',
            'patronymic' => 'admin',
            'email' => 'admin@mail.ru',
            'photo' => 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
            'status_id' => '1',
            'password' => 'admin',
            'created_at' => Carbon::now()
        ]);
    }
}
