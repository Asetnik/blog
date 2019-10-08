<?php

namespace App\Http\Controllers;

use App\Post;
use App\PostCategory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Arr;

class PostCategoryController extends Controller
{
    private function filterPosts(Request $request, $postsQuery){
        if($authors = $request->get('author')){
            $authorsArray = explode(',', $authors);
            $postsQuery->whereIn('author_id', $authorsArray);
        }
        if($category = $request->get('category')){
            $categoriesArray = explode(',', $category);
            $postsQuery->whereIn('category_id', $categoriesArray);
        }
        if($tag = $request->get('tag')){
            $tagsArray = explode(',', $tag);
            $postsQuery->whereHas('tags', function ($query) use ($tagsArray) {
                $query->whereIn('tags.id', $tagsArray);
            });
        }
        if($dateSince = $request->get('dateSince')){
            $date = new Carbon($dateSince, 'Europe/Moscow');
            $postsQuery->where('created_at', '>=', $date);
        }
        if($dateUntil = $request->get('dateUntil')){
            $date = new Carbon($dateUntil, 'Europe/Moscow');
            $postsQuery->where('created_at', '<=', $date);
        }
        if($searchData = $request->get('search')){
            $postsQuery->where(function ($query) use ($searchData){
                $query->where('title', 'like', '%'.$searchData.'%')
                    ->orWhere('description', 'like', '%'.$searchData.'%');
            });
        }
        return $postsQuery;
    }

    public function categoriesWithPosts() {
        $categories = PostCategory::whereIn('id', Post::all()->pluck('category_id'))->get();
        return response()->json($categories);
    }

    public function getPopularCategories() {
        $categories = PostCategory::all();
        foreach ($categories as $category){
            $posts = $category->posts;
            $category->views = $posts->sum("views");
        };
        $categories = array_values(Arr::sort($categories, function ($value) {
            return $value['views'];
        }));
        $categories = array_reverse($categories);
        $popular_categories = array_slice($categories, 0, 5);
        return response()->json($popular_categories);
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
    public function show(Request $request, $id)
    {
        $category = PostCategory::findOrFail($id);
        $posts = Post::latest()->with('author:id,name,surname,photo', 'tags:tag_id,tag', 'comments', 'category:id,category')->where('category_id', $id);
        $filteredPostsQuery = $this->filterPosts($request, $posts);
        $filteredPosts = $filteredPostsQuery->paginate(5);
        return response()->json([
            "category" => $category,
            "posts" => $filteredPosts
        ]);
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
