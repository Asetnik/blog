<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PostStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('post_statuses')->insert([
            'status' => 'На модерации',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_statuses')->insert([
            'status' => 'Опубликована',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_statuses')->insert([
            'status' => 'Заблокирована',
            'created_at' => Carbon::now()
        ]);
    }
}
