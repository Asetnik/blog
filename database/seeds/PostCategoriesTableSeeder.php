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
            'category' => 'Природа',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Спорт',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Авто',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Медицина',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_categories')->insert([
            'category' => 'Творчество',
            'created_at' => Carbon::now()
        ]);
    }
}
