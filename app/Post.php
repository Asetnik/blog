<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Post extends Model
{
    protected $fillable = [
        'author_id', 'post_category_id', 'photo', 'title', 'description', 'content',
    ];

    protected $casts = [
        'publication_date' => 'datetime',
    ];

    public function author() {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function status() {
        return $this->hasOne(PostStatus::class);
    }

    public function category() {
        return $this->belongsTo(PostCategory::class, 'post_category_id');
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function comments() {
        return $this->hasMany(PostComment::class);
    }

    public function updateViews() {
        return $this->increment('views');
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
