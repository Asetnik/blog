<?php

namespace App\Http\Controllers;

use App\Post;
use App\PostCategory;
use Illuminate\Http\Request;

class PostCategoryController extends Controller
{

    public function categoryName($id) {
        $categoryName = PostCategory::where('id', '=', $id)
            ->select('category')
            ->get();
        $categoryName = $categoryName[0] -> category;
        return response()->json($categoryName);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $posts = Post::where('posts.category_id', '=', $id)
            ->join('users', 'posts.author_id', '=', 'users.id')
            ->join('post_categories', 'posts.category_id', '=', 'post_categories.id')
            ->select('posts.id', 'users.name', 'users.surname', 'users.photo as avatar', 'posts.category_id', 'post_categories.category', 'posts.photo', 'posts.title', 'posts.description', 'posts.content', 'posts.views', 'posts.created_at')
            ->get();
        foreach ($posts as $post) {
            $tags = Post::getPostTags($post->id);
            $post['tags'] = $tags;
        }
        return response()->json($posts);
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
