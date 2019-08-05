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
            'tag' => 'Тэг 1',
            'created_at' => Carbon::now(),
        ]);
        DB::table('tags')->insert([
            'tag' => 'Тэг 2',
            'created_at' => Carbon::now()
        ]);
        DB::table('tags')->insert([
            'tag' => 'Тэг 3',
            'created_at' => Carbon::now()
        ]);
    }
}
