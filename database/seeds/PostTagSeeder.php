<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tagsId = DB::table('tags')->pluck('id')->toArray();
        $postsId = DB::table('posts')->pluck('id')->toArray();
        for($i = 0; $i < sizeof($postsId); $i++){
            for($j = 0; $j < rand(1, 4); $j++){
                DB::table('post_tag')->insert([
                    'post_id' => $postsId[$i],
                    'tag_id' => array_rand($tagsId),
                ]);
            }
        }

        /*DB::table('post_tag')->insert([
            'post_id' => '1',
            'tag_id' => '5',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => '1',
            'tag_id' => '10',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => '1',
            'tag_id' => '11',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => '2',
            'tag_id' => '6',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => '2',
            'tag_id' => '3',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => '3',
            'tag_id' => '1',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => '4',
            'tag_id' => '2',
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => 5,
            'tag_id' => 12,
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => 5,
            'tag_id' => 13,
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => 5,
            'tag_id' => 14,
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => 6,
            'tag_id' => 12,
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => 7,
            'tag_id' => 15,
            'created_at' => Carbon::now()
        ]);
        DB::table('post_tag')->insert([
            'post_id' => 7,
            'tag_id' => 16,
            'created_at' => Carbon::now()
        ]);*/
    }
}
