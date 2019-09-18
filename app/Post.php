<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'author_id', 'title', 'description', 'content', 'post_category_id'
    ];

/*    protected $casts = [
        'created_at' => 'datetime',
    ];*/

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
        $post->created_at = Carbon::create($fields["created_at"]);
        $post->updated_at = Carbon::create($fields["created_at"]);
        $post->save();
        $tags = $fields["tags_id"];
        foreach ($tags as $tag){
            $post->tags()->save(Tag::find($tag), ['post_id' => $post->id]);
        };
        return $post;
    }

    public function remove() {
        $this->delete();
    }

    protected $table = 'posts';
}
