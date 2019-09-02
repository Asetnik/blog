<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PostCategoriesTableSeeder::class);
        $this->call(UserStatusesTableSeeder::class);
        $this->call(PostStatusesTableSeeder::class);
        $this->call(TagsTableSeeder::class);
        $this->call(UserRolesTableSeeder::class);
        $this->call(PostsTableSeeder::class);
        $this->call(PostCommentsTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(PostTagSeeder::class);
    }
}
