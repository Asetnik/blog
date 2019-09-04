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

    public function author() {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function post() {
        return $this->belongsTo(Post::class);
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
