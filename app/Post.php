<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'author_id', 'title', 'description', 'content', 'photo', 'category_id'
    ];

    protected $dates = ['created_at'];

/*    protected $casts = [
        'created_at' => 'datetime',
    ];*/

    public function author() {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function status() {
        return $this->belongsTo(PostStatus::class);
    }

    public function category() {
        return $this->belongsTo(PostCategory::class, 'category_id', 'id');
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
        $post->status_id = 1;
        if(array_key_exists('created_at', $fields)){
            $post->created_at = Carbon::create($fields["created_at"]);
        } else {
            $post->created_at = Carbon::now();
        }
        $post->updated_at = Carbon::now();
        $post->save();
        $tags = $fields["tags_id"];
        $post->tags()->sync($tags);
        return $post;
    }

    public function remove() {
        $this->delete();
    }

    protected $table = 'posts';
}
