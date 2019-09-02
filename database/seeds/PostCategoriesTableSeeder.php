<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class PostCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('post_categories')->insert([
            'category' => 'Природа'
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Спорт'
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Авто'
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Медицина'
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Творчество'
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Общество'
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Кругозор'
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Наука'
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Регионы',
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Регионы',
        ]);
    }
}
