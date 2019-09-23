<?php

namespace App\Http\Controllers;

use App\PostCategory;
use App\Tag;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Post;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::latest()->with('author:id,name,surname,photo', 'tags:tag_id,tag', 'comments', 'category:id,category')->get();
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
        $validator = Validator::make($request->all(), [
            'author_id' => 'required',
            'created_at' => 'required|date',
            'title' => 'required|max:255',
            'description' => 'required|max:255',
            'content' => 'required',
            'category_id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->errors()])->setStatusCode(422);
        }
        Post::add($request->all());
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
        $post = Post::with('author:id,name,surname,photo', 'tags', 'comments.author:id,name,surname,photo', 'category:id,category')
            ->findOrFail($id);
        $post->updateViews();
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
        $post = Post::with('author:id,name,surname,photo', 'tags', 'comments.author:id,name,surname,photo', 'category:id,category')
            ->findOrFail($id);
        return response()->json($post);
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
            'title' => 'required|max:255',
            'description' => 'required|max:255',
            'content' => 'required',
            'category_id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->errors()])->setStatusCode(422);
        }
        $post = Post::findOrFail($id);
        $post->title = $request->get('title');
        $post->description = $request->get('description');
        $post->content = $request->get('content');
        $tags = $request->get('tags_id');
        $post->category_id = $request->get('category_id');
        $post->tags()->sync($tags);
        $post->updated_at = Carbon::now();
        $post->save();
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
        $post = Post::findOrFail($id);
        $post->delete();
    }
}
