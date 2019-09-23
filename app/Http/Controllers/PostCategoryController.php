<?php

namespace App\Http\Controllers;

use App\Post;
use App\PostCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PostCategoryController extends Controller
{
    public function categoriesWithPosts() {
        $categories = PostCategory::whereIn('id', Post::all()->pluck('category_id'))->get();
        return response()->json($categories);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = PostCategory::all();
        return response()->json($categories);
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
           'category' => 'required|unique:post_categories|max:255'
        ]);
        if($validator->fails()){
            return response()->json(["errors" => $validator->errors()])->setStatusCode(422);
        }
        PostCategory::add($request->all());
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
        $posts = Post::latest()->with('author:id,name,surname,photo', 'tags:tag_id,tag', 'comments', 'category:id,category')->where('category_id', $id)->get();
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
        $category = PostCategory::findOrFail($id);
        return response()->json($category);
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
            'category' => [
                'required',
                Rule::unique('post_categories')->ignore($id),
                'max:255'
            ]
        ]);
        if($validator->fails()){
            return response()->json(["errors" => $validator->errors()])->setStatusCode(422);
        }
        $category = PostCategory::findOrFail($id);
        $category->category = $request->get("category");
        $category->save();
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
        $category = PostCategory::findOrFail($id);
        $category->delete();
    }
}
