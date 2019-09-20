<?php

use App\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = factory(App\User::class, 7)
            ->create()
            ->each(function ($user) {
                for($i = 0; $i < rand(1,5); $i++){
                    $user->posts()->save(factory(App\Post::class)->make());
                }
            });;

        DB::table('users')->insert([
            'name' => 'Павел',
            'surname' => 'Асетник',
            'email' => 'pashka@mail.ru',
            'photo' => 'https://pp.userapi.com/c852220/v852220631/1595c5/jkfh6p9pQ5c.jpg',
            'password' => Hash::make('asdasdasd'),
            'created_at' => Carbon::now()
        ]);

        /*DB::table('users')->insert([
            'role_id' => 1,
            'name' => 'Роман',
            'surname' => 'Дристайло',
            'patronymic' => 'Сверстайлович',
            'email' => 'dristailo@mail.ru',
            'description' => 'Король ягермейстера',
            'photo' => 'https://pp.userapi.com/c852220/v852220631/1595c5/jkfh6p9pQ5c.jpg',
            'status_id' => 1,
            'password' => 'password',
            'created_at' => Carbon::now()
        ]);
        DB::table('users')->insert([
            'role_id' => 2,
            'name' => 'Митчелл',
            'surname' => 'Яблонский',
            'patronymic' => 'Кириллович',
            'email' => 'mitch@mail.ru',
            'description' => 'Описание',
            'photo' => 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
            'status_id' => 1,
            'password' => 'password',
            'created_at' => Carbon::now()
        ]);
        DB::table('users')->insert([
            'role_id' => 3,
            'name' => 'admin',
            'surname' => 'admin',
            'patronymic' => 'admin',
            'description' => 'Админ',
            'email' => 'admin@mail.ru',
            'photo' => 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
            'status_id' => 1,
            'password' => 'admin',
            'created_at' => Carbon::yesterday()
        ]);
        DB::table('users')->insert([
            'role_id' => 2,
            'name' => 'Пашка',
            'surname' => 'Сверстайло',
            'patronymic' => 'Сергеевич',
            'email' => 'p.asetnik@mail.ru',
            'description' => 'Всем привет, я Пашка фейсконтроль',
            'photo' => 'https://sun9-29.userapi.com/c846020/v846020197/d9630/3hQO1HB0wiU.jpg',
            'status_id' => 1,
            'password' => 'pashka',
            'created_at' => Carbon::today()
        ]);*/
    }
}
