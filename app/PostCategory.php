<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostCategory extends Model
{
    public function post() {
        return $this->hasMany(Post::class);
    }

    public static function add($category) {
        $postCategory = new static();
        $postCategory->category = $category;
        return $postCategory;
    }

    public function remove() {
        $this->delete();
    }

    protected $table = 'post_categories';
}
