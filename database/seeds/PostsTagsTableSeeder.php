<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PostsTagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts_tags')->insert([
            'post_id' => 1,
            'tag_id' => 1,
            'created_at' => Carbon::now()
        ]);
        DB::table('posts_tags')->insert([
            'post_id' => 1,
            'tag_id' => 2,
            'created_at' => Carbon::now()
        ]);
        DB::table('posts_tags')->insert([
            'post_id' => 1,
            'tag_id' => 3,
            'created_at' => Carbon::now()
        ]);
        DB::table('posts_tags')->insert([
            'post_id' => 2,
            'tag_id' => 3,
            'created_at' => Carbon::now()
        ]);
        DB::table('posts_tags')->insert([
            'post_id' => 3,
            'tag_id' => 1,
            'created_at' => Carbon::now()
        ]);
        DB::table('posts_tags')->insert([
            'post_id' => 3,
            'tag_id' => 2,
            'created_at' => Carbon::now()
        ]);
    }
}
