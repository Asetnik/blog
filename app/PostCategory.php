<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostCategory extends Model
{
    protected $fillable = [
        'category'
    ];

    public $timestamps = false;

    public function posts() {
        return $this->belongsToMany(Post::class);
    }

    public static function add($fields) {
        $postCategory = new static();
        $postCategory->fill($fields);
        $postCategory->save();
        return $postCategory;
    }

    public function remove() {
        $this->delete();
    }

    protected $table = 'post_categories';
}
