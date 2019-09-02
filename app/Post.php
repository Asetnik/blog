<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Post extends Model
{
    protected $fillable = [
        'author_id', 'category_id', 'photo', 'title', 'description', 'content',
    ];

    protected $casts = [
        'publication_date' => 'datetime',
    ];

    public function author() {
        return $this->belongsTo(User::class);
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

    public static function getPostTags($id) {
        $tags = DB::table('post_tag')
            ->where('post_id', '=', $id)
            ->join('tags', 'post_tag.tag_id', '=', 'tags.id')
            ->select('tags.id','tags.tag')
            ->get();
        return $tags;
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
