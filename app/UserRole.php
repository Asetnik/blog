<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    public function user(){
        return $this->hasMany(User::class);
    }

    public static function add($role) {
        $userRole = new static;
        $userRole->role = $role;
        return $userRole;
    }

    public function remove() {
        $this->delete();
    }

    protected $table = 'user_roles';
}
