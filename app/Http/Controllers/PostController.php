<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')
            ->join('users', 'posts.author_id', '=', 'users.id')
            ->join('post_categories', 'posts.category_id', '=', 'post_categories.id')
            ->select('posts.id', 'users.name', 'users.surname', 'users.photo as avatar', 'posts.category_id', 'post_categories.category', 'posts.photo', 'posts.title', 'posts.description', 'posts.created_at')
            ->get();
        return response()->json($posts);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::where('posts.id', '=', $id)
            ->join('users', 'posts.author_id', '=', 'users.id')
            ->join('post_categories', 'posts.category_id', '=', 'post_categories.id')
            ->select('posts.id', 'users.name', 'users.surname', 'users.photo as avatar', 'posts.category_id', 'post_categories.category', 'posts.photo', 'posts.title', 'posts.description', 'posts.content', 'posts.views', 'posts.created_at')
            ->get();
        Post::updateViews($id);
        return response()->json($post);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
