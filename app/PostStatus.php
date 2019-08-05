<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostStatus extends Model
{
    public function post() {
        return $this->hasMany(Post::class);
    }

    public static function add($status) {
        $postStatus = new static();
        $postStatus->status = $status;
        return $postStatus;
    }

    public function remove() {
        $this->delete();
    }

    protected $table = 'post_statuses';
}
