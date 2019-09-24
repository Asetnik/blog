<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\User;
use Faker\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function () {
    $faker = Factory::create('ru_RU');
    return [
        'role_id' => rand(1,3),
        'name' => $faker->firstName,
        'surname' => $faker->lastName,
        'patronymic' => $faker->firstNameMale,
        'email' => $faker->unique()->safeEmail,
        'password' => Hash::make('password'),
        'remember_token' => Str::random(10),
        'description' => $faker->realText(100),
        'photo' => $faker->imageUrl(640, 480, 'people'),
        'status_id' => rand(1,2)
    ];
});
