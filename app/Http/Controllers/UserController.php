<?php

namespace App\Http\Controllers;

use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function authorsWithPosts() {
        $authors = User::has('posts')->select('id', 'name', 'surname')->get();
        return response()->json($authors);
    }

    public function isAuth() {
        $isAuth = [
            'isAuth' => false
        ];
        if(Auth::check()){
            $isAuth['isAuth'] = true;
            $isAuth['user'] = Auth::user();
        }
        return response()->json($isAuth);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with(['status', 'role'])->get();
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'patronymic' => 'string|max:255',
            'description' => 'string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'status_id' => 'required|numeric|between:1,2',
            'role_id' => 'required|numeric|between:1,3'
        ]);
        if($validator->fails()){
            return response()->json(["errors" => $validator->errors()])->setStatusCode(422);
        }
        $user = User::add($request->all());
        $user->save();
        return response('', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::with(['posts.tags:tag_id,tag', 'posts.category:id,category', 'posts.comments', 'posts.author:id,name,surname,photo'])->findOrFail($id);
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::with(['status', 'role'])->findOrFail($id);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'surname' => 'string|max:255',
            'patronymic' => 'sometimes|nullable|string|max:255',
            'description' => 'string|max:255',
            'email' => [
                'string',
                'email',
                Rule::unique('users')->ignore($id),
            ],
            'password' => 'string|min:8|confirmed',
            'status_id' => 'numeric|between:1,2',
            'role_id' => 'numeric|between:1,3'
        ]);
        if($validator->fails()){
            return response()->json(["errors" => $validator->errors()])->setStatusCode(422);
        }
        $user = User::findOrFail($id);
        $user->fill($request->all());
        $user->updated_at = Carbon::now();
        $user->save();
        return response('', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }
}
