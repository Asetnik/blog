<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'author_id', 'category_id', 'photo', 'title', 'description', 'content',
    ];

    protected $casts = [
        'publication_date' => 'datetime',
    ];

    public function author() {
        return $this->hasOne(User::class);
    }

    public function status() {
        return $this->hasOne(PostStatus::class);
    }

    public function category() {
        return $this->hasOne(PostCategory::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function comments() {
        return $this->hasMany(PostComment::class);
    }

    public static function updateViews($id) {
        return Post::find($id)->increment('views');
    }

    public static function add($fields) {
        $post = new static();
        $post->fill($fields);
        $post->save();
        return $post;
    }

    public function remove() {
        $this->delete();
    }

    protected $table = 'posts';
}
