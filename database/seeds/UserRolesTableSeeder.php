<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserRolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_roles')->insert([
            'role' => 'defaultUser',
            'created_at' => Carbon::now()
        ]);
        DB::table('user_roles')->insert([
            'role' => 'moderator',
            'created_at' => Carbon::now()
        ]);
        DB::table('user_roles')->insert([
            'role' => 'admin',
            'created_at' => Carbon::now()
        ]);
    }
}
