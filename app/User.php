<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'surname', 'email', 'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'role_id', 'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role() {
        return $this->hasOne(UserRole::class);
    }

    public function status() {
        return $this->hasOne(UserStatus::class);
    }

    public function posts() {
        return $this->hasMany(Post::class, 'author_id');
    }

    public function comments() {
        return $this->hasMany(PostComment::class);
    }

    public static function add($fields) {
        $user = new static;
        $user->fill($fields);
        $user->save();
        return $user;
    }

    public function remove() {
        $this->delete();
    }

    protected $table = 'users';
}
