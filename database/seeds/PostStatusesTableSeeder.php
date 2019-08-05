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
            'status' => 'published',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_statuses')->insert([
            'status' => 'moderation',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_statuses')->insert([
            'status' => 'blocked',
            'created_at' => Carbon::now()
        ]);
    }
}
