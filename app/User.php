<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'surname', 'patronymic', 'description', 'email', 'password', 'status_id', 'role_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
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
        return $this->belongsTo(UserRole::class);
    }

    public function status() {
        return $this->belongsTo(UserStatus::class);
    }

    public function posts() {
        return $this->hasMany(Post::class, 'author_id');
    }

    public function comments() {
        return $this->hasMany(PostComment::class);
    }

    public static function add($fields) {
        $user = new static;
        $password = Hash::make($fields["password"]);
        $user->fill(array_merge($fields, ["password" => $password]));
        $user->setDefaultPhoto();
        $user->save();
        return $user;
    }

    public function remove() {
        $this->removePhoto();
        $this->delete();
    }

    public function setDefaultPhoto(){
        $this->photo = asset('/storage/userImages/' . 'user.png');
        $this->save();
    }

    public function removePhoto() {
        $photo_name = substr($this->photo, strrpos($this->photo,'/') + 1);
        $this->photo = "";
        if($photo_name != "user.png"){
            Storage::disk('public')->delete('userImages/' . $photo_name);
            $this->save();
        }
    }

    public function setPhoto($photo) {
        $path =$photo->store('userImages', 'public');
        $image_url = asset('/storage/' . $path);
        $this->photo = $image_url;
        $this->save();
    }

    protected $table = 'users';
}
