<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserStatus extends Model
{
    public function user(){
        return $this->hasMany(User::class);
    }

    public static function add($status) {
        $userStatus = new static;
        $userStatus->status = $status;
        return $userStatus;
    }

    public function remove() {
        $this->delete();
    }

    protected $table = 'user_statuses';
}
