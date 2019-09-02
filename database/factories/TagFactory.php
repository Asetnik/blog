<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Tag;
use Faker\Factory;
use Faker\Generator as Faker;

$factory->define(Tag::class, function () {
    $faker = Factory::create('ru_RU');
    return [
        'tag' => $faker->jobTitle
    ];
});
