<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_statuses')->insert([
            'status' => 'active',
            'created_at' => Carbon::now()
        ]);
        DB::table('user_statuses')->insert([
            'status' => 'blocked',
            'created_at' => Carbon::now()
        ]);
    }
}
