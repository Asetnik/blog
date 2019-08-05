<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PostCommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('post_comments')->insert([
            'post_id' => 1,
            'author_id' => 1,
            'content' => 'чоткий пост, мне нравится',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_comments')->insert([
            'post_id' => 1,
            'author_id' => 2,
            'content' => 'ай лайк ит',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_comments')->insert([
            'post_id' => 2,
            'author_id' => 1,
            'content' => 'такой себе, мог и лучше придумать',
            'created_at' => Carbon::now()
        ]);
    }
}
