<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'tag'
    ];

    public function posts() {
        return $this->belongsToMany(Post::class);
    }

    public static function add($fields) {
        $tag = new static();
        $tag->fill($fields);
        $tag->save();
        return $tag;
    }

    public function remove() {
        $this->delete();
    }

    protected $table = 'tags';
}
