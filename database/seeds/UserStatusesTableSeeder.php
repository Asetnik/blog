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
            'status' => 'Активный'
        ]);
        DB::table('user_statuses')->insert([
            'status' => 'Заблокированный'
        ]);
    }
}
