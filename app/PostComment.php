<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostComment extends Model
{
    protected $fillable = [
        'post_id', 'author_id', 'content'
    ];

    protected $casts = [
        'publication_date' => 'datetime',
    ];

    public function user() {
        return $this->hasOne(User::class);
    }

    public function post() {
        return $this->hasOne(Post::class);
    }

    public static function add($fields) {
        $comment = new static();
        $comment->fill($fields);
        $comment->save();
        return $comment;
    }

    public function remove() {
        $this->remove();
    }

    protected $table = 'post_comments';
}
