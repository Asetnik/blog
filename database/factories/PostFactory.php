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
        'post_category_id' => rand(1, DB::table('post_categories')->count()),
        'photo' => $faker->imageUrl(640, 480),
        'title' => $faker->realText(30),
        'description' => $faker->realText(100),
        'content' => $faker->realText(2000),
        'status_id' => 1,
        'created_at' => Carbon::now()->subDay(rand(1, 30))
    ];
});
