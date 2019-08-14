<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tags')->insert([
            'tag' => 'Фильм',
            'created_at' => Carbon::now(),
        ]);
        DB::table('tags')->insert([
            'tag' => 'Покупка',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Звезды',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Дом',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Ответы',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Футбол',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Здоровье',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Кофе',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Отношения',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Человек',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Отдых',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Происшествия',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Взрывы',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Армия',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Космос',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Наука',
            'created_at' => Carbon::now()
        ]);
    }
}
