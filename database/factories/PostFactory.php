<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Post;
use App\User;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Support\Facades\DB;

$factory->define(Post::class, function () {
    $faker = Factory::create('ru_RU');
    return [
        'category_id' => rand(0, DB::table('post_categories')->count()),
        'photo' => $faker->imageUrl(640, 480),
        'title' => $faker->sentence,
        'description' => $faker->text,
        'content' => $faker->paragraph(rand(20, 30)),
        'status_id' => 1,
        'created_at' => Carbon::now()->subDay(rand(1, 30))
    ];
});