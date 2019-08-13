<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use Illuminate\Support\Facades\DB;


class PostController extends Controller
{

    public function getPostsCategories() {
        $posts = Post::orderBy('category_id')
            ->select('post_categories.category')
            ->groupBy('category_id')
            ->join('post_categories', 'posts.category_id', '=', 'post_categories.id')
            ->get();

        return response()->json($posts);
    }

    public function getPostsAuthors() {
        $posts = Post::orderBy('author_id')
            ->select('users.name', 'users.surname')
            ->groupBy('author_id')
            ->join('users', 'posts.author_id', '=', 'users.id')
            ->get();

        return response()->json($posts);
    }

    public function getPostsTags() {
        $posts = DB::table('post_tag')
            ->select('tag_id', 'tags.tag')
            ->groupBy('tag_id')
            ->join('tags', 'post_tag.tag_id', '=', 'tags.id')
            ->get();

        return response()->json($posts);
    }

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
        foreach ($posts as $post) {
            $tags = Post::getPostTags($post->id);
            $post['tags'] = $tags;
        }

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
        $tags = Post::getPostTags($id);
        $post['0']['tags'] = $tags;
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
